import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Iuser } from '../Interfaces/Iuser';
import { Itask } from '../Interfaces/Itask';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  addTask(id:number, task:Itask): Observable<Iuser>{
    const userTasksUrl = `${this.apiUrl}/${id}`;
    return this.http.get<Iuser>(userTasksUrl).pipe(
      switchMap(user => {
        user.tasks = user.tasks || [];
        task.id = user.tasks.length + 1;
        user.tasks.push(task);
        return this.http.put<Iuser>(userTasksUrl, user);
      })
    )
  }

  getEmployeeList(id: number): Observable<Iuser>{
    const userTasksUrl = `${this.apiUrl}/${id}`;
    return this.http.get<Iuser>(userTasksUrl);
  }

  updateTask(userData:Iuser, oldTask:Itask, updatedTask:Itask): Observable<Iuser>{
    const userTasksUrl = `${this.apiUrl}/${userData.id}`;
    const indexToUpdate = userData.tasks.findIndex((task) => task.id === oldTask.id);
    console.log(indexToUpdate);
    if(indexToUpdate !== -1){
      userData.tasks[indexToUpdate].category = updatedTask.category;
      userData.tasks[indexToUpdate].title = updatedTask.title;
      userData.tasks[indexToUpdate].duedate = updatedTask.duedate;
      userData.tasks[indexToUpdate].completed = updatedTask.completed;
    }
    return this.http.put<Iuser>(userTasksUrl, userData);
  }

  deleteTask(userId:number, taskId:number): Observable<Iuser>{
    const userTasksUrl = `${this.apiUrl}/${userId}`;
    return this.http.get<Iuser>(userTasksUrl).pipe(
      switchMap(user => {
        user.tasks = user.tasks.filter(task => task.id !== taskId);
        return this.http.put<Iuser>(userTasksUrl, user);
      })
    )
  }

  updateTaskCompleted(userId:number, taskId:number): Observable<Iuser>{
    const userTasksUrl = `${this.apiUrl}/${userId}`;
    return this.http.get<Iuser>(userTasksUrl).pipe(
      switchMap(user => {
        const taskToUpdate = user.tasks.find(task => task.id === taskId)!;
        taskToUpdate.completed = !taskToUpdate?.completed;
        console.log(taskToUpdate);
        return this.http.put<Iuser>(userTasksUrl, user);
      })
    )
  }
}
