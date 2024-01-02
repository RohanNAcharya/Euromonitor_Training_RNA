import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iuser } from '../interfaces/Iuser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn:boolean = false;
  baseUrl = "http://localhost:3000/users";

  constructor(private http: HttpClient) { }

  public validateLogin(username:string, password:string): Observable<Iuser[]>{
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);
      
    return this.http.get<Iuser[]>(`${this.baseUrl}`, { params });
  }

  public checkExistingUser(username:string): Observable<Iuser[]>{
    const params = new HttpParams()
      .set('username', username);
      
    return this.http.get<Iuser[]>(`${this.baseUrl}`, { params });
  }

  public addNewUser(data: Iuser): Observable<Iuser>{
    return this.http.post<Iuser>(`${this.baseUrl}`, data);
  }

}
