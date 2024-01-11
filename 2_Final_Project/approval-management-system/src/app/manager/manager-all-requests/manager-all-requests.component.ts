import { Component, OnInit } from '@angular/core';
import { Iuser } from '../../interfaces/Iuser';
import { Irequest } from '../../interfaces/Irequest';
import { GetUserService } from '../../services/get-user.service';
import { RequestsService } from '../../services/requests.service';
import { MatDialog } from '@angular/material/dialog';
import { RequestDetailsComponent } from '../../dialog-popups/request-details/request-details.component';
import { ApproveDialogComponent } from '../../dialog-popups/approve-dialog/approve-dialog.component';
import { RejectDialogComponent } from '../../dialog-popups/reject-dialog/reject-dialog.component';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-manager-all-requests',
  templateUrl: './manager-all-requests.component.html',
  styleUrl: './manager-all-requests.component.css'
})
export class ManagerAllRequestsComponent implements OnInit{
  public allRequesters: { [key: string]: string } = {};
  public allRequestersContact: { [key: string]: string } = {};
  public allRequestsForApproval!: Irequest[];
  public filteredRequests!: Irequest[];
  public currentUser!: Iuser;
  public currentUsername!: string; 
  public filteredString = "initiated";

  constructor(
    private userService: GetUserService,
    private requestsService: RequestsService,
    private dialog: MatDialog,
    private localStorageService: LocalStorageService
  ){}

  ngOnInit(): void {
    this.filteredString = "initiated";
    // this.currentUser = JSON.parse(sessionStorage.getItem('currentUser')!)
    this.currentUser = this.localStorageService.getUserItem('currentUser');
    this.currentUsername = this.currentUser!.username;
    this.getAllRequesters();
    this.getAllRequests();
  }

  public getAllRequesters(): void {
    this.userService.getAllUsersAndManagers().subscribe({
      next: (requesters) => {
        for(let requester of requesters){
          this.allRequesters[requester.username.toLowerCase()] = requester.firstname[0].toUpperCase() + requester.firstname.slice(1) + ' ' + requester.lastname[0].toUpperCase() + requester.lastname.slice(1);
          this.allRequestersContact[requester.username.toLowerCase()] = requester.contact;
        }
        console.log(this.allRequesters);
      }
    })
  }

  public getAllRequests(): void {
    this.requestsService.getRequestsByApprover(this.currentUsername.toLowerCase()).subscribe({
      next: (requests) => {
        this.allRequestsForApproval = requests.reverse().filter(requests => !requests.withdrawn);
        this.filteredRequests = this.allRequestsForApproval.filter(request => request.approvalStatus === this.filteredString);
      } 
    });
  }

  public filterRequests(): void {
    (this.filteredString === 'all') ?
        this.filteredRequests = this.allRequestsForApproval :
        this.filteredRequests = this.allRequestsForApproval.filter(request => request.approvalStatus === this.filteredString);
  }

  public onFilterChange(): void {
    this.filterRequests();
  }

  public openRequestDetails(request: Irequest, requesterName: string, requesterContact: string): void {
    const dialogRef = this.dialog.open(RequestDetailsComponent, { data: {
      request: request,
      requesterName: requesterName,
      requesterContact: requesterContact
    } });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.filterRequests();
        }
      }
    })
  }

  public openApproveDialog(request: Irequest): void {
    const dialogRef = this.dialog.open(ApproveDialogComponent, { data: {
      request: request
    } });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.filterRequests();
        }
      }
    })
  }

  public openRejectDialog(request: Irequest): void {
    const dialogRef = this.dialog.open(RejectDialogComponent, { data: {
      request: request
    } });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.filterRequests();
        }
      }
    })
  }

}
