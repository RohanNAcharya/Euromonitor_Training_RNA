import { Component, Inject } from '@angular/core';
import { Irequest } from '../../interfaces/Irequest';
import { RequestsService } from '../../services/requests.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reject-dialog',
  templateUrl: './reject-dialog.component.html',
  styleUrl: './reject-dialog.component.css'
})
export class RejectDialogComponent {
  public comments: string = '';
  public currentRequest!:Irequest;

  constructor(
    private requestsService: RequestsService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<RejectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: {request: Irequest}
  ){
    this.currentRequest = this.dialogData.request;
  }

  public onRejectButtonCicked(): void {
    this.dialogData.request.approvalStatus = "rejected";
    this.dialogData.request.approverComments = this.comments;
    this.requestsService.updateRequest(this.dialogData.request).subscribe({
      next: () => {
        this.toastr.success("Request Rejected!");
        this.dialogRef.close(true);
      },
      error: () => {
        this.toastr.warning("Error updating the approval status. Please try again!");
      }
    })
  }

  public closeDialog(): void {
    this.dialogRef.close(false);
  }

}
