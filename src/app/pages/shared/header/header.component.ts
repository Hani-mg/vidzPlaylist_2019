import { Component, OnInit } from '@angular/core';


import { Session } from '../../../business/utilities/session';

import { VideoService } from '../../../business/service/video.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends Session implements OnInit {
keyword: string;
  constructor() { 
    super();
    this.setConnectedUser();
  }

  ngOnInit() {
  }
  
  setKeyWordSearched(){
    localStorage.setItem('searchedKeyword', this.keyword);
    window.location.href='home';
  }

}
