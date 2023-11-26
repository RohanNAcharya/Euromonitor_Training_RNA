import { Component } from '@angular/core';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrl: './search-component.component.css'
})
export class SearchComponentComponent {
  tasks: { id: number, task: string , completed: boolean}[] = [];
  completedTasks: {id: number, task: string, completed: boolean}[] = [];
  newTask: string = '';
  id=0;

  updateTask(newTask:string){
    if(this.newTask.trim()!== ''){
      this.id++;
      this.tasks.push({id: this.id, task: newTask, completed: false});
      console.log(this.tasks);
      this.newTask = '';
    }
  }

  updateCompletedTasks(id:number){
    for(let i of this.tasks){
      if(i.id == id){
        i.completed = true;
        this.completedTasks.push(i);
        break;
      }
    }
  }

  updateTaskCompletion(id:number):boolean{
    let taskIndex = this.tasks.findIndex(task => id == task.id);

    if(taskIndex!=-1){
      return this.tasks[taskIndex].completed
    }
    return false;
  }

  deleteTask(id:number){
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  deleteCompletedTask(id:number){
    this.completedTasks = this.completedTasks.filter(task => task.id !== id);
  }
}
