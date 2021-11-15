import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginConfirmPage } from './login-confirm/login-confirm.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(private modalController: ModalController) { }

  close(){
    this.modalController.dismiss();
  }
  async signIn(){
    const modal = await this.modalController.create({
      component: LoginConfirmPage,
      cssClass:'modal-fullscreen',
      id:'LoginConfirmPage'
    });
    return await modal.present();
  }
}
