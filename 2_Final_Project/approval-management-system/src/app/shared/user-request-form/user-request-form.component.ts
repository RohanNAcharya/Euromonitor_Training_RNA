import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Iuser } from '../../interfaces/Iuser';
import { GetUserService } from '../../services/get-user.service';
import { RequestsService } from '../../services/requests.service';
import { ToastrService } from 'ngx-toastr';
import { Irequest } from '../../interfaces/Irequest';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';
import { CustomValidators } from '../../validators/custom-validators.validators';

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
  public currentUser!: Iuser;
    
  @ViewChild(FormGroupDirective) myForm: FormGroupDirective | undefined;

  constructor(
    private getUserService: GetUserService,
    private requestsService: RequestsService,
    private toastr: ToastrService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentUser = this.localStorageService.getUserItem('currentUser');
    this.getUserService.getAllManagers().subscribe({
      next: (users: Iuser[]) => {
        if(this.currentUser.role === 'manager'){
          this.allManagers = users.filter(user => user.username!== this.currentUser.username);
        }
        else{
          this.allManagers = users;
        }
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
      planDate: new FormControl(null, [Validators.required, CustomValidators.dateError])
    })
  }

  public onApprovalRequestFormSubmit(): void {
    this.updateRequest();
    if (this.approvalRequestForm.valid) {
      this.requestsService.addRequest(this.request).subscribe({
        next: () => {
          this.toastr.success("Hey Congrats, Your Request has been sent successfully!");
          this.resetApprovalRequestForm();
          if(this.currentUser.role === "employee"){
            this.router.navigate(['/user-home/user-my-requests']);
          }else{
            this.router.navigate(['/manager-home/manager-my-requests']);
          }
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
    this.request = {
      requestId: "",
      requestedBy: this.currentUser.username.toLowerCase(),
      requestedDate: new Date(),
      purpose: this.approvalRequestForm.get('purpose')!.value,
      description: this.approvalRequestForm.get('description')!.value,
      approver: this.approvalRequestForm.get('approver')!.value,
      estimatedCost: this.approvalRequestForm.get('estimatedCost')!.value,
      advanceAmount: this.approvalRequestForm.get('advanceAmount')!.value,
      planDate: this.approvalRequestForm.get('planDate')!.value,
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

}
