import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';

const { SplashScreen } = Plugins;

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(
    public  modalController: ModalController,
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    //Establece un tiempo y muestra el splash animado
    SplashScreen.hide();
    setTimeout(() =>{
      this.modalController.dismiss();
    }, 5000);
  }

}
