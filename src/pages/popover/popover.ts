import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';


@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,public modalCtrl:ModalController) {
  }

  close() {
    this.viewCtrl.dismiss();
  }

    openEditProfilePage() {
      this.close();
    let modal = this.modalCtrl.create(ProfilePage);
     modal.present();
  }
 

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }

}
