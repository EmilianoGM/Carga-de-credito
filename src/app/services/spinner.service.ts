import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(
    private loadingController: LoadingController
  ) { }

  /**
   * Presenta un spinner en la pantalla por una cantidad de tiempo determinada
   * @param tiempo El tiempo en milisegundos
   */
  async presentLoading(tiempo: number){
    const loading = await this.loadingController.create({
      cssClass: 'customLoading',
      duration: tiempo,
      spinner: "dots"
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
}
