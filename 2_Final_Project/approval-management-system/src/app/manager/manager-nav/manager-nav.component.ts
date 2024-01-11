import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Iuser } from '../../interfaces/Iuser';
import { LogoutDialogComponent } from '../../dialog-popups/logout-dialog/logout-dialog.component';
import { RequestsService } from '../../services/requests.service';
import { Irequest } from '../../interfaces/Irequest';
import { GetUserService } from '../../services/get-user.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-manager-nav',
  templateUrl: './manager-nav.component.html',
  styleUrl: './manager-nav.component.css'
})
export class ManagerNavComponent {
  public currentUser!: Iuser;
  public currentUserName!: string; 
  public latestRequestsCount: number = 0;
  public lastLogoutTime!: Date | null;

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private getUserService: GetUserService,
    private requestsService: RequestsService,
    private localStorageService:LocalStorageService
    ){}

  ngOnInit(): void {
    // if(sessionStorage !== undefined){
    //   this.currentUser = JSON.parse(sessionStorage.getItem('currentUser')!);
    //   this.currentUserName = this.currentUser!.firstname[0] + this.currentUser!.firstname.slice(1) 
    //   + ' ' + this.currentUser!.lastname[0] + this.currentUser!.lastname.slice(1);
    // }

      this.currentUser = this.localStorageService.getUserItem('currentUser');
      this.currentUserName = this.currentUser!.firstname[0] + this.currentUser!.firstname.slice(1) 
      + ' ' + this.currentUser!.lastname[0] + this.currentUser!.lastname.slice(1);
    
    this.getCurrentUserDetails();
  }

  public openLogoutDialog(): void{
    const dialogRef = this.dialog.open(LogoutDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.authService.updateUserLogoutTime(this.currentUser.username, new Date()).subscribe({
          next: () => {
            this.authService.loggedIn = false;
            // sessionStorage.clear();
            this.localStorageService.clear();
            this.router.navigate(['/login']);
            this.toastr.success('Logged out Successfully!');
          },
          error: (err) => {
            console.log(err);
          }
        })
      }
    })
  }

  public getCurrentUserDetails(): void {
    this.getUserService.getUserByUsername(this.currentUser.username).subscribe({
      next: (user:Iuser) => {
        this.lastLogoutTime = user.lastLogoutTime ? new Date(user.lastLogoutTime!) : null;
        this.getRequestsForApproval();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  public getRequestsForApproval(): void {
    this.requestsService.getRequestsByApprover(this.currentUser.username).subscribe({
      next: (requests:Irequest[]) => {
        const currentDateTime = new Date();
        console.log(requests)
        let latestRequests = requests.filter((request) => {
          const requestDate = new Date(request.requestedDate);
          return (requestDate >= this.lastLogoutTime! && requestDate <= currentDateTime) && request.approvalStatus === 'initiated'
        })
        this.latestRequestsCount = latestRequests.length;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  public checkLatestRequestsCount(): void {
    this.getRequestsForApproval()
  }
}
