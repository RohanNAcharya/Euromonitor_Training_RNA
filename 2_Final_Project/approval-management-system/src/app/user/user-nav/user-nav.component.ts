import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../../logout-dialog/logout-dialog.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Iuser } from '../../interfaces/Iuser';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrl: './user-nav.component.css'
})
export class UserNavComponent implements OnInit{
  public currentUser!: Iuser;
  public currentUserName!: string; 

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    ){}

  ngOnInit(): void {
    if(sessionStorage !== undefined){
      this.currentUser = JSON.parse(sessionStorage.getItem('currentUser')!);
      this.currentUserName = this.currentUser!.firstname[0] + this.currentUser!.firstname.slice(1) 
      + ' ' + this.currentUser!.lastname[0] + this.currentUser!.lastname.slice(1);
    }
  }

  public openLogoutDialog(): void{
    const dialogRef = this.dialog.open(LogoutDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.authService.loggedIn = false;
        sessionStorage.clear();
        this.router.navigate(['/login']);
        this.toastr.success('Logged out Successfully!');
      }
    })
  }
}
