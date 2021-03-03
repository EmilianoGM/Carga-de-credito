import { Component } from '@angular/core';

import { Platform, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { LoginPage } from './pages/login/login.page';
import { SplashPage } from './splash/splash.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  rootPage: any = LoginPage;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private modalController: ModalController
  ) {
    this.initializeApp();
  }

  initializeApp() {
      this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      let splash = this.modalController.create({
        component: SplashPage,
      });
      
      splash.then((data) => {
        data.present();
      });
      //this.splashScreen.hide();
    });
  }
}
