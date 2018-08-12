import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { User } from '../../app/Model/user';
import { MessageService } from '../message/message';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';

@Injectable()
export class FirebaseService {

  user = {} as User;
isAuthenticated : boolean;

  constructor(private mesgService:MessageService,private afAuth:AngularFireAuth,private afDB:AngularFireDatabase) {
   this.afAuth.auth.onAuthStateChanged(user => {
      if(user)
      this.isAuthenticated= true;
      else
      this.isAuthenticated =false;
    });

  }

 async addUserInDatabase(user : User)
  {
       await this.afDB.database.ref().child('Users').child(user.uId).set({
            name : user.name,
            phoneNumber : user.phoneNumber,
            photourl : user.photoUrl
        });
  }


  async sendEmailVerificationLink()
  {
        await this.afAuth.auth.currentUser.sendEmailVerification().then(() => {
          this.mesgService.PopUp('Congratulations!!','You are Registered Successfully, Please verify your email address through the link we have sent you on your email address.');
        }).catch(err =>
        {
            this.mesgService.PopUp('error',err);
        });
  }

  currentUser()
  {
     if(this.isAuthenticated)
      return this.afAuth.auth.currentUser; 
     else
     console.log("No Authenticated user")
  }


}
