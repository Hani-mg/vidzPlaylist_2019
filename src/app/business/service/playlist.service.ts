import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { WebServiceConfiguration } from '../utilities/webServiceConfiguration';

import { Observable, of } from 'rxjs';
import { PlayList } from '../../business/models/playList.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService  extends WebServiceConfiguration {

  constructor(private http: HttpClient) { 
    super();
  }

  createNewPLayList(entitled, email):  Observable<PlayList> {
    const url = this.serverUrl + '/createNewPlayList/' + entitled + '/' + email;
    console.log(url);
    return this.http.get<any>(url)
    .pipe(
      map ( response =>  response.data as PlayList)
    );
  }

  getMyPlayList(email): Observable<Array<PlayList>> {
    const url = this.serverUrl + '/myPlayList/' + email;
    console.log(url);
    return this.http.get<any>(url)
    .pipe(
      map ( response =>  response.data as Array<PlayList>)
    );
  }

  addVideoToPlayList(idPlayList, title, artist, duratio, rank, img,  idVideo): Observable<any>{
   // const url='http://localhost:1852/addVideoById/5cd888e54b854e55246d0a1d/SecondVideo/Seanjari%20Preeti%20Womb%20Healing%20LLC/2019-05-19T15:23:20.000Z/2/4hJ6SD2Befc?img=https://i.ytimg.com/vi/4hJ6SD2Befc/default.jpg';
    const url = this.serverUrl + '/addVideoById/' + idPlayList + '/' + title + '/' + artist + '/' + duratio + '/' + rank  + '/' + idVideo+'?img='+img;
    console.log(url);
    return this.http.get<any>(url)
    .pipe(
      map ( response =>  response.data)
    );
  }

  changeRankVideoMoving(idplayList,oldRank, newRank, videoSource) :  Observable<any>{
    const url = this.serverUrl+'/changeRank/'+ idplayList +'/'+ oldRank+ '/' + newRank+ '/' +videoSource;
    console.log(url);
    return this.http.get<any>(url)
    .pipe(
      map ( response =>  response.data)
    );
  }

}
