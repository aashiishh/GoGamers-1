import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { User } from '../../app/Model/user';
import { MessageService } from '../../providers/message/message';
//import * as firebase from 'firebase';
import { AngularFireAuth } from "angularfire2/auth";
import { FirebaseService } from '../../providers/firebase-service/firebase-service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  user = {} as User;

  constructor(private afAuth: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams, private mesgService:MessageService,private fireService:FirebaseService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  ifEmpty() : boolean
  {
    if( this.user.password && this.user.confirmPassword && this.user.email && (this.user.password == this.user.confirmPassword))
    {
         return false;
    }  
      else  
      return true;
  }

  signUp()
  {
    this.mesgService.showLoading();
    this.afAuth.auth.createUserWithEmailAndPassword(this.user.email,this.user.password).then( () => {
       // this.user = this.fireService.updateUserProfile();
       //this.fireService.updateUserProfile();
       this.fireService.sendEmailVerificationLink();
       // this.mesgService.Toast("Success!!");
       this.mesgService.loading.dismiss();
    })
    .catch(error => {
     var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/weak-password') {
   this.mesgService.Toast('The password is too weak.');
   this.mesgService.loading.dismiss();
  } 
  else 
     {
        this.mesgService.PopUp('error',errorMessage);
        this.mesgService.loading.dismiss();
     }
  })
  
   
 }


  logIn()
  {
    this.navCtrl.setRoot(LoginPage);
  }

}
