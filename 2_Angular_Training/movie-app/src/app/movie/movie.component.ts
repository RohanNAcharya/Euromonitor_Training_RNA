import { Component } from '@angular/core';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent {
  movies = [
    {
      id: 1,
      name: "Adhipurush",
      language: "Hindi",
      image: "assets/images/movie-1.jpg",
      voted: false
    },
    {
      id: 2,
      name: "Brahmastra",
      language: "Hindi",
      image: "assets/images/movie-2.jpg",
      voted: false
    },
    {
      id: 3,
      name: "The Flash",
      language: "English",
      image: "assets/images/movie-3.webp",
      voted: false
    },
    {
      id: 4,
      name: "Hoysala",
      language: "Kannada",
      image: "assets/images/movie-4.webp",
      voted: false
    }
  ]

  public onClick(id:number):void{
    console.log("Clicked!");
    for(let i of this.movies){
      if(i.id == id){
        if(i.voted){
          i.voted = false;
        }
        else{
          i.voted = true;
        }
      }
    }
  }

}
