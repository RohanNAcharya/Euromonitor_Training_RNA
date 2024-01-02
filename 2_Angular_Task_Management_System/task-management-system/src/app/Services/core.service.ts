import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private snackBar:MatSnackBar) { }

  openSanckBar(message: string, action: string = "okay"){
    this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'top'
    });
  }
}
