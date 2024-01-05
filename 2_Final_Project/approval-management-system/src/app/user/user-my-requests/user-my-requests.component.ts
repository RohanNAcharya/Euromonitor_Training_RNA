import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../../services/requests.service';
import { GetUserService } from '../../services/get-user.service';
import { Irequest } from '../../interfaces/Irequest';

@Component({
  selector: 'app-user-my-requests',
  templateUrl: './user-my-requests.component.html',
  styleUrl: './user-my-requests.component.css'
})
export class UserMyRequestsComponent implements OnInit{
  currentUser = JSON.parse(sessionStorage.getItem('currentUser')!);
  currentUsername: string = this.currentUser!.username;
  managers: { [key: string]: string } = {};
  currentUserRequests!: Irequest[];

  constructor(
    private requestService: RequestsService,
    private getUserService: GetUserService
  ){}

  ngOnInit(){
    this.getAllManagers();
    this.getAllRequests();
  }

  public getAllManagers(): void {
    this.getUserService.getAllManagers().subscribe({
      next: (managers) => {
        for(let manager of managers){
          this.managers[manager.username.toLowerCase()] = manager.firstname[0].toUpperCase() + manager.firstname.slice(1) + ' ' + manager.lastname[0].toUpperCase() + manager.lastname.slice(1);
        }
        console.log(this.managers);
      }
      
    })
  }

  public getAllRequests(): void {
    this.requestService.getRequests(this.currentUsername.toLowerCase()).subscribe({
      next: (data) =>{
        this.currentUserRequests = data.reverse();
        console.log(this.currentUserRequests);
      }
    })
  }
}
