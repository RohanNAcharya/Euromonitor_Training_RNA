import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrl: './logout-dialog.component.css'
})
export class LogoutDialogComponent {
  constructor(private dialogRef: MatDialogRef<LogoutDialogComponent>){}

  public closeDialog(): void {
    this.dialogRef.close(false);
  }

  confirmLogout(){
    this.dialogRef.close(true);
  }
}
