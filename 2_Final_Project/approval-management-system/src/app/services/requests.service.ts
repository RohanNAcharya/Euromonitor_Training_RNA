import { Injectable } from '@angular/core';
import { Irequest } from '../interfaces/Irequest';
import { Observable, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
