import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../../logout-dialog/logout-dialog.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrl: './user-nav.component.css'
})
export class UserNavComponent {
  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    ){}

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
