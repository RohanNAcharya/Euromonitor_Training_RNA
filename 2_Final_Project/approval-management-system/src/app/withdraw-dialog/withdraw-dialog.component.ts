import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Irequest } from '../interfaces/Irequest';
import { RequestsService } from '../services/requests.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-withdraw-dialog',
  templateUrl: './withdraw-dialog.component.html',
  styleUrl: './withdraw-dialog.component.css'
})
export class WithdrawDialogComponent {
  constructor(
    private requestsService: RequestsService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<WithdrawDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: { request: Irequest}
  ){}


  public onConfirmProceed(): void {
    this.dialogData.request.withdrawn = true;
    this.requestsService.updateRequest(this.dialogData.request).subscribe({
      next: () => {
        this.toastr.success("Your Request was withdrawn.");
        this.dialogRef.close(true);
      },
      error: () => {
        this.toastr.warning("Error withdrawing the request. Please try again.");
      }
    })
  } 

  public closeDialog(): void {
    this.dialogRef.close(false);
  }
}
