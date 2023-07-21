import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { Cliente, Persona } from '../models';
import { FirebaseauthService } from './firebaseauth.service';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  uid!: string;

  persona: Persona = {
    id: '',
    celular: '',
    sexo: '',
    nombre: '',
    edad: 0,
    analisis: ''
  };

  cliente: Cliente = {
    uid: '',
    email: '',
    celular: '',
    sexo: '',
    nombre: '',
    edad: 0,
    contrasena: ''
  };
  suscriberUserInfo!: Subscription;
  constructor(private firestoreService: FirestoreService,
    public firebaseauthService: FirebaseauthService,
    private navController: NavController) {
      this.firebaseauthService.stateAuth().subscribe( res => {
        if (res !== null) {
          this.uid = res.uid;
          this.getUserInfo(this.uid);
       }else {
        this.navController.navigateForward('/home');
    }
       });
  }

  getUserInfo(uid: string) {
    const path = 'Clientes';
    this.suscriberUserInfo = this.firestoreService.getDoc<Cliente>(path, uid).subscribe( res => {
           if (res !== undefined) {
             this.cliente = res;
             this.persona = {
              id:  this.cliente.uid,
              celular:  this.cliente.celular,
              sexo:  this.cliente.sexo,
              nombre:  this.cliente.nombre,
              edad:  this.cliente.edad,
              analisis: ''
             }
             console.log('persona', this.persona);
           }
    });
  }

  editPersonaYo(){
    const path = 'Clientes';
    this.suscriberUserInfo = this.firestoreService.getDoc<Cliente>(path, this.uid).subscribe( res => {
           if (res !== undefined) {
             this.cliente = res;
             this.persona = {
              id:  this.cliente.uid,
              celular:  this.cliente.celular,
              sexo:  this.cliente.sexo,
              nombre:  this.cliente.nombre,
              edad:  this.cliente.edad,
              analisis: ''
             }
             console.log('persona yo', this.persona);
           }
    });
  }

  editPersona(nombre: string, edad: number, sexo: string){
    this.persona = {
      id: this.cliente.uid,
      celular: this.cliente.celular,
      sexo: sexo,
      nombre: nombre,
      edad: edad,
      analisis: ''
     }
     console.log('persona ext',this.persona);
  }

}
