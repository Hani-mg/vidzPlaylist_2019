import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../business/service/video.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  videos: Array<any>=[];
  keywordSearched: string;
  constructor( private videoService: VideoService) { }

  ngOnInit() {
    this.defaultVideoShow();
  }

  defaultVideoShow(){
    if (localStorage.getItem('searchedKeyword') == null ){

      this.newsVideoShow();
    } else{
      console.log(' my keywod '+localStorage.getItem('searchedKeyword'));
      this.searchVideos(localStorage.getItem('searchedKeyword') );
    }
  }

  searchVideos(keyword){
   this.videoService.searchVideoByKeyWord(keyword).subscribe( videoList => { this.videos = videoList; });
   localStorage.removeItem('searchedKeyword');
  }

  newsVideoShow(){
      this.videoService.searchVideoByKeyWord('Actualité').subscribe( videoList => { this.videos = videoList; });
  }

  watchVideo(videoId){
    localStorage.setItem('videoIdWatched', videoId);
    window.location.href='watchVideo';
  }

}
