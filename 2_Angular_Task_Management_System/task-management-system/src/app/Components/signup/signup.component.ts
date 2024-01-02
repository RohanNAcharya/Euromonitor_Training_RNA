import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CoreService } from '../../services/core.service';
import { Iuser } from '../../interfaces/Iuser';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  router: Router = inject(Router);
  authService: AuthService = inject(AuthService);
  coreService: CoreService = inject(CoreService);

  signupForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      username: '',
      password: ''
    });
  }

  public onSignupFormSubmit() {
    const username = this.signupForm.value.username;
    const password = this.signupForm.value.password;
    if (username === "" || username === undefined || username === null) {
      this.coreService.openSanckBar("Enter a valid username!");
    }
    else if (password === "" || password === undefined || password === null) {
      this.coreService.openSanckBar("Password Field is empty!");
    }
    else {
      this.processApiData(username);
    }
  }

  public processApiData(username: string) {
    this.authService.checkExistingUser(username).subscribe({
      next: (user: Iuser[]) => {
        if (user && user.length > 0) {
          this.coreService.openSanckBar('Username already exists. Please choose another username.');
        }
        else {
          this.authService.addNewUser(this.signupForm.value).subscribe({
            next: (newUser) => {
              this.authService.loggedIn = true;
              this.router.navigate(['/taskList'], { queryParams: { username: username, id: newUser.id } });
              this.coreService.openSanckBar("Sign Up Successful");
            },
            error: (err) => {
              console.error('Error during signup:', err);
              this.coreService.openSanckBar('An error occurred during signup. Please try again later.');
            }
          })
        }
      },
      error: (err) => {
        console.error('Error checking user existence:', err);
        this.coreService.openSanckBar('An error occurred while checking user existence. Please try again later.');
      }
    });
  }

}
