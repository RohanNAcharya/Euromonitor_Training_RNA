import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  public baseUrl = 'http://localhost:5000/uploads';

  constructor(private http: HttpClient) { }

  public uploadFile(filename:string, file:File): Observable<string> {
      const formData = new FormData();
      formData.set('name', filename);
      formData.set('file', file);

      return this.http.post<string>(this.baseUrl, formData).pipe(
        catchError((error) => {
          console.error('Error uploading file:', error);
          throw error;
        })
      );
    }   
    
  public downloadFile(filename: string): Observable<Blob> {
    const url = `${this.baseUrl}/${filename}`;
    return this.http.get(url, {responseType: 'blob'});
  }
}
