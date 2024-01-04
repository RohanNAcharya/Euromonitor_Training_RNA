import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CustomValidators } from '../validators/custom-validators.validators';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  
  registerForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstname: new FormControl(null, [Validators.required, CustomValidators.noSpaceAllowed]),
      lastname: new FormControl(null, [Validators.required, CustomValidators.noSpaceAllowed]),
      role: new FormControl(null, Validators.required),
      contact: new FormControl(null, [Validators.required, Validators.pattern(`[0-9]{10}`)]), 
      username: new FormControl(null, [Validators.required, CustomValidators.noSpaceAllowed, Validators.maxLength(25)]),
      password: new FormControl(null, [Validators.required, CustomValidators.noSpaceAllowed, Validators.minLength(8)])
    });
  }

  public onRegisterFormSubmit(): void {
    // console.log(this.registerForm);
    let userName = this.registerForm.get('username')!.value;
    this.registerForm.get('username')!.setValue(userName.toLowerCase());
    this.checkUsername(userName.toLowerCase()).subscribe(isTaken => {
      if(isTaken){
        this.toastr.warning('Username is already taken. Enter a different username.');
        this.registerForm.get('username')?.setValue(null);
      }
      else{
        if(this.registerForm.valid){
          this.authService.registerNewUser(this.registerForm.value).subscribe(result => {
            this.toastr.success("Registered Successfully");
            this.router.navigate(['login']);
          });
        }
        else{
          this.toastr.warning('Please enter valid data.');
        }
      }
    });
  }

  public checkUsername(username:string): Observable<Boolean>{
    return this.authService.getUsername().pipe(
      map(usernames => usernames.map(user => user.toLowerCase())),
      map(existingUsernames => existingUsernames.includes(username.toLowerCase()))
    );
  }
}
