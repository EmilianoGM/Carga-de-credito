import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FireAuthService {

  constructor(
    private fireAuth: AngularFireAuth
  ) { }

  /**
   * Para loggear un usuario de Firebase
   * @param value Recibe datos con un campo email y otro password
   */
  public loginUsuario(value) {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    });
  }

  /**
   * Desloggea al usuario, posiblemente chequeando una variable del servicio inyectado de Firebase
   */
  public logoutUsuario() {
    return new Promise((resolve, reject) => {
      if (this.fireAuth.currentUser) {
        this.fireAuth.signOut()
          .then(() => {
            console.log("LOG Out");
            resolve();
          }).catch((error) => {
            reject();
          });
      }
    });
  }

  /**
   * detallarUsuario
   */
  public detallarUsuario() {
    return this.fireAuth.user;
  }
}
