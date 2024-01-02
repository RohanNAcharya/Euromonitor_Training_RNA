import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Itask } from '../../interfaces/Itask';

@Component({
  selector: 'app-completed-task',
  templateUrl: './completed-task.component.html',
  styleUrl: './completed-task.component.css'
})
export class CompletedTaskComponent {
  route: Router = inject(Router);
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  taskService: TaskService = inject(TaskService);

  username!: string;
  id!: number;
  comletedTasks!: Itask[];
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

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(params => {
      this.username = params['username']!;
      this.id = params['id']!;
    });
    this.getAllTasks();
  }

  public navigateBackToTaskList() {
    this.route.navigate(['/taskList'], { queryParams: { username: this.username, id: this.id } });
  }

  public getAllTasks(): void {
    this.taskService.getEmployeeList(this.id).subscribe({
      next: (data) => {
        this.comletedTasks = data.tasks.filter(task => task.completed)!;
      }
    });
  }

  public deleteTask(taskId: number): void {
    this.taskService.deleteTask(this.id, taskId).subscribe({
      next: (res) => {
        alert("Task Deleted");
        this.getAllTasks();
      },
      error: console.log
    })
  }
}
