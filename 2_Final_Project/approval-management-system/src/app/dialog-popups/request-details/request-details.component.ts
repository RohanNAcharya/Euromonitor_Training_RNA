import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Irequest } from '../../interfaces/Irequest';
import { RequestsService } from '../../services/requests.service';
import { ToastrService } from 'ngx-toastr';
import { FileUploadService } from '../../services/file-upload.service';

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
    private fileRequest: FileUploadService,
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

  public onDownloadButtonClicked(request: Irequest): void {
    const filename = request.documents.split('/').pop()!;
    this.fileRequest.downloadFile(filename).subscribe({
      next: (data: Blob) => {
        const blob = new Blob([data], {type: 'application/octet-stream'});
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        this.toastr.success("File downloaded successfully.");
      },
      error: (err) => {
        this.toastr.warning("Error downloading file.");
        console.log(err);
      }
    });
  }

  public closeDialog(): void {
    this.dialogRef.close(false);
  }

}
