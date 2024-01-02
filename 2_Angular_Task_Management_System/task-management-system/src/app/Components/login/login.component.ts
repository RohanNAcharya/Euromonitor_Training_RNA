import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { CoreService } from '../../services/core.service';
import { Iuser } from '../../interfaces/Iuser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  router: Router = inject(Router);
  authService: AuthService = inject(AuthService);
  coreService: CoreService = inject(CoreService);
  
  loggedIn = false;
  login!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.login = this.fb.group({
      username: '',
      password: ''
    });
  }

  public onFormSubmit() {
    const username = this.login.value.username;
    const password = this.login.value.password;
    this.authService.validateLogin(username, password).subscribe({
      next: (user: Iuser[]) => {
        if (user && user.length > 0) {
          this.authService.loggedIn = true;
          this.router.navigate(['/taskList'], { queryParams: { username: username, id: user[0].id } });
        }
        else {
          this.coreService.openSanckBar('Invalid username or password');
        }
      },
      error: (err) => {
        if (err.status === 401) {
          this.coreService.openSanckBar('Unauthorized: Please check your username and password.');
        } else {
          this.coreService.openSanckBar('An error occurred while processing your request. Please try again later.');
        }
      }
    });
  }

}