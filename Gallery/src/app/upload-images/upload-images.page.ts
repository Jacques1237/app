import { ProfilePage } from './../profile/profile.page';
import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.page.html',
  styleUrls: ['./upload-images.page.scss'],
})
export class UploadImagesPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private auth: AuthService,
    private toastr: ToastController
    ) { }

  ngOnInit() {
  }

  logout(){
    this.auth.signOut();
    this.modalController.dismiss();
  }

  async profile(){
    const modal = await this.modalController.create({
      component: ProfilePage,
      cssClass:'modal-fullscreen',
      id:'ProfilePage'
    });
    return await modal.present();
  }

}
