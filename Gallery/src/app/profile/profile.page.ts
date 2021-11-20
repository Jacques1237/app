import { EditProfilePage } from './../edit-profile/edit-profile.page';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: any;

  constructor(
    private auth: AuthService,
    private modalController: ModalController
    ) { }

  close(){
    this.modalController.dismiss();
  }

  ngOnInit() {
    this.auth.user$.subscribe(user =>{
      this.user=user;
    })
  }
  
  async editProfile(){
    const modal = await this.modalController.create({
      component: EditProfilePage,
      cssClass:'modal-fullscreen',
      id:' EditProfilePage'
    });
    return await modal.present();
    
  }
}
