import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Observable, filter, from, fromEvent, map, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'angular-observables';

  data: any[] = [];

  @ViewChild('createbtn') 
  createBtn:ElementRef;

  createBtnObs;

  array1 = [1, 3, 5, 7, 9];
  array2 = ['A', 'B', 'C', 'D'];

  //Observable
  // myObservable = new Observable((observer)=>{
  //   // observer.next([1, 2, 3, 4, 5]);
  //   setTimeout(() => { observer.next(1) }, 1000);
  //   setTimeout(() => { observer.next(2) }, 2000);
  //   setTimeout(() => { observer.next(3) }, 3000);
  //   // setTimeout(() => { observer.error(new Error('Something went wrong. Please try again later!')) }, 3000);
  //   setTimeout(() => { observer.next(4) }, 4000);
  //   setTimeout(() => { observer.next(5) }, 5000);
  //   setTimeout(() => { observer.complete() }, 6000);
  // });

  // myObservable = of(this.array1, this.array2, 20, 30, 'hello', true);

  promiseData = new Promise((resolve, reject) => {
    resolve([10, 20, 30, 40, 50]);
  })

  // myObservable = from(this.promiseData);

  //myObservable - 2, 4, 6, 8, 10, 12
  //Result - 10, 20, 30, 40, 50, 60
  myObservable = from([2, 4, 6, 8, 10, 12]).pipe(
    map((val) => {
      return val * 5;
    }), 
    filter((val) => {
      return val % 4 === 0;
    })
  );

  //transformedObs - 10, 20, 30, 40, 50, 60
  // transformedObs = this.myObservable.pipe(
  //   map((val) => {
  //     return val * 5;
  //   }), 
  //   filter((val) => {
  //     return val % 4 === 0;
  //   })
  // );

  // filteredObs = this.transformedObs.pipe(filter((val) => {
  //   return val % 4 === 0;
  // }));

  GetAsyncData(){
    
    //Observer
    // this.myObservable.subscribe((val: any) =>{
    //   // this.data = val;
    //   this.data.push(val);
    // },
    // (err) => {
    //   alert(err.message);
    // },
    // () => {
    //   alert("All the data is streamed!");
    // });

    this.myObservable.subscribe({
      next:(value:any) => {
        this.data.push(value);
        console.log(value);
      },
      error(err){
        alert(err.message);
      },
      complete(){
        alert('All the data is streamed!');
      }
    });
  }

  // buttonClicked(){
  //   let count = 0;
  //   this.createBtnObs = fromEvent(this.createBtn.nativeElement, 'click')
  //                         .subscribe((data) => {
  //                           console.log(data);
  //                           this.showItem(++count);
  //                         });
  // }

  ngAfterViewInit(){
    // this.buttonClicked();
  }

  // showItem(val){
  //   let div = document.createElement('div');
  //   div.innerText = 'Item ' + val;
  //   div.className = 'data-list';
  //   document.getElementById('container').appendChild(div);
  // }
}