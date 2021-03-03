import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { createUrlResolverWithoutPackagePrefix } from '@angular/compiler';
import { ICredito } from '../clases/credito';

@Injectable({
  providedIn: 'root'
})
export class CloudStorageService {
  coleccionCreditos: AngularFirestoreCollection
  correo: string;
  usuarios = ["admin", "usuario", "tester", "anonimo", "invitado"];
  constructor(
    private database: AngularFirestore,
  ) { 
    this.coleccionCreditos = this.database.collection('creditos');
  }

  public getCredito(){
    let tipo;
    switch(this.correo){
      case 'admin@admin.com':
        tipo = 'admin';
        break;
      case 'invitado@invitado.com':
        tipo = 'invitado';
        break;
      case 'usuario@usuario.com':
        tipo = 'usuario';
        break;
      case 'anonimo@anonimo.com':
        tipo = 'anonimo';
        break;
      case 'tester@tester.com':
        tipo = 'tester';
        break;
      default:
        tipo = 'admin';
        console.log("******DEFAULT********");
    }
    console.log("TIPO", tipo);
    return this.coleccionCreditos.doc(tipo).valueChanges();
  }

  public setCredito(credito: ICredito){
    let tipo;
    switch(this.correo){
      case 'admin@admin.com':
        tipo = 'admin';
        break;
      case 'invitado@invitado.com':
        tipo = 'invitado';
        break;
      case 'usuario@usuario.com':
        tipo = 'usuario';
        break;
      case 'anonimo@anonimo.com':
        tipo = 'anonimo';
        break;
      case 'tester@tester.com':
        tipo = 'tester';
        break;
      default:
        tipo = 'admin';
        console.log("******DEFAULT********");
    }
    return this.coleccionCreditos.doc(tipo).update(credito);
  }

  setword(scan: string){
    let mensaje = {
      msj: scan 
    }
    this.database.collection('algo').doc('1').set(mensaje);
  }
}
