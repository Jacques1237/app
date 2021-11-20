import { UploadImagesPage } from './../../upload-images/upload-images.page';
import { ForgotPasswordPage } from './../../forgot-password/forgot-password.page';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login-confirm',
  templateUrl: './login-confirm.page.html',
  styleUrls: ['./login-confirm.page.scss'],
})
export class LoginConfirmPage {

  email: string;
  password: string;
  upload : boolean = false;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  constructor(
    private modalController: ModalController,
    private auth: AuthService,
    private toastr: ToastController
    ) { }

  close(){
    this.modalController.dismiss();
  }
  
  login(){
    if(this.email && this.password){
      this.auth.signIn(this.email, this.password);
      this.upload = true;
    }else{
      this.toast('Please enter your email/password', 'warning');
    }
    
    if(this.upload == true){
      this.uploadImages();
    }
  }

  async toast(message,status){
    const toast = await this.toastr.create({
      message: message,
      color: status,
      position: 'top',
      duration: 2000
    });

    toast.present();
  }

  async forgotPassword(){
    const modal = await this.modalController.create({
      component: ForgotPasswordPage,
      cssClass:'modal-fullscreen',
      id:'ForgotPasswordPage'
    });
    return await modal.present();
  }
  async uploadImages(){
    const modal = await this.modalController.create({
      component: UploadImagesPage,
      cssClass:'modal-fullscreen',
      id:'UploadImagesPage'
    });
    return await modal.present();
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
}
}
