import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditTaskFormComponent } from '../add-edit-task-form/add-edit-task-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { CoreService } from '../../services/core.service';
import { Iuser } from '../../interfaces/Iuser';
import { Itask } from '../../interfaces/Itask';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  router: Router = inject(Router);
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  authService: AuthService = inject(AuthService);
  taskService: TaskService = inject(TaskService);
  coreService: CoreService = inject(CoreService);

  username!: string;
  id!: number;
  allTasks!: Itask[];
  userData!: Iuser;
  filteredTasks: Itask[] = [];
  selectedFilter: string = 'all';
  labelPosition: string = 'date-added'
  categoryColorMap: { [key: string]: string } = {
    "General": "#1A5276",
    "Event": "#D4AC0D",
    "Family/Home": "#9A7D0A",
    "Finance": "#943126",
    "Friends": "#6F257F",
    "Health": "#B03A2E",
    "Hobby": "#4E754E",
    "Learning": "#641E16",
    "Party": "#A04000",
    "Self-Care": "#D98880",
    "Shopping": "#17202A",
    "Study": "#7B241C",
    "Travel": "#283747",
    "Volunteer": "#4A235A",
    "Work": "#1F618D",
    "Workout": "#212F3C",
    "Other": "#424949",
  };

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(params => {
      this.username = params['username']!;
      this.id = params['id']!;
      this.getAllTasks();
    });
  }

  public openAddEditEmpForm() {
    const dialogRef = this.dialog.open(AddEditTaskFormComponent, { data: { id: Number(this.id) } });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAllTasks();
        }
      }
    });
  }

  public getAllTasks(): void {
    this.taskService.getEmployeeList(this.id).subscribe({
      next: (data) => {
        this.userData = data;
        console.log(this.selectedFilter);
        let categoryFilteredTasks = (this.selectedFilter === 'all') ?
          data.tasks :
          data.tasks.filter(task => task.category.toLowerCase() === this.selectedFilter);

        this.filteredTasks = (this.labelPosition === 'date-added') ?
          categoryFilteredTasks.sort((a, b) => Number(a.id) - Number(b.id)) :
          categoryFilteredTasks.sort((a, b) => new Date(a.duedate).getTime() - new Date(b.duedate).getTime());
        console.log(this.filteredTasks);
      }
    });
  }

  public onFilterChange(): void {
    this.getAllTasks();
  }

  public openEditForm(userData: Iuser, task: Itask): void {
    const dialogRef = this.dialog.open(AddEditTaskFormComponent, { data: { task, userData } });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAllTasks();
        }
      }
    });
  }

  public deleteTask(user: Iuser, taskId: number): void {
    this.taskService.deleteTask(user.id!, taskId).subscribe({
      next: (res) => {
        this.coreService.openSanckBar("Task Deleted");
        this.getAllTasks();
      },
      error: console.log
    })
  }

  public updateTaskCompleted(user: Iuser, taskId: number): void {
    this.taskService.updateTaskCompleted(user.id!, taskId).subscribe({
      next: (res) => {
        this.coreService.openSanckBar("Task Status Updated");
        this.getAllTasks();
      },
      error: console.log
    })
  }

  public logout(): void {
    this.authService.loggedIn = false;
    this.router.navigate(['/home']);
    this.coreService.openSanckBar('Loged out Successfully!')
  }

  public navigateToCompleted(): void {
    this.router.navigate(['/completed'], { queryParams: { username: this.username, id: this.id } });
  }

}

