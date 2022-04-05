import { Component, OnInit } from '@angular/core';

import { SignService } from '../../business/service/sign.service';


@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit {
  defaultLoginPage=true;
  signUpPage=false;
  loginData: any = {};
  signUpData : any = {};
  
  constructor(private signService: SignService) { 

    if (localStorage.getItem('currentUser') != null ) {
      window.location.href = 'watchVideo';
   }
  }

  ngOnInit() {
  }


  showSignUPPage(){
    this.defaultLoginPage=false;
  }

  showSignInPage(){
    this.defaultLoginPage=true;
  }

  signUp(){

    this.signService.getUserSignUp(this.signUpData.name, this.signUpData.firstname, this.signUpData.email, this.signUpData.password)
    .subscribe( currentUser => {
                                    localStorage.setItem('currentUser', JSON.stringify(currentUser)) ;
                                    console.log('session' + localStorage.getItem('currentUser'));
                                    window.location.href='watchVideo';
                                } );
  }

  signIn() {

    this.signService.getUserLogged(this.loginData.email, this.loginData.password)
    .subscribe( currentUser => {
                                    localStorage.setItem('currentUser', JSON.stringify(currentUser)) ;
                                    console.log('session' + localStorage.getItem('currentUser'));
                                    window.location.href='watchVideo';
                                } );
  }
}
