import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-login-confirm',
  templateUrl: './login-confirm.page.html',
  styleUrls: ['./login-confirm.page.scss'],
})
export class LoginConfirmPage {

  constructor(private modalController: ModalController) { }

  close(){
    this.modalController.dismiss();
  }

}
