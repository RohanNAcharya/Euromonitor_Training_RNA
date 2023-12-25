import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService, User } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm!: FormGroup;
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  constructor(
    private fb: FormBuilder
    ){

    this.signupForm = this.fb.group({
      username: '',
      password: '',
      tasks: ([])
    });
  }

  onSignupFormSubmit(){
    const username = this.signupForm.value.username;
    this.authService.checkExistingUser(username).subscribe({
      next: (user: User[]) => {
        if(user && user.length > 0){  
          alert('Username already exists. Please choose another username.');
        }
        else{
          this.authService.addNewUser(this.signupForm.value).subscribe({
            next: (newUser) => {
              this.authService.loggedIn = true;
              this.router.navigate(['/taskList'], { queryParams: { username: username, id: newUser.id } });
            },
            error: (err) => {
              console.error('Error during signup:', err);
              alert('An error occurred during signup. Please try again later.');
            }
          })
        }
      },
      error: (err) => {
        console.error('Error checking user existence:', err);
        alert('An error occurred while checking user existence. Please try again later.');
      }
    });
  }
}
