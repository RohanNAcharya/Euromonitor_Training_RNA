import { Component } from '@angular/core';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrl: './search-component.component.css'
})
export class SearchComponentComponent {
  public tasks: { id: number, task: string , completed: boolean}[] = [];
  public completedTasks: {id: number, task: string, completed: boolean}[] = [];
  public newTask: string = '';
  public id=0;

  public updateTask(newTask:string):void{
    if(this.newTask.trim()!== ''){
      this.id++;
      this.tasks.push({id: this.id, task: newTask, completed: false});
      console.log(this.tasks);
      this.newTask = '';
    }
  }

  public updateCompletedTasks(id:number):void{
    for(let i of this.tasks){
      if(i.id == id){
        i.completed = true;
        this.completedTasks.push(i);
        break;
      }
    }
  }

  public updateTaskCompletion(id:number):boolean{
    let taskIndex = this.tasks.findIndex(task => id == task.id);

    if(taskIndex!=-1){
      return this.tasks[taskIndex].completed
    }
    return false;
  }

  public deleteTask(id:number):void{
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  public deleteCompletedTask(id:number):void{
    this.completedTasks = this.completedTasks.filter(task => task.id !== id);
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
}
