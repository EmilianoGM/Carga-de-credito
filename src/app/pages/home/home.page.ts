import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular'
//Clases
import { ICredito } from '../../clases/credito';
//Servicios
import { CloudStorageService } from '../../services/cloud-storage.service';
import { ScannerService } from '../../services/scanner.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  mensaje: string;
  qrCode: string;
  creditoUsuario: ICredito;
  nuevoCredito: ICredito = {
    cien: 0,
    cincuenta: 0,
    diez: 0
  };

  constructor(
    private scannerService: ScannerService,
    private cloudStorageService: CloudStorageService,
    public toastController: ToastController,
    public spinnerService: SpinnerService
  ) {
    this.spinnerService.presentLoading(3000);
    this.cloudStorageService.getCredito().subscribe((snap)=>{
      this.creditoUsuario = {
        cien: snap.cien,
        cincuenta: snap.cincuenta,
        diez: snap.diez,
        saldo: snap.saldo
      }
    });
  }

  /**
   * Abre el scanner y compara el QR escaneado con los datos correspondientes, informando si son válidos o no al usuario
   */
  async scannearCredito(){
    let bandera = false;
    let admin = false;
    if(this.cloudStorageService.correo == "admin@admin.com"){
      admin = true;
    }
    const qrCredito: string = await this.scannerService.scanQR();
    if(qrCredito && qrCredito != ""){
      switch(qrCredito){
        case '8c95def646b6127282ed50454b73240300dccabc':
          if(admin && this.creditoUsuario.diez < 2){
            this.creditoUsuario.diez++;
            bandera = true;
            this.presentToast(1);
          } else if(this.creditoUsuario.diez < 1){
            this.creditoUsuario.diez++;
            this.presentToast(1);
            bandera = true;
          } else {
            this.presentToast(4);
          }
          break;
        case 'ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172 ':
          this.mensaje = "cincuenta, ", this.creditoUsuario.cincuenta;
          if(admin && this.creditoUsuario.cincuenta < 2){
            this.creditoUsuario.cincuenta++;
            bandera = true;
            this.presentToast(2);
          } else if(this.creditoUsuario.cincuenta < 1){
            this.creditoUsuario.cincuenta++;
            bandera = true;
            this.presentToast(2);
          } else {
            this.presentToast(4);
          }
          break;
        case '2786f4877b9091dcad7f35751bfcf5d5ea712b2f':
          if(admin && this.creditoUsuario.cien < 2){
            this.presentToast(3);
            this.creditoUsuario.cien++;
            bandera = true
          }else if(this.creditoUsuario.cien < 1){
            this.presentToast(3);
            this.creditoUsuario.cien++;
            bandera = true;
          } else {
            this.presentToast(4);
          }
          break;
        default:
          this.presentToast(5);
      }
      if(bandera){
        this.creditoUsuario.saldo = (100*this.creditoUsuario.cien) + (50*this.creditoUsuario.cincuenta) + (10*this.creditoUsuario.diez);
        this.cloudStorageService.setCredito(this.creditoUsuario);
      }
    }
  }


  /**
   * Limpia la información del saldo y los créditos cargados
   */
  public limpiarSaldo(){
    this.creditoUsuario = {
      cien: 0,
      diez: 0,
      cincuenta: 0,
      saldo: 0,
    }
    this.cloudStorageService.setCredito(this.creditoUsuario);
  }

  /**
   * Muestra un toast en pantalla con un mensaje especifico para la carga de crédito
   * @param opcion Número del 1 al 4 según la cantidad de créditos cargados (1:10 - 2:50 - 3:100 - 4:QR repetido) 
   */
  async presentToast(opcion: number) {
    let msj: string;
    switch(opcion){
      case 1:
        msj = 'Cargaste diez créditos.';
        break;
      case 2:
        msj = 'Cargaste cincuenta créditos.';
        break;
      case 3:
        msj = 'Cargaste cien créditos.';
        break;
      case 4:
        msj = 'Ya cargaste ese QR'; 
        break;
      default:
        msj = 'CODIGO INCORRECTO';
    }
    const toast = await this.toastController.create({
      message: msj,
      position: 'top',
      cssClass: 'customToast',
      duration: 3000
    });
    toast.present();
  }

}
