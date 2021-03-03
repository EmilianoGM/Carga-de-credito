import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Injectable({
  providedIn: 'root'
})
export class ScannerService {

  constructor(
    private barcodeScanner: BarcodeScanner
  ) { }

  /**
   * Retorna el código de una mesa dentro de una promesa, siempre que lo que se escanee tenga data en texto
   */
  public scanQR(): Promise<string>{
    return new Promise((resolve,reject) => {
      this.barcodeScanner.scan().then((barcodeData) => {
        if(!barcodeData.cancelled){
          resolve(barcodeData.text);
        } else {
          reject("No hay barcodeData");
        }
      }).catch((error) => {
        reject(error);
      });
    });
  }
}
