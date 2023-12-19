import { Component, OnInit, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  
  ngOnInit(){
    this.activeRoute.fragment.subscribe((data) => {
      console.log(data);
      this.JumpToSection(data);
    });
  }

  JumpToSection(section:any){
    document.getElementById(section)?.scrollIntoView({behavior: 'smooth'})
  }
}
