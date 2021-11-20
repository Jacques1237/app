import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ModalController, ToastController, LoadingController } from '@ionic/angular';
import { LoginConfirmPage } from '../login/login-confirm/login-confirm.page';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  email:string;

  constructor(
     private modalController: ModalController,
     private afuath: AngularFireAuth,
     private toastr: ToastController,
     private loadingCtrl: LoadingController
     ) { }

  ngOnInit() {
  }

  close(){
    this.modalController.dismiss();
  }

  async resetPassword(){
    if(this.email)
    {
      const loading = await this.loadingCtrl.create({
        message: 'Sending reset password link...',
        spinner: 'crescent',
        showBackdrop:true
      });
      loading.present();

      this.afuath.sendPasswordResetEmail(this.email)
      .then(()=>{
        loading.dismiss();
        this.toast('Password Reset Success! Please Check Your Email!', 'success');
        this.signIn();
      })
      .catch(error => {
        loading.dismiss();
        this.toast(error.message, 'danger');
      })
    }else{
      this.toast('Please Enter Email address!', 'warning');
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

  async signIn(){
    const modal = await this.modalController.create({
      component: LoginConfirmPage,
      cssClass:'modal-fullscreen',
      id:'LoginConfirmPage'
    });
    return await modal.present();
  }

}
