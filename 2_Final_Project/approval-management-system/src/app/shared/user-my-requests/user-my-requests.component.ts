import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../../services/requests.service';
import { GetUserService } from '../../services/get-user.service';
import { Irequest } from '../../interfaces/Irequest';
import { MatDialog } from '@angular/material/dialog';
import { EditRequestComponent } from '../../dialog-popups/edit-request/edit-request.component';
import { WithdrawDialogComponent } from '../../dialog-popups/withdraw-dialog/withdraw-dialog.component';
import { Router } from '@angular/router';
import { Iuser } from '../../interfaces/Iuser';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-user-my-requests',
  templateUrl: './user-my-requests.component.html',
  styleUrl: './user-my-requests.component.css'
})
export class UserMyRequestsComponent implements OnInit{
  public currentUser!:Iuser;
  public currentUsername!: string;
  public managers: { [key: string]: string } = {};
  public currentUserRequests!: Irequest[];
  public currentUserRequestsNotWithdrawn!: Irequest[];
  public totalRequests!: number;

  constructor(
    private requestService: RequestsService,
    private getUserService: GetUserService,
    private dialog: MatDialog,
    private router: Router,
    private localStorageService: LocalStorageService
  ){}

  ngOnInit(){
    this.currentUser = this.localStorageService.getUserItem('currentUser');
    console.log(this.currentUser);
    this.currentUsername = this.currentUser!.username;
    this.getAllManagers();
    this.getAllRequests();
  }

  public getAllManagers(): void {
    this.getUserService.getAllManagers().subscribe({
      next: (managers) => {
        for(let manager of managers){
          this.managers[manager.username.toLowerCase()] = manager.firstname[0].toUpperCase() + manager.firstname.slice(1) + ' ' + manager.lastname[0].toUpperCase() + manager.lastname.slice(1);
        }
        console.log(this.managers);
      }
      
    })
  }

  public getAllRequests(): void {
    this.requestService.getRequests(this.currentUsername.toLowerCase()).subscribe({
      next: (data) =>{
        this.currentUserRequests = data.reverse().filter(requests => !requests.withdrawn);
        console.log(this.currentUserRequests);
      }
    })
  }

  public openEditRequestForm(request: Irequest): void {
    const dialogRef = this.dialog.open(EditRequestComponent, { data: {request} });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.getAllRequests();
        }
      }
    })
  }

  public openWithdrawDialog(request: Irequest): void {
    const dialogRef = this.dialog.open(WithdrawDialogComponent, { data: {request} });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.getAllRequests();
        }
      }
    })
  }

  public onUploadButtonClicked(request: Irequest): void {
    this.localStorageService.setRequestItem('currentRequest', request);
    this.router.navigate(['user-home/user-upload-bill']);
  }

  public onBackButtonClicked(): void {
    if(this.currentUser.role === "employee"){
      this.router.navigate(["/user-home/user-request-form"]);
    }
    else{
      this.router.navigate(["/manager-home/manager-request-form"]);
    }
  }
}