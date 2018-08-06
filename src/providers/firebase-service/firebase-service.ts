import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { User } from '../../app/Model/user';
import { MessageService } from '../message/message';

@Injectable()
export class FirebaseService {

  user = {} as User;
isAuthenticated : boolean;

  constructor(private mesgService:MessageService) {
    firebase.auth().onAuthStateChanged(user => {
      if(user)
      this.isAuthenticated= true;
      else
      this.isAuthenticated =false;
    });

  }

  async sendEmailVerificationLink()
  {
        await firebase.auth().currentUser.sendEmailVerification().then(() => {
          this.mesgService.PopUp('Congratulations!!','You are Registered Successfully, Please verify your email address through the link we have sent you on your email address.');
        }).catch(err =>
        {
            this.mesgService.PopUp('error',err);
        });
  }

  currentUser()
  {
     if(this.isAuthenticated)
      return firebase.auth().currentUser; 
     else
     console.log("No Authenticated user")
  }


}
