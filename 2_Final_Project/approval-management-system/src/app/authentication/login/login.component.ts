import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CustomValidators } from '../../validators/custom-validators.validators';
import { Iuser } from '../../interfaces/Iuser';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loginForm!:FormGroup;
  buttonClicked!: string;
  
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ){}
  
  ngOnInit(): void{
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required, CustomValidators.noSpaceAllowed]),
      password: new FormControl(null, [Validators.required, CustomValidators.noSpaceAllowed, Validators.minLength(8)])
    })
  }

  public handleClickedButton(value:string): void {
    this.buttonClicked = value;
  }

  public onLoginFormSubmit(): void {
    const username = this.loginForm.get('username')!.value;
    const password = this.loginForm.get('password')!.value;

    if(this.buttonClicked === 'user-button')
    {
      // console.log('Button clicked:', this.buttonClicked);
      this.validateUser(username, password);
    }
    else if(this.buttonClicked === 'manager-button'){
      // console.log('Button clicked:', this.buttonClicked);
      this.validateManager(username, password);
    }
  }

  public validateUser(username:string, password:string): void {
    this.authService.validateUserLogin(username.toLowerCase(), password, "employee").subscribe({
      next: (user: Iuser[]) => {
        console.log(user);

        if(user && user.length > 0){
          this.authService.loggedIn = true;
          sessionStorage.setItem('currentUser', JSON.stringify({ username: username, role: 'employee', firstname: user[0].firstname, lastname: user[0].lastname, contact: user[0].contact}));
          this.router.navigate(['/user-home']);
          this.toastr.success('Logged In Successfully!');
        }
        else{
          this.toastr.warning('Invalid username or password');
        }
      },
      error: (err) => {
        if (err.status === 401) {
          this.toastr.warning('Unauthorized: Please check your username and password.');
        } else {
          this.toastr.warning('An error occurred while processing your request. Please try again later.');
        }
      }
    })
  }

  public validateManager(username:string, password:string): void {
    this.authService.validateUserLogin(username.toLowerCase(), password, "manager").subscribe({
      next: (user: Iuser[]) => {
        console.log(user);

        if(user && user.length > 0){
          this.authService.loggedIn = true;
          sessionStorage.setItem('currentUser', JSON.stringify({ username: username, role: 'manager', firstname: user[0].firstname, lastname: user[0].lastname}));
          this.router.navigate(['/manager-home']);
          this.toastr.success('Logged In Successfully!');
        }
        else{
          this.toastr.warning('Invalid username or password');
        }
      },
      error: (err) => {
        if (err.status === 401) {
          this.toastr.warning('Unauthorized: Please check your username and password.');
        } else {
          this.toastr.warning('An error occurred while processing your request. Please try again later.');
        }
      }
    })
  }

}
