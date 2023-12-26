import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { User } from './auth.service';

export interface task{
    id?:number,
    title: string,
    category: string,
    completed: boolean,
    duedate: string
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  addTask(id:number, task:task): Observable<User>{
    const userTasksUrl = `${this.apiUrl}/${id}`;
    return this.http.get<User>(userTasksUrl).pipe(
      switchMap(user => {
        user.tasks = user.tasks || [];
        task.id = user.tasks.length + 1;
        user.tasks.push(task);
        return this.http.put<User>(userTasksUrl, user);
      })
    )
  }

  getEmployeeList(id: number): Observable<User>{
    const userTasksUrl = `${this.apiUrl}/${id}`;
    return this.http.get<User>(userTasksUrl);
  }

  updateTask(userData:User, oldTask:task, updatedTask:task): Observable<User>{
    const userTasksUrl = `${this.apiUrl}/${userData.id}`;
    const indexToUpdate = userData.tasks.findIndex((task) => task.id === oldTask.id);
    console.log(indexToUpdate);
    if(indexToUpdate !== -1){
      userData.tasks[indexToUpdate].category = updatedTask.category;
      userData.tasks[indexToUpdate].title = updatedTask.title;
      userData.tasks[indexToUpdate].duedate = updatedTask.duedate;
      userData.tasks[indexToUpdate].completed = updatedTask.completed;
    }
    return this.http.put<User>(userTasksUrl, userData);
  }

  deleteTask(userId:number, taskId:number): Observable<User>{
    const userTasksUrl = `${this.apiUrl}/${userId}`;
    return this.http.get<User>(userTasksUrl).pipe(
      switchMap(user => {
        user.tasks = user.tasks.filter(task => task.id !== taskId);
        return this.http.put<User>(userTasksUrl, user);
      })
    )
  }

  updateTaskCompleted(userId:number, taskId:number): Observable<User>{
    const userTasksUrl = `${this.apiUrl}/${userId}`;
    return this.http.get<User>(userTasksUrl).pipe(
      switchMap(user => {
        const taskToUpdate = user.tasks.find(task => task.id === taskId)!;
        taskToUpdate.completed = !taskToUpdate?.completed;
        console.log(taskToUpdate);
        return this.http.put<User>(userTasksUrl, user);
      })
    )
  }
}
