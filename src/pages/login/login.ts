import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../app/Model/user';
import { HomePage } from '../home/home';
//import * as firebase from 'firebase';
import { AngularFireAuth } from "angularfire2/auth";
import { MessageService } from '../../providers/message/message';
import { SignupPage } from '../signup/signup';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public user = {} as User;
  public isAuthenticated : boolean;

  constructor(private afAuth: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams, private mesgService:MessageService) {
  }

  signUp()
  {
    this.navCtrl.push(SignupPage);
  }


  async login()
  {
    this.mesgService.showLoading();
    await this.afAuth.auth.signInWithEmailAndPassword(this.user.email,this.user.password).then( () => {
      if(this.afAuth.auth.currentUser.emailVerified)
    {
      console.log("Successfully logged In");
      this.navCtrl.setRoot(HomePage);
    }
    else
    { 
      this.mesgService.PopUp('error','Please verify your email first');
      this.mesgService.loading.dismiss();
    } 
    }).catch(error =>{
       this.mesgService.loading.dismiss();
      this.mesgService.PopUp('error',error);
     })
    

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ifEmpty() : boolean
  {
    if(this.user.password && this.user.email)
      return false;
    else  
     return true;
  }

}
