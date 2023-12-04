import { Component } from '@angular/core';
import { bands } from './Ibands';

@Component({
  selector: 'app-bands',
  templateUrl: './bands.component.html',
  styleUrl: './bands.component.css'
})
export class BandsComponent {
  groups: bands[] = [
    {
      name: "BTS",
      country: "South Korea",
      image: "assets/images/image-1.jpg",
      gender: "male",
      debutYear: 2013
    },
    {
      name: "Blackpink",
      country: "South Korea",
      image: "assets/images/image-2.jpg",
      gender: "female",
      debutYear: 2016
    },
    {
      name: "Twice",
      country: "South Korea",
      image: "assets/images/image-3.jpg",
      gender: "female",
      debutYear: 2015
    },
    {
      name: "Little Mix",
      country: "United Kingdom",
      image: "assets/images/image-4.jpg",
      gender: "female",
      debutYear: 2011
    },
    {
      name: "Fifth Harmony",
      country: "United States",
      image: "assets/images/image-5.jpg",
      gender: "female",
      debutYear: 2012
    },
    {
      name: "One Direction",
      country: "United Kingdom",
      image: "assets/images/image-6.jpg",
      gender: "male",
      debutYear: 2010
    },
    {
      name: "Chase Atlantic",
      country: "Australia",
      image: "assets/images/image-7.jpg",
      gender: "mixed",
      debutYear: 2014
    },
    {
      name: "EXO",
      country: "South Korea",
      image: "assets/images/image-8.jpg",
      gender: "male",
      debutYear: 2012
    },
    {
      name: "CNCO",
      country: "Puerto Rico",
      image: "assets/images/image-9.jpeg",
      gender: "male",
      debutYear: 2015
    },
    {
      name: "NCT 127",
      country: "South Korea",
      image: "assets/images/image-10.jpg",
      gender: "male",
      debutYear: 2016
    },
    {
      name: "2NE1",
      country: "South Korea",
      image: "assets/images/image-11.png",
      gender: "female",
      debutYear: 2009
    },
    {
      name: "Big Bang",
      country: "South Korea",
      image: "assets/images/image-12.jpg",
      gender: "male",
      debutYear: 2006
    },
    {
      name: "KARD",
      country: "South Korea",
      image: "assets/images/image-13.jpg",
      gender: "mixed",
      debutYear: 2017
    },
    {
      name: "ITZY",
      country: "South Korea",
      image: "assets/images/image-14.webp",
      gender: "female",
      debutYear: 2019
    },
    {
      name: "SNSD (Girls' Generation)",
      country: "South Korea",
      image: "assets/images/image-15.jpg",
      gender: "female",
      debutYear: 2007
    },
    {
      name: "One Republic",
      country: "United States",
      image: "assets/images/image-16.jpg",
      gender: "mixed",
      debutYear: 2002
    },
    {
      name: "WayV",
      country: "China",
      image: "assets/images/image-17.webp",
      gender: "male",
      debutYear: 2019
    }
  ];
  
  getAll(){
    return this.groups.length;
  }

  getMale(){
    return this.groups.filter(group => group.gender == "male").length;
  }

  getFemale(){
    return this.groups.filter(group => group.gender == "female").length;
  }

  groupsCountRadioButton = "All";
  
  onRadioButtonSelectionChange(data:string){
    this.groupsCountRadioButton = data;
  }
  
}
