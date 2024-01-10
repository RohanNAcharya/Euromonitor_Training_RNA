import { Component, Inject } from '@angular/core';
import { Irequest } from '../../interfaces/Irequest';
import { RequestsService } from '../../services/requests.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-approve-dialog',
  templateUrl: './approve-dialog.component.html',
  styleUrl: './approve-dialog.component.css'
})
export class ApproveDialogComponent {
  public comments: string = '';
  public currentRequest!:Irequest;

  constructor(
    private requestsService: RequestsService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<ApproveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: {request: Irequest}
  ){
    this.currentRequest = this.dialogData.request;
  }


  public onApproveButtonCicked(): void {
    this.dialogData.request.approvalStatus = "approved";
    this.dialogData.request.approverComments = this.comments;
    this.requestsService.updateRequest(this.dialogData.request).subscribe({
      next: () => {
        this.toastr.success("Request Approved!");
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
