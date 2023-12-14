import { Component, OnInit } from '@angular/core';
import { AsyncSubject, BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.css'
})
export class SubjectComponent implements OnInit{
  ngOnInit(){
    //*********** Observables vs Subjects ***********
    // let obs = new Observable((observer) => {
    //   observer.next(Math.random());
    // });

    // const subject = new Subject();

    // //Subscriber 1
    // subject.subscribe((data) => {console.log(data)});

    // //Subscriber 2
    // subject.subscribe((data) => {console.log(data)});

    // subject.next(Math.random());

    //AJAX CALL
    // const subject = new Subject();
    // const data = ajax('https://randomuser.me/api/');

    // subject.subscribe((response) => {console.log(response)});
    // subject.subscribe((response) => {console.log(response)});
    // subject.subscribe((response) => {console.log(response)});

    // data.subscribe(subject);
    //*********** Observables vs Subjects ** END ***********

    
    
    // //*********** Behaviour Subject ************
    // // const subject = new Subject();
    // const subject = new BehaviorSubject<number>(100);

    // //Subscriber 1
    // subject.subscribe((data) => {console.log("Subscriber 1: " + data)});

    // //Subscriber 2
    // subject.subscribe((data) => {console.log("Subscriber 2: " + data)});

    // subject.next(2020);

    // //Subscriber 3 
    // subject.subscribe((data) => {console.log("Subscriber 3: " + data)});

    // subject.next(2023);
    // //*********** Behaviour Subject ** END ************



    //*********** Replay Subject ************
    // const subject = new Subject();
    // const subject = new BehaviorSubject<number>(100);

    // const subject = new ReplaySubject(2, 100);

    // subject.next(100);
    // subject.next(200);
    // subject.next(300);

    // //Subscriber 1
    // subject.subscribe((data) => {console.log("Subscriber 1: " + data)});

    // //Subscriber 2
    // subject.subscribe((data) => {console.log("Subscriber 2: " + data)});

    // subject.next(2020);

    // //Subscriber 3 
    // subject.subscribe((data) => {console.log("Subscriber 3: " + data)});

    // subject.next(2023);
    //*********** Replay Subject ** END ************



    //*********** Async Subject ************
    // const asyncSubject = new AsyncSubject();

    // asyncSubject.next(100);
    // asyncSubject.next(200);
    // asyncSubject.next(300);

    // asyncSubject.subscribe(data=> console.log(`Subscriber 1: ${data}`));

    // asyncSubject.complete();
    // asyncSubject.next(400);

    // asyncSubject.subscribe(data=> console.log(`Subscriber 2: ${data}`));

    //*********** Async Subject ** END ************



    //*********** Promise vs Observale ************
    const promise = new Promise((resolve, reject) => {
      console.log('Promise is called');
      resolve(100);
      resolve(200);
      resolve(300);
    });

    promise.then((data) => {
      console.log(data);
    });

    const obs = new Observable((sub) => {
      console.log('Observable is called');
      sub.next(100);
      sub.next(200);
      sub.next(300);
    });

    obs.subscribe(data => console.log(data));
    //*********** Promise vs Observale ** END ************
  }
}
