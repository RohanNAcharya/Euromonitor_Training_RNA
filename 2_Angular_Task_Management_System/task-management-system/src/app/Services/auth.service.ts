import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { task } from './task.service';


export interface User{
  id?: number,
  username: string,
  password: string,
  tasks: task[]
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn:boolean = false;
  baseUrl = "http://localhost:3000/users";

  constructor(private http: HttpClient) { }

  validateLogin(username:string, password:string): Observable<User[]>{
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);
      
    return this.http.get<User[]>(`${this.baseUrl}`, { params });
  }

  checkExistingUser(username:string): Observable<User[]>{
    const params = new HttpParams()
      .set('username', username);
      
    return this.http.get<User[]>(`${this.baseUrl}`, { params });
  }

  addNewUser(data: User): Observable<User>{
    return this.http.post<User>(`${this.baseUrl}`, data);
  }

}
