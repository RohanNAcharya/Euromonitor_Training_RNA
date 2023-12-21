import { Component, inject } from '@angular/core';
import { DataService } from '../../Services/data.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css'
})
export class PlaylistComponent {
  songService: DataService = inject(DataService);

  songs = this.songService.playlist;
}
