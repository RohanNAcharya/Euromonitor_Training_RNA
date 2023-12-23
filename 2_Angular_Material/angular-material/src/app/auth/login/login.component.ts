import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isLoading: boolean = false;
  
  constructor(@Inject(Router) private router: Router){}

  onClick(){
    this.isLoading=true;
    setTimeout(() => {
      this.router.navigate(['/'])
    }, 2000);
  }
}