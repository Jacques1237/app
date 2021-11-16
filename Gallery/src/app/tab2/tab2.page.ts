import { LoginPage } from './../login/login.page';
import { Component } from '@angular/core';
import {ModalController } from '@ionic/angular';
import { API_BASE } from 'src/environments/environment';
import { ImageModalPage } from '../image-modal/image-modal.page';
import { IImage } from '../Interfaces/IImage';
//import { PhotoService } from '../services/photo.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  currentImage: any;
  sliderOpts = {
    zoom: false,
    slidesPerView: 1.5,
    centeredSlides: true,
    spaceBetween: 20
  };

  api: string = API_BASE;
  
  
  public featuredImage : IImage[] = [];
  public images: IImage[] = [];

  constructor(private modalController:ModalController,private http: HttpClient){}

  //constructor(public photoService: PhotoService) {  }
  openPreview(index){
    this.modalController.create({
      component: ImageModalPage,
      componentProps:{
        index: index,
        images: this.images
      }
    }).then(modal => modal.present());
  }
  ngOnInit() {
   this.loadGallery();
 }

 public createImgPath = (serverPath: string) => { //?
  return `${API_BASE}/${serverPath}`;
}

 loadGallery(): void {
  
  this.http.get(API_BASE + '/api/Gallery')
    .subscribe((res:any )=> {
      this.images = res as IImage[]
      this.featuredImage = this.images.filter(x => x.featured);
      console.log(this.images);
    })
}

async login(){
  const modal = await this.modalController.create({
    component: LoginPage,
    cssClass:'modal-fullscreen',
    id:'LoginPage'
  });
  return await modal.present();
}
}
