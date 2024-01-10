import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { Iuser } from '../../interfaces/Iuser';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrl: './logout-dialog.component.css'
})
export class LogoutDialogComponent {

  // public currentUser: Iuser = JSON.parse(sessionStorage.getItem('currentUser')!)

  constructor(
    private dialogRef: MatDialogRef<LogoutDialogComponent>,
    private authService: AuthService
    ){}

  public closeDialog(): void {
    this.dialogRef.close(false);
  }

  // confirmLogout(){
  //   this.authService.updateUserLogoutTime(this.currentUser!.username, new Date()).subscribe({
  //     next: () => {
  //       console.log("Enters here!")
  //       this.dialogRef.close(true);
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     }
  //   })
  // }

  public confirmLogout(): void {
    this.dialogRef.close(true);
  }
}
