import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
import { MessageService } from '../../providers/message/message';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

  constructor(public mesService:MessageService,public afauth:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,public modalCtrl:ModalController) {
  }

  close() {
    this.viewCtrl.dismiss();
  }

    openEditProfilePage() {
      this.close();
    let modal = this.modalCtrl.create(ProfilePage);
     modal.present();
  }
 
 async logout()
  {

    this.mesService.showLoading();
    this.viewCtrl.dismiss();
  await this.afauth.auth.signOut().then(re => {
        this.navCtrl.setRoot(LoginPage);
        this.mesService.Toast('Logged Out Successfully!!');
    }).catch(err => {
        this.mesService.loading.dismiss();
        this.mesService.PopUp('oops!','Something went wrong!!');
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }

}
