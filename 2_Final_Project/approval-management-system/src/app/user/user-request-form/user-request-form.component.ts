import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Iuser } from '../../interfaces/Iuser';
import { GetUserService } from '../../services/get-user.service';
import { RequestsService } from '../../services/requests.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-request-form',
  templateUrl: './user-request-form.component.html',
  styleUrl: './user-request-form.component.css'
})
export class UserRequestFormComponent implements OnInit{
  public approvalRequestForm!: FormGroup;
  public allManagers!: Iuser[];
  public currencyPattern = /^[0-9]{1,10}(\.[0-9]{1,2})?$/;
  public currentUser = JSON.parse(sessionStorage.getItem('currentUser')!);

  constructor(
    private getUserService: GetUserService,
    private requestsService: RequestsService,
    private toastr: ToastrService
  ){}

  ngOnInit(): void {
    this.getUserService.getAllManagers().subscribe({
      next: (users: Iuser[]) => {
        this.allManagers = users;
        console.log(this.allManagers)
      },
      error: (err) => {
        this.allManagers = [];
      }
    })
    

    this.approvalRequestForm = new FormGroup({
      requestedby: new FormControl(this.currentUser.username.toLowerCase()),
      requestedDate: new FormControl(this.formatDate(new Date())),
      purpose: new FormControl(null, Validators.required),
      description: new FormControl(null),
      approver: new FormControl(null, Validators.required),
      estimatedCost: new FormControl(null, [Validators.required, Validators.pattern(this.currencyPattern)]),
      advanceAmount: new FormControl(null, [Validators.required, Validators.pattern(this.currencyPattern)]),
      planDate: new FormControl(null, Validators.required),
      spentAmount: new FormControl(""),
      userComments: new FormControl(""),
      documents: new FormControl(""),
      uploadStatus: new FormControl(false),
      requestDate: new FormControl(""),
      approvalStatus: new FormControl(false),
      approverComments: new FormControl(""),
      withdrawn: new FormControl(false)
    })
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

  public onApprovalRequestFormSubmit(): void {
    this.requestsService.addRequest(this.approvalRequestForm.value).subscribe({
      next: (data) => {
        this.toastr.success("Hey Congrats, Your Request has been sent successfully!");
        this.approvalRequestForm.reset();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  public onCancelButtonCliked(): void {
    this.approvalRequestForm.reset();
  }
}
