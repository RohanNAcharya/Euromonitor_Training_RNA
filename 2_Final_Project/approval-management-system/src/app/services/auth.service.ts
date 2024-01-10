import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iuser } from '../interfaces/Iuser';
import { Observable, map, switchMap } from 'rxjs';

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

  public updateUserLogoutTime(username:string, logoutTime: Date): Observable<Iuser[]>{
    const params = new HttpParams()
                        .set('username', username);

    return this.http.get<Iuser[]>(`${this.apiurl}`, { params }).pipe(
      switchMap((user: Iuser[]) => {
        user[0].lastLogoutTime = user[0].lastLogoutTime || "";
        user[0].lastLogoutTime = String(logoutTime);
        return this.http.put<Iuser[]>(`${this.apiurl}/${user[0].id}`, user[0]);
      })
    ) 
  }
}
