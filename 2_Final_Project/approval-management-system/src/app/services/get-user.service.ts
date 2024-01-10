import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iuser } from '../interfaces/Iuser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetUserService {

  public apiurl = "http://localhost:3000/users";

  constructor(
    private http: HttpClient
  ) { }

  public getAllManagers(): Observable<Iuser[]>{
    const params = new HttpParams().set('role', 'manager');
    return this.http.get<Iuser[]>(this.apiurl, { params });
  }

  public getAllUsers(): Observable<Iuser[]>{
    const params = new HttpParams().set('role', 'employee');
    return this.http.get<Iuser[]>(this.apiurl, { params });
  }

  public getUserByUsername(username: string): Observable<Iuser>{
    const params = new HttpParams().set('username', username);
    return this.http.get<Iuser>(this.apiurl, { params });
  }
}
