import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  playlist = [
    {
      index: 1,
      name: "Man Down",
      artist: "Rihanna",
      album: "Loud",
      year: 2010,
      label: "Def Jam Recordings"
    },
    {
      index: 2,
      name: "How You Like That",
      artist: "BLACKPINK",
      album: "THE ALBUM",
      year: 2020,
      label: "YG ENTERTAINMENT"
    },
    {
      index: 3,
      name: "On The Floor",
      artist: "Jennifer Lopez",
      album: "Love?",
      year: 2011,
      label: "Island Records"
    },
    {
      index: 4,
      name: "Side To Side",
      artist: "Ariana Grande",
      album: "Dangerous Woman",
      year: 2016,
      label: "Republic Records"
    },
    {
      index: 5,
      name: "Dynamite",
      artist: "BTS",
      album: "Dynamite",
      year: 2020,
      label: "Big Hit Entertainment"
    },
    {
      index: 6,
      name: "Money",
      artist: "Lisa",
      album: "LALISA",
      year: 2021,
      label: "YG ENTERTAINMENT"
    },
    {
      index: 7,
      name: "Despacito",
      artist: "Luis Fonsi ft. Daddy Yankee",
      album: "Vida",
      year: 2019,
      label: "Universal Music Latino"
    },
    {
      index: 8,
      name: "Gangnam Style",
      artist: "PSY",
      album: "Psy 6 (Six Rules), Part 1",
      year: 2012,
      label: "YG Entertainment"
    },
    {
      index: 9,
      name: "Baby",
      artist: "Justin Bieber",
      album: "My World 2.0",
      year: 2010,
      label: "Island Records"
    },
    {
      index: 10,
      name: "I Am The Best",
      artist: "2NE1",
      album: "2NE1",
      year: 2011,
      label: "YG Entertainment"
    },
    {
      index: 11,
      name: "Partition",
      artist: "Beyoncé",
      album: "Beyoncé",
      year: 2013,
      label: "Parkwood Entertainment"
    },
    {
      index: 12,
      name: "Sorry",
      artist: "Justin Bieber",
      album: "Purpose",
      year: 2015,
      label: "Def Jam Recordings"
    },
    {
      index: 13,
      name: "Waka Waka (This Time for Africa)",
      artist: "Shakira",
      album: "Listen Up! The Official 2010 FIFA World Cup Album",
      year: 2010,
      label: "Epic Records"
    }
  ];
  
    
}
