import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoginConfirmPage } from '../login-confirm/login-confirm.page';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage{
  name: string;
  lastName: string;
  email: string;
  password: string;

  constructor
  (
    private modalController: ModalController,
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private router : Router,
    private loadingCtrl: LoadingController,
    private toastr: ToastController

  ) { }


  close(){
    this.modalController.dismiss();
  }

  async register(){
    if(this.name && this.lastName && this.email && this.password)
    {
      const loading = await this.loadingCtrl.create({
        message: 'processing...',
        spinner: 'crescent',
        showBackdrop: true
      });
      loading.present();

      this.afauth.createUserWithEmailAndPassword(this.email, this.password).then((data) =>{
        this.afs.collection('user').doc(data.user.uid).set({
          'userId': data.user.uid,
          'userName': this.name,
          'userLastName': this.lastName,
          'userEmail': this.email,
          'createdAt': Date.now()
        })
        .then(() => {
          loading.dismiss();
          this.toast('Registration Success! Please Check Your Email!', 'success');
          this.signIn();
        })
        .catch(error => {
          loading.dismiss();
          this.toast(error.message, 'danger');
        })
      })
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
