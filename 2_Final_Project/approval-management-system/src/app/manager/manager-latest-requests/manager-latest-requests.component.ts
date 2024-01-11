import { Component } from '@angular/core';
import { Iuser } from '../../interfaces/Iuser';
import { GetUserService } from '../../services/get-user.service';
import { RequestsService } from '../../services/requests.service';
import { Irequest } from '../../interfaces/Irequest';
import { ApproveDialogComponent } from '../../dialog-popups/approve-dialog/approve-dialog.component';
import { RejectDialogComponent } from '../../dialog-popups/reject-dialog/reject-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RequestDetailsComponent } from '../../dialog-popups/request-details/request-details.component';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-manager-latest-requests',
  templateUrl: './manager-latest-requests.component.html',
  styleUrl: './manager-latest-requests.component.css'
})
export class ManagerLatestRequestsComponent {
  public allRequesters: { [key: string]: string } = {};
  public allRequestersContact: { [key: string]: string } = {};
  public currentUser!: Iuser;
  public currentUsername!: string;
  public lastLogoutTime!: Date | null;
  public latestRequests!: Irequest[];

  constructor(
    private getUserService: GetUserService,
    private requestsService: RequestsService,
    private userService: GetUserService,
    private dialog: MatDialog,
    private localStorageService: LocalStorageService
  ){}

  ngOnInit(): void {
    // this.currentUser = JSON.parse(sessionStorage.getItem('currentUser')!)
    this.currentUser = this.localStorageService.getUserItem('currentUser');
    this.currentUsername = this.currentUser!.username;
    this.getAllRequesters();
    this.getCurrentUserDetails();
  }

  public getCurrentUserDetails(): void {
    this.getUserService.getUserByUsername(this.currentUsername).subscribe({
      next: (user:Iuser) => {
        this.lastLogoutTime = user.lastLogoutTime ? new Date(user.lastLogoutTime!) : null;
        this.getRequestsForApproval();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  public getAllRequesters(): void {
    this.userService.getAllUsersAndManagers().subscribe({
      next: (requesters) => {
        for(let requester of requesters){
          this.allRequesters[requester.username.toLowerCase()] = requester.firstname[0].toUpperCase() + requester.firstname.slice(1) + ' ' + requester.lastname[0].toUpperCase() + requester.lastname.slice(1);
          this.allRequestersContact[requester.username.toLowerCase()] = requester.contact;
          console.log(this.allRequesters);
          console.log(this.allRequestersContact);
        }
      }
    })
  }

  public getRequestsForApproval(): void {
    this.requestsService.getRequestsByApprover(this.currentUsername).subscribe({
      next: (requests:Irequest[]) => {
        const currentDateTime = new Date();
        this.latestRequests = requests.filter((request) => {
          const requestDate = new Date(request.requestedDate);
          return (requestDate >= this.lastLogoutTime! && requestDate <= currentDateTime) && request.approvalStatus === 'initiated'
        })
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  public openRequestDetails(request: Irequest, requesterName: string, requesterContact: string): void {
    this.dialog.open(RequestDetailsComponent, { data: {
      request: request,
      requesterName: requesterName,
      requesterContact: requesterContact
    } });    
  }

  public openApproveDialog(request: Irequest): void {
    this.dialog.open(ApproveDialogComponent, { data: {
      request: request
    } });
  }

  public openRejectDialog(request: Irequest): void {
    this.dialog.open(RejectDialogComponent, { data: {
      request: request
    } });
  }
}
