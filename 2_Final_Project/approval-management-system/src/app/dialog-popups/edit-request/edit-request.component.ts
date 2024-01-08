import { Component, Inject, OnInit } from '@angular/core';
import { GetUserService } from '../../services/get-user.service';
import { RequestsService } from '../../services/requests.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Irequest } from '../../interfaces/Irequest';
import { Iuser } from '../../interfaces/Iuser';


@Component({
  selector: 'app-edit-request',
  templateUrl: './edit-request.component.html',
  styleUrl: './edit-request.component.css'
})
export class EditRequestComponent implements OnInit{

  public approvalRequestUpdateForm!: FormGroup;
  public allManagers!: Iuser[];
  
  public currencyPattern = /^[0-9]{1,10}(\.[0-9]{1,2})?$/;

  constructor(
    private getUserService: GetUserService,
    private requestsService: RequestsService,
    private toastr: ToastrService,
    private dialodRef: MatDialogRef<EditRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: { request: Irequest}
  ) { 
    this.approvalRequestUpdateForm = new FormGroup({
      purpose: new FormControl(this.dialogData.request ? this.dialogData.request.purpose : null, Validators.required),
      description: new FormControl(this.dialogData.request ? this.dialogData.request.description : null),
      approver: new FormControl(this.dialogData.request ? this.dialogData.request.approver : null, Validators.required),
      estimatedCost: new FormControl(this.dialogData.request ? this.dialogData.request.estimatedCost : null, [Validators.required, Validators.pattern(this.currencyPattern)]),
      advanceAmount: new FormControl(this.dialogData.request ? this.dialogData.request.advanceAmount : null, [Validators.required, Validators.pattern(this.currencyPattern)]),
      planDate: new FormControl(this.dialogData.request ? this.dialogData.request.planDate : null, Validators.required)
    })
  }

  ngOnInit(): void{
    this.getUserService.getAllManagers().subscribe({
      next: (users: Iuser[]) => {
        this.allManagers = users;
      },
      error: (err) => {
        this.allManagers = [];
      }
    })
  }

  public onApprovalRequestUpdate(): void {
    this.updateRequest();
    if (this.approvalRequestUpdateForm.valid) {
      this.requestsService.updateRequest(this.dialogData.request).subscribe({
        next: () => {
          this.toastr.success("Hey Congrats, Your Request has been updated successfully!");
          this.dialodRef.close(true);
        },
        error: () => {
          this.toastr.warning("Error submitting your request. Please try again.");
        }
      })
    } else {
      this.toastr.warning("Please fill all the required fields!");
    }
  }

  public updateRequest(): void {
    this.dialogData.request.purpose = this.approvalRequestUpdateForm.get('purpose')!.value;
    this.dialogData.request.description = this.approvalRequestUpdateForm.get('description')!.value;
    this.dialogData.request.approver = this.approvalRequestUpdateForm.get('approver')!.value;
    this.dialogData.request.estimatedCost = this.approvalRequestUpdateForm.get('estimatedCost')!.value;
    this.dialogData.request.advanceAmount = this.approvalRequestUpdateForm.get('advanceAmount')!.value;
    this.dialogData.request.planDate = this.approvalRequestUpdateForm.get('planDate')!.value;
  }

}
