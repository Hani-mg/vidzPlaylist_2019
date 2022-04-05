import { Component, OnInit } from '@angular/core';

import { VideoService } from '../../business/service/video.service';
import { PlaylistService } from '../../business/service/playlist.service';

import { Session } from '../../business/utilities/session';

import { PlayList } from '../../business/models/playList.model';
import { User } from 'src/app/business/models/user.model';

import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { DomSanitizer,SafeResourceUrl,SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-watch-video',
  templateUrl: './watch-video.component.html',
  styleUrls: ['./watch-video.component.css']
})
export class WatchVideoComponent extends Session implements OnInit {
  videos: Array<any>=[];
  playListSelected = false;
  currentPlayListIndex: number;
  currentPlayList: PlayList;
  myPlayList: Array<PlayList> = [];
  videoNumberOfCurrentPlayList = 0;
  entitledNewPlayList: string;
  videoInProgress : SafeUrl ;

   // f : any=[];
  constructor(private videoService: VideoService, private playlistService: PlaylistService,private sanitizer: DomSanitizer) {
    super();
    this.setConnectedUser();
   this.initializeVideosWatching();
    this.getMyPlayList ();
    console.log(' session '+ JSON.stringify(this.connected)); 
   }

  ngOnInit() {
    //this.videoInProgress='https://www.youtube.com/embed/zRvhQ5Rf6-U';
this.getDefaultPlayingVideo();
  }

  getDefaultPlayingVideo(){
    console.log( ' warch '+localStorage.getItem('videoIdWatched'))
    if(localStorage.getItem('videoIdWatched')  == null){

      this.videoInProgress = this.sanitizer.bypassSecurityTrustResourceUrl( 'https://www.youtube.com/embed/zRvhQ5Rf6-U');
    } else{
      this. selectVideoToWatch(localStorage.getItem('videoIdWatched'));
      localStorage.removeItem('videoIdWatched');
    }
  }

  initializeVideosWatching() {
   this.videoService.getVideosDefault()
    .subscribe( videoList => { this.videos = videoList;
   // console.log('videos loading ' + JSON.stringify(this.videos));
   // console.log(' test variable '+this.videos[0].snippet.title);
    } );
  }

  getMyPlayList () {
    if (this.connected != null){
      this.playlistService.getMyPlayList(this.connected.email).subscribe( playList => {
        this.myPlayList = playList;
        console.log('playlist loading ' + JSON.stringify(this.myPlayList));
      });
    }
  }

  addVideoToCurrentPlayListSelected(title, artist, duratio, img, idVideo) {
    if (this.connected == null ) {
      alert('Erreur : vous devez vous connecter pour pouvoir créer votre playlist');
      window.location.href = 'sign';
    } else {
        if (!this.playListSelected) {
          alert('Veuillez d\'abord selectionner un playList existant ou créer un nouveau pour ajouter la vidéo');
        } else {
          this.playlistService.addVideoToPlayList(this.myPlayList[this.currentPlayListIndex]._id, title, artist, duratio, this.myPlayList[this.currentPlayListIndex].videos.length+1, img,  idVideo)
          .subscribe(addedVideo => {
            this.myPlayList[this.currentPlayListIndex].videos.push(addedVideo);
            this.videoNumberOfCurrentPlayList = this.myPlayList[this.currentPlayListIndex].videos.length;
          });
         // this.currentPlayList.videos.push(idVideo);
        }
    }
  }

  selectExistingPlayList(indexPlayList) {
    this.playListSelected = true;
    this.currentPlayListIndex = indexPlayList;
    this.currentPlayList = this.myPlayList[this.currentPlayListIndex];
    this.videoNumberOfCurrentPlayList = this.myPlayList[indexPlayList].videos.length;
    this.myPlayList[indexPlayList].videos.sort((a,b)=>{ return a.rank-b.rank });
    console.log('select playlist ' + JSON.stringify(this.myPlayList[indexPlayList])+' videosnumber '+ this.myPlayList[indexPlayList].videos.length);
  }

  createPlayList() {
    console.log(' new playList ' + this.entitledNewPlayList);
    this.playlistService.createNewPLayList(this.entitledNewPlayList, this.connected.email)
      .subscribe( newPlayList => {
        this.myPlayList.push(newPlayList);
        this.entitledNewPlayList = null;
       });
  }


  selectVideoToWatch(newVideoSource){
    this.videoInProgress = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+newVideoSource);
  }
  testAccesheader(){
    console.log(' test atteitn ');
  }


  drop(event: CdkDragDrop<string[]>) {
    //moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
    moveItemInArray(this.currentPlayList.videos, event.previousIndex, event.currentIndex);
   
    console.log(' before '+ event.previousIndex+' after '+event.currentIndex);
   // console.log(this.currentPlayList.videos);
   
   this.playlistService.changeRankVideoMoving(this.currentPlayList._id,event.previousIndex+1, event.currentIndex+1, this.currentPlayList.videos[event.currentIndex].source)
   .subscribe( newPlayList => {
    console.log(' done change rank database');
   });
    for ( let i=0; i< this.currentPlayList.videos.length;i++){
      this.currentPlayList.videos[i].rank = i + 1;
    }


  }



}
