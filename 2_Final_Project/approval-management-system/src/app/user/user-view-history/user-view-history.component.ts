import { Component, OnInit, ViewChild } from '@angular/core';
import { Irequest } from '../../interfaces/Irequest';
import { GetUserService } from '../../services/get-user.service';
import { Iuser } from '../../interfaces/Iuser';
import { RequestsService } from '../../services/requests.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-view-history',
  templateUrl: './user-view-history.component.html',
  styleUrl: './user-view-history.component.css'
})
export class UserViewHistoryComponent implements OnInit {
  public currentUserRequests!: Irequest[];
  public filteredData!: Irequest[];
  public managers: { [key: string]: string } = {};
  public currentUser!: Iuser;
  public currentUsername!: string;
  public displayedColumns: string[] = ['requestId', 'approver', 'purpose', 'description', 'estimatedCost', 'spentAmount', 'approvalStatus', 'approverComments'];
  public dataSource!: MatTableDataSource<Irequest, MatPaginator>; 
  public fromDate!: Date|null;
  public toDate!: Date|null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private getUserService: GetUserService,
    private requestService: RequestsService
  ){}
  
  ngOnInit(){
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser')!);
    this.currentUsername = this.currentUser!.username;
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
        this.currentUserRequests = data.reverse().filter(requests => !requests.withdrawn)
        console.log(this.currentUserRequests);

        this.dataSource = new MatTableDataSource<Irequest>(this.currentUserRequests);
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  public applyFilter(): void {
    if(this.fromDate && this.toDate){
      this.filteredData = this.currentUserRequests.filter(request => {
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
    }
  }

  public resetFilter(): void {
    this.fromDate = null;
    this.toDate = null;
    this.dataSource = new MatTableDataSource<Irequest>(this.currentUserRequests);
    this.dataSource.paginator = this.paginator;
  } 
}
