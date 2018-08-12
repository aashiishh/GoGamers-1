import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
//import { ProfilePage } from '../profile/profile';
import { PopoverPage } from '../popover/popover';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  imgsrc : string;
  constructor(public navCtrl: NavController,public popoverCtrl: PopoverController) {

  }

  ionViewDidLoad() {
    this.imgsrc = "http://downloadicons.net/sites/default/files/contacts-icon-64397.png";
  }

  

openPopOver() {
  const popover = this.popoverCtrl.create(PopoverPage);
    popover.present();
}

}