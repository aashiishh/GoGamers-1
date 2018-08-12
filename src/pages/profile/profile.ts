import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ActionSheetController, Platform,LoadingController, Loading, } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera'
import { MessageService } from '../../providers/message/message';
import { User } from '../../app/Model/user';
import { AngularFireDatabase } from 'angularfire2/database';

declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  lastImage: string = null;
  imgsrc :string;
  loading: Loading;
  user = {} as User;
  constructor(public afDB:AngularFireDatabase,public navCtrl: NavController, private camera: Camera, private transfer: Transfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public platform: Platform, public navParams: NavParams,public viewCtrl:ViewController, public loadingCtrl: LoadingController, public mesService:MessageService) {
  }

  ionViewDidLoad() {
    this.imgsrc = "http://downloadicons.net/sites/default/files/contacts-icon-64397.png";
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }


  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
   
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.mesService.Toast('Error while selecting image.');
    });
  }

   private createFileName() {
      var d = new Date(),
      n = d.getTime(),
      newFileName =  n + ".jpg";
      return newFileName;
    }
     
    // Copy the image to a local folder
    private copyFileToLocalDir(namePath, currentName, newFileName) {
      this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
        this.lastImage = newFileName;
      }, error => {
        this.mesService.Toast('Error while storing file.');
      });
    }
     
  
     
    // Always get the accurate path to your apps folder
    public pathForImage(img) {
      if (img === null) {
        return '';
      } else {
        return cordova.file.dataDirectory + img;
      }
    }

    private uploadImage() {
        // Destination URL
        var url = this.user.photoUrl;
       
        // File for Upload
        var targetPath = this.pathForImage(this.lastImage);
       
        // File name only
        var filename = this.lastImage;
       
        var options = {
          fileKey: "file",
          fileName: filename,
          chunkedMode: false,
          mimeType: "multipart/form-data",
          params : {'fileName': filename}
        };
       
        const fileTransfer: TransferObject = this.transfer.create();
       
        this.loading = this.loadingCtrl.create({
          content: 'Uploading...',
        });
        this.loading.present();
       
        // Use the FileTransfer to upload the image
        fileTransfer.upload(targetPath, url, options).then(data => {
          this.loading.dismissAll()
          this.mesService.Toast('Image succesful uploaded.');
        }, err => {
          this.loading.dismissAll()
          this.mesService.Toast('Error while uploading file.');
        });
      }


  close()
  {
    this.viewCtrl.dismiss();
  }

}
