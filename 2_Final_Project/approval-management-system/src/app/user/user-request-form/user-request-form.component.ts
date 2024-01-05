import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Iuser } from '../../interfaces/Iuser';
import { GetUserService } from '../../services/get-user.service';
import { RequestsService } from '../../services/requests.service';
import { ToastrService } from 'ngx-toastr';
import { Irequest } from '../../interfaces/Irequest';

@Component({
  selector: 'app-user-request-form',
  templateUrl: './user-request-form.component.html',
  styleUrl: './user-request-form.component.css'
})
export class UserRequestFormComponent implements OnInit {
  public approvalRequestForm!: FormGroup;
  public allManagers!: Iuser[];
  public request!: Irequest;

  public currencyPattern = /^[0-9]{1,10}(\.[0-9]{1,2})?$/;
  public currentUser = JSON.parse(sessionStorage.getItem('currentUser')!);
    
  @ViewChild(FormGroupDirective) myForm: FormGroupDirective | undefined;

  constructor(
    private getUserService: GetUserService,
    private requestsService: RequestsService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getUserService.getAllManagers().subscribe({
      next: (users: Iuser[]) => {
        this.allManagers = users;
      },
      error: (err) => {
        this.allManagers = [];
      }
    })

    this.updateApprovalForm();
  }

  public updateApprovalForm(): void {
    this.approvalRequestForm = new FormGroup({
      purpose: new FormControl(null, Validators.required),
      description: new FormControl(null),
      approver: new FormControl(null, Validators.required),
      estimatedCost: new FormControl(null, [Validators.required, Validators.pattern(this.currencyPattern)]),
      advanceAmount: new FormControl(null, [Validators.required, Validators.pattern(this.currencyPattern)]),
      planDate: new FormControl(null, Validators.required)
    })
  }

  public onApprovalRequestFormSubmit(): void {
    this.updateRequest();
    if (this.approvalRequestForm.valid) {
      this.requestsService.addRequest(this.request).subscribe({
        next: () => {
          this.toastr.success("Hey Congrats, Your Request has been sent successfully!");
          this.resetApprovalRequestForm();
        },
        error: () => {
          this.toastr.warning("Error submitting your request. Please try again.");
        }
      })
    } else {
      this.toastr.warning("Please fill all the required fields!");
    }
  }

  public onCancelButtonCliked(): void {
    this.resetApprovalRequestForm();
  }

  public resetApprovalRequestForm(): void {
    if (this.myForm) {
      this.myForm.resetForm();
    }
  }

  public updateRequest(): void {
    let planDateValue = this.approvalRequestForm.get('planDate')!.value;
    let planDateUpdate = (planDateValue !== null) ? this.formatDate(planDateValue) :  planDateValue;
    this.request = {
      requestId: "",
      requestedBy: this.currentUser.username.toLowerCase(),
      requestedDate: this.formatDate(new Date()),
      purpose: this.approvalRequestForm.get('purpose')!.value,
      description: this.approvalRequestForm.get('description')!.value,
      approver: this.approvalRequestForm.get('approver')!.value,
      estimatedCost: this.approvalRequestForm.get('estimatedCost')!.value,
      advanceAmount: this.approvalRequestForm.get('advanceAmount')!.value,
      planDate: planDateUpdate,
      spentAmount: "",
      userComments: "",
      documents: "",
      uploadStatus: false,
      requestDate: "",
      approvalStatus: "initiated",
      approverComments: "",
      withdrawn: false
    }
  }

  private formatDate(date: Date | string): string {
    if (typeof date === 'string') {
      date = new Date(date);
    }

    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return day + '-' + month + '-' + year;
  }

}
