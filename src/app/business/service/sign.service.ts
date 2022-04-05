import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { WebServiceConfiguration } from '../utilities/webServiceConfiguration';

import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class SignService  extends WebServiceConfiguration  {

  constructor(private http: HttpClient) { 
    super();
  }


   getUserLogged(email, password): Observable<User>{
    const url= this.serverUrl + '/signIn/' + email + '/' + password;
    console.log(url);
    return this.http.get<any>(url) 
    .pipe(
      map ( response =>  response.data as User)
    );
  }

  getUserSignUp(name,firstname,email, password): Observable<User>{
    const url= this.serverUrl + '/signUp/'+ name + '/' + firstname + '/' + email + '/' + password;
    console.log(url);
    return this.http.get<any>(url)
    .pipe(
      map ( response =>  response.data as User)
    );
  }

}
