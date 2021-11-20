import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { merge } from 'rxjs';
import { ProfilePage } from '../profile/profile.page';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  userId : string;
  name: string;
  lastName: string;
  email: string;
  constructor(
    private modalController: ModalController,
    private afs: AngularFirestore,
    private auth: AuthService,
    private loadingCtrl : LoadingController,
    private toastr: ToastController
    ) { }

  close(){
    this.modalController.dismiss();
  }

  ngOnInit() {
    this.auth.user$.subscribe(user =>{
      this.userId = user.userId;
      this.name = user.userName;
      this.lastName = user.userLastName;
      this.email = user.userEmail;
    })
  }

  async updateProfile(){
    const loading = await this.loadingCtrl.create({
      message: 'Updating...',
      spinner: 'crescent',
      showBackdrop: true
    })

    loading.present();

    this.afs.collection('user').doc(this.userId).set({
      'userName': this.name,
      'userLastName': this.lastName,
      'userEmail': this.email,
      'editAt': Date.now()
    },{merge: true})
    .then(()=>{
      loading.dismiss();
      this.toast('Update Success!','success');
      this.profile();
    })
    .catch(error => {
      loading.dismiss();
      this.toast(error.message, 'danger');
    })
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

  async profile(){
    const modal = await this.modalController.create({
      component: ProfilePage,
      cssClass:'modal-fullscreen',
      id:'ProfilePage'
    });
    return await modal.present();
  }
}
