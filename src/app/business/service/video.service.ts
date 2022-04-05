
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { WebServiceConfiguration } from '../utilities/webServiceConfiguration';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VideoService extends WebServiceConfiguration {

  constructor(private http: HttpClient) {
    super();
  }

  public getVideosDefault() : Observable<any>  {
   const url = this.beginningLinkYoutubeAcces + 'search?key='+this.apiKeyYoutube+'&part=snippet,id&order=date&maxResults=6';
    //console.log(url);
    //this.http.get(url).subscribe(response => console.log(response));

   // console.log(url);
    return this.http.get<any>(url)
    .pipe(
      map ( response =>  response.items)
    );
  }

  public searchVideoByKeyWord(keyword) : Observable<any>  {
    const url = this.beginningLinkYoutubeAcces +'search?part=snippet&q='+keyword+'&maxResults=12&order=viewCount&key='+this.apiKeyYoutube;
     //console.log(url);
     return this.http.get<any>(url)
     .pipe(
       map ( response =>  response.items)
     );
   }
}
