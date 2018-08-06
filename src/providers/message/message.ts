import { Injectable } from '@angular/core';
import { AlertController, ToastController,LoadingController, Loading	 } from 'ionic-angular';

@Injectable()
export class MessageService {
  loading: Loading;
  constructor( public popUp:AlertController,public toast:ToastController,private loadingCtrl: LoadingController) {
  }

  PopUp(message1,message2)
  {
    let alert=this.popUp.create({
      title: message1,
      subTitle: message2,
      buttons: ['OK'],
    });
    alert.present();
  }

  Toast(Message)
  {
    let myToast= this.toast.create({
      message: Message,
      position:'bottom',
      duration:3000,
      //showCloseButton: true,
      //closeButtonText: 'Got it!',
      //dismissOnPageChange: true,
      cssClass: "toast-style",

    });
    myToast.present();
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }


}
