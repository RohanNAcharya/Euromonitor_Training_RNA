import { Injectable } from '@angular/core';
import { Irequest } from '../interfaces/Irequest';
import { Observable, switchMap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  public requests_apiurl = "http://localhost:3000/requests";
  
  constructor(
    private http:HttpClient
  ) { }

  public addRequest(request: Irequest): Observable<Irequest>{
    return this.http.get<Irequest[]>(this.requests_apiurl).pipe(
      switchMap((requests: Irequest[]) => {
        let newRequestId = requests.length + 1;
        request.requestId = this.updateRequestId(newRequestId);
        return this.http.post<Irequest>(this.requests_apiurl, request);
      })
    )
  }

  public getRequests(username: string): Observable<Irequest[]>{
    const params = new HttpParams()
                        .set('requestedBy', username);
    return this.http.get<Irequest[]>(`${this.requests_apiurl}`, { params });
  }

  public updateRequest(request: Irequest): Observable<Irequest> {
    const url = `${this.requests_apiurl}/${request.id}`;
    return this.http.put<Irequest>(url, request)
  }

  public getRequestsByApprover(username: string): Observable<Irequest[]>{
    const params = new HttpParams()
                        .set('approver', username);
    return this.http.get<Irequest[]>(`${this.requests_apiurl}`, { params });
  }

  public updateRequestId(requestId: number): string{
    let finalReqId!:string;
    (requestId<100) ? 
      (requestId < 10) ? 
        finalReqId = 'req00' + requestId 
        : finalReqId =  'req0' + requestId 
      : finalReqId =  'req' + requestId;
    
      return finalReqId;
  }

}
