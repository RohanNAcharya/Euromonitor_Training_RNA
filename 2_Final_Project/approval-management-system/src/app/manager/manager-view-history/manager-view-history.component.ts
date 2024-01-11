import { Component, ViewChild } from '@angular/core';
import { Irequest } from '../../interfaces/Irequest';
import { Iuser } from '../../interfaces/Iuser';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { GetUserService } from '../../services/get-user.service';
import { RequestsService } from '../../services/requests.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-view-history',
  templateUrl: './manager-view-history.component.html',
  styleUrl: './manager-view-history.component.css'
})
export class ManagerViewHistoryComponent {
  public currentManagerApprovalRequests!: Irequest[];
  public filteredData!: Irequest[];
  public users: { [key: string]: string } = {};
  public currentUser!: Iuser;
  public currentUsername!: string;
  public displayedColumns: string[] = ['requestId', 'requestedBy', 'purpose', 'description', 'estimatedCost', 'spentAmount', 'approvalStatus', 'userComments'];
  public dataSource!: MatTableDataSource<Irequest, MatPaginator>; 
  public fromDate!: Date|null;
  public toDate!: Date|null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private getUserService: GetUserService,
    private requestService: RequestsService,
    private localStorageService: LocalStorageService,
    private router: Router
  ){}
  
  ngOnInit(): void {
    this.currentUser = this.localStorageService.getUserItem('currentUser');
    this.currentUsername = this.currentUser!.username;
    this.getAllUsers();
    this.getAllRequests();
  }

  public getAllUsers(): void {
    this.getUserService.getAllUsers().subscribe({
      next: (users) => {
        for(let user of users){
          this.users[user.username.toLowerCase()] = user.firstname[0].toUpperCase() + user.firstname.slice(1) + ' ' + user.lastname[0].toUpperCase() + user.lastname.slice(1);
        }
        console.log(this.users);
      }
    })
  }

  public getAllRequests(): void {
    this.requestService.getRequestsByApprover(this.currentUsername.toLowerCase()).subscribe({
      next: (data) =>{
        this.currentManagerApprovalRequests = data.reverse().filter(requests => !requests.withdrawn)
        console.log(this.currentManagerApprovalRequests);

        this.dataSource = new MatTableDataSource<Irequest>(this.currentManagerApprovalRequests);
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  public applyFilter(): void {
    if(this.fromDate && this.toDate){
      this.filteredData = this.currentManagerApprovalRequests.filter(request => {
        const requestDate: Date = new Date(request.requestedDate);
        const fromDate = new Date(this.fromDate!);
        const toDate = new Date(this.toDate!);

        const requestDateOnly = new Date(requestDate.getFullYear(), requestDate.getMonth(), requestDate.getDate());
        const fromDateOnly = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());
        const toDateOnly = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate());
        
        return requestDateOnly >= fromDateOnly && requestDateOnly <= toDateOnly;
      });

      this.dataSource = new MatTableDataSource<Irequest>(this.filteredData);
      this.dataSource.paginator = this.paginator;
      console.log("Datasource")
      console.log(this.dataSource)
      console.log("Datasource")
    }
  }

  public resetFilter(): void {
    this.fromDate = null;
    this.toDate = null;
    this.dataSource = new MatTableDataSource<Irequest>(this.currentManagerApprovalRequests);
    this.dataSource.paginator = this.paginator;
  }

  public onBackButtonClicked(): void {
      this.router.navigate(["/manager-home/manager-request-form"]);
  }
}
