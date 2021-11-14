import { IonicModule, ModalController } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ImageModalPage } from '../image-modal/image-modal.page';
import { IImage } from '../Interfaces/IImage';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }])
    
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {
  http: any;
  images: any[];
  constructor(private modalController:ModalController){

  }

 
}

