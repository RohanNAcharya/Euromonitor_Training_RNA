import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditTaskFormComponent } from '../add-edit-task-form/add-edit-task-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService, task } from '../Services/task.service';
import { AuthService, User } from '../Services/auth.service';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit{
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  username!: string;
  id!: number;
  allTasks!: task[];
  userData!: User;
  authService: AuthService = inject(AuthService);
  categoryColorMap: { [key: string]: string } = {
    "General": "#80bfff",
    "Work": "#8080ff",
    "Shopping": "#ff80ff",
    "Study": "#ff8080",
    "Hobby": "#d5ff80",
    "Family": "#ffff80",
    "Friends": "#df80ff",
    "Party": "#ffd480",
    "Other": "#b3cccc"
  };

  constructor(
    private dialog: MatDialog,
    private taskService: TaskService
  ){}

  ngOnInit(){
    this.activeRoute.queryParams.subscribe(params => {
      this.username = params['username']!;
      this.id = params['id']!;
      this.getAllTasks();
    });
  }

  openAddEditEmpForm(){
    const dialogRef = this.dialog.open(AddEditTaskFormComponent, { data: {id: Number(this.id) } });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.getAllTasks();
        }
      }
    });
  }

  getAllTasks():void{
    this.taskService.getEmployeeList(this.id).subscribe({
      next: (data) => {
        console.log(data.tasks);
        this.userData = data;
        this.allTasks = data.tasks;
        console.log(this.allTasks);
      }
    });
  }

  openEditForm(userData:User, task:task):void{
    const dialogRef = this.dialog.open(AddEditTaskFormComponent, { data: {task, userData} });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.getAllTasks();
        }
      }
    });
  }

  deleteTask(user:User, taskId:number):void{
    this.taskService.deleteTask(user.id!, taskId).subscribe({
      next: (res) => {
        alert("Task Deleted");
        this.getAllTasks();
      },
      error: console.log
    })
  }

  updateTaskCompleted(user:User, taskId:number):void{
    this.taskService.updateTaskCompleted(user.id!, taskId).subscribe({
      next: (res) => {
        alert("Task Status Updated");
        this.getAllTasks();
      },
      error: console.log
    })
  }

  logout(){
    this.authService.loggedIn = false;
    this.router.navigate(['/home']);
  }

  navigateToCompleted(){
    this.router.navigate(['/completed'], { queryParams: { username: this.username, id: this.id } });
  }
}

