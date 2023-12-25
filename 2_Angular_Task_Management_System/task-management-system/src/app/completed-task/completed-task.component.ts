import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-completed-task',
  templateUrl: './completed-task.component.html',
  styleUrl: './completed-task.component.css'
})
export class CompletedTaskComponent {
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  route: Router = inject(Router);
  username!: string;
  id!: number;
  
  ngOnInit(){
    this.activeRoute.queryParams.subscribe(params => {
      this.username = params['username']!;
      this.id = params['id']!;
    });
  }

  navigateBackToTaskList(){
    this.route.navigate(['/taskList'], { queryParams: { username: this.username, id: this.id } });
  }
}
