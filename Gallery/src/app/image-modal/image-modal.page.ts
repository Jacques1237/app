import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavParams, IonSlides } from '@ionic/angular';
import { API_BASE } from 'src/environments/environment';
import { IImage } from '../Interfaces/IImage';
@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.page.html',
  styleUrls: ['./image-modal.page.scss'],
})
export class ImageModalPage implements OnInit {
  img: IImage;
  
  public images: IImage[] = [];

  @ViewChild("slider", { static:false }) slider: IonSlides;
  sliderOpts = {
    initialSlide:1,
    zoom: {
      maxRatio: 3
    }
  };

  constructor(private navParams: NavParams, private modalController: ModalController) {}
  ngOnInit(): void {
    
  }

  ionViewWillEnter() {
    this.sliderOpts.initialSlide= this.navParams.get('index');
    this.images= this.navParams.get('images');
    
    
    //this.slides = this.ionSlides.getActiveIndex();
    
  }

  ionViewDidEnter(){
    this.slider.slideTo(this.sliderOpts.initialSlide,500,true);
  }

  zoom(zoomIn : boolean){
     this.slider.getSwiper().then(swiper => { 
      let zoom = swiper.zoom;
    if(zoomIn){
      zoom.in();
    }else{
      zoom.out();
    }})
  }

  public createImgPath = (serverPath: string) => { //?
    return `${API_BASE}/${serverPath}`;
  }
  
  next() {
    console.log(this.slider);
    this.slider.slideNext(100);
  }

  prev() {
    this.slider.slidePrev();
  }
  close(){
    this.modalController.dismiss();
  }

}
