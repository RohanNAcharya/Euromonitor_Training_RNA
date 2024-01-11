import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Irequest } from '../../interfaces/Irequest';
import { RequestsService } from '../../services/requests.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrl: './request-details.component.css'
})
export class RequestDetailsComponent {

  public comments: string = '';
  public currentRequest!:Irequest;

  constructor(
    private requestsService: RequestsService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<RequestDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: {request: Irequest, requesterName: string, requesterContact: string}
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
