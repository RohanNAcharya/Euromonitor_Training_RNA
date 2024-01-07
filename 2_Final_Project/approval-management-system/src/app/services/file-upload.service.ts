import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  constructor(private http: HttpClient) { }

  uploadFile(filename:string, file:File): Observable<string> {
      const formData = new FormData();
      formData.set('name', filename);
      formData.set('file', file);

      return this.http.post<string>('http://localhost:5000/uploads', formData).pipe(
        catchError((error) => {
          console.error('Error uploading file:', error);
          throw error;
        })
      );

    }    
}
