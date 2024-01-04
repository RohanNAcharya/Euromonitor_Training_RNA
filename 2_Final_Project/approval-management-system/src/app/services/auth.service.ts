import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iuser } from '../interfaces/Iuser';
import { Observable, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn = false;

  constructor(
    private http: HttpClient
  ) { }

  public apiurl = "http://localhost:3000/users";

  public registerNewUser(userData: Iuser): Observable<Iuser> {
      return this.http.post<Iuser>(this.apiurl, userData);
  }

  public getUsername(){
    return this.http.get<Iuser[]>(this.apiurl).pipe(
      map(users => users.map(user => user.username))
    );
  }

  public validateUserLogin(username:string, password:string, role:string): Observable<Iuser[]>{
    const params = new HttpParams()
                        .set('username', username)
                        .set('password', password)
                        .set('role', role);
                    
    return this.http.get<Iuser[]>(`${this.apiurl}`, { params });
  }
}
