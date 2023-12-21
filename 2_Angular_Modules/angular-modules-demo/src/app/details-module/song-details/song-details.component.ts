import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../Services/data.service';

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.component.html',
  styleUrl: './song-details.component.css'
})
export class SongDetailsComponent{
  songService: DataService = inject(DataService);

  songs = this.songService.playlist;
}
