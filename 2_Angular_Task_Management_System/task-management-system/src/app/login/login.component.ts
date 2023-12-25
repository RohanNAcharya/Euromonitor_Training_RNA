import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService, User } from '../Services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loggedIn = false;
  login!:FormGroup;
  router: Router = inject(Router);

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService
    ){
    this.login = this.fb.group({
      username: '',
      password: ''
    });
  }

  onFormSubmit(){
    const username = this.login.value.username;
    const password = this.login.value.password;
    this.authService.validateLogin(username, password).subscribe({
      next: (user: User[]) => {
        if(user && user.length > 0){  
          this.authService.loggedIn = true;
          this.router.navigate(['/taskList'], { queryParams: { username: username, id: user[0].id } });
        }
        else{
          alert('Invalid username or password');
        }
      },
      error: (err) => {
        if (err.status === 401) {
          alert('Unauthorized: Please check your username and password.');
        } else {
          alert('An error occurred while processing your request. Please try again later.');
        }
      }
    });
  }

}