import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  imgsrc : string;
  constructor(public navCtrl: NavController,public modalCtrl:ModalController) {

  }

  ionViewDidLoad() {
    this.imgsrc = "http://downloadicons.net/sites/default/files/contacts-icon-64397.png";
  }

  openProfile() {
    let modal = this.modalCtrl.create(ProfilePage);
     modal.present();
  }

}
