import { Component, ViewChild } from '@angular/core';
import { FileUploadService } from '../../services/file-upload.service';
import { Irequest } from '../../interfaces/Irequest';
import { Iuser } from '../../interfaces/Iuser';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { RequestsService } from '../../services/requests.service';
import { concatMap, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
// import {}

@Component({
  selector: 'app-user-upload-bill',
  templateUrl: './user-upload-bill.component.html',
  styleUrl: './user-upload-bill.component.css'
})
export class UserUploadBillComponent {
  public file!: File;
  public request!: Irequest;
  public currentUser!: Iuser;
  public fullName!: string;
  public billUploadForm!: FormGroup;
  public currencyPattern = /^[0-9]{1,10}(\.[0-9]{1,2})?$/;
  public uploadedFileName!: string;

  @ViewChild(FormGroupDirective) uploadForm: FormGroupDirective | undefined;

  constructor(
    private fileUploadService:FileUploadService,
    private requestsService: RequestsService,
    private toastr: ToastrService,
    private router: Router
  ){}

  ngOnInit(){
    this.request = JSON.parse(sessionStorage.getItem('currentRequest')!)
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser')!)
    this.fullName = this.currentUser.firstname[0].toUpperCase() + this.currentUser.firstname.slice(1) + ' ' +
                    this.currentUser.lastname[0].toUpperCase() + this.currentUser.lastname.slice(1)
    this.uploadedFileName = (this.request.uploadStatus) ? this.request.documents.split('/').pop()! : "";
    this.billUploadForm = new FormGroup({
      spentAmount: new FormControl((this.request.uploadStatus)? this.request.spentAmount : null, [Validators.required, Validators.pattern(this.currencyPattern)]),
      userComments: new FormControl((this.request.uploadStatus)? this.request.userComments: null)
    })
  }            

  getFile(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
  
    if (inputElement.files && inputElement.files.length > 0) {
      this.file = inputElement.files[0];
      // console.log(this.file);
    }
  }

  onBillFormSubmit(){
    console.log(this.billUploadForm);
    let fileName = this.request.requestId.toUpperCase();
    let path = `F:\/File_Uploads\/uploads\/uploads/`;
    path += this.request.requestId.toUpperCase() + '_' + this.file.name;
    this.uploadedFileName = this.request.requestId.toUpperCase() + '_' + this.file.name;
    this.request.spentAmount = this.billUploadForm.get('spentAmount')!.value;
    this.request.userComments = this.billUploadForm.get('userComments')!.value;
    this.request.uploadStatus = true;
    this.request.documents = (this.file) ? path : this.request.documents;
    
    this.fileUploadService.uploadFile(fileName, this.file)
      .pipe(
        tap((response) => {
          console.log('File upload successful:', response);
          this.toastr.success('File upload successful');
        }),
        concatMap(() => {
          return this.requestsService.updateRequest(this.request);
        })
      )
      .subscribe({
        next: (response) => {
          console.log('Form submitted successfully:', response);
          this.toastr.success("Form Submitted Successfully!");
        },
        error: (err) => {
          console.error('Error during file upload or form submission:', err);
          this.toastr.warning("Error during the file upload or form submition. Please try again.");
        }
      });
  }

  public onClickCancel(): void {
    if (this.uploadForm) {
      this.uploadForm.resetForm();
    }
  }

  onClickBack(){
    this.router.navigate(['/user-home/user-my-requests']);
    sessionStorage.removeItem('currentRequest');
  }
}
