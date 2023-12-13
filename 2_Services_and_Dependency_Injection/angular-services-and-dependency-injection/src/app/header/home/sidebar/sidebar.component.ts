import { Component } from '@angular/core';
import { SubscribeService } from '../../../Services/subscribe.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private subService:SubscribeService){

  }

  OnSubscribe(){
    this.subService.OnSubscribeClicked('quarterly');
  }
}
