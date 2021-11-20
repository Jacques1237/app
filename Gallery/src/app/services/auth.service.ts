import { async } from '@angular/core/testing';
import { User } from './../models/user';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { switchMap } from 'rxjs/operators';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;
  user: User;

  constructor(
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private router: Router,
    private LoadingCtrl: LoadingController,
    private toastr: ToastController
  )
  {
    this.user$ = this.afauth.authState.pipe(
      switchMap( user=> {
        if(user){
          return this.afs.doc<User>(`user/${user.uid}`).valueChanges();
        }else{
          return of(null);
        }
      })
    )
  }// end of constructor

  async signIn(email, password){
    const loading = await this.LoadingCtrl.create({
      message: 'Authenticating...',
       spinner: 'crescent',
       showBackdrop: true
    });
    loading.present();

    this.afauth.setPersistence(firebase.default.auth.Auth.Persistence.LOCAL).then(()=>{
      this.afauth.signInWithEmailAndPassword(email,password).then((data)=>{
        if(!data.user.emailVerified){
          loading.dismiss()
          this.toast('Please verify your email adress!','warning');
          this.afauth.signOut();
        }else{
          loading.dismiss();
          //this.router.navigate(['/login']);
        }
      })
      .catch(error =>{
        loading.dismiss();
        this.toast(error.message, 'danger');
      })
    })
    .catch(error =>{
      loading.dismiss();
      this.toast(error.message, 'danger');
    })
  }
  
  async signOut(){
    const loading = await this.LoadingCtrl.create({
       spinner: 'crescent',
       showBackdrop: true
    });
    loading.present();

    
    this.afauth.signOut().then(() =>{
      loading.dismiss();
      //this.router.navigate(['/login-confirm']);
    })
  }

  async toast(message, status){
    const toast = await this.toastr.create({
      message: message,
      color: status,
      position: 'top',
      duration: 2000,
    });
    toast.present();
  }
  
}

