import { Component } from '@angular/core';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent {
  movies = [
    {
      name: "Adhipurush",
      language: "Hindi",
      image: "assets/images/movie-1.jpg"
    },
    {
      name: "Brahmastra",
      language: "Hindi",
      image: "assets/images/movie-2.jpg"
    },
    {
      name: "The Flash",
      language: "English",
      image: "assets/images/movie-3.webp"
    },
    {
      name: "Hoysala",
      language: "Kannada",
      image: "assets/images/movie-4.webp"
    }
  ]
}
