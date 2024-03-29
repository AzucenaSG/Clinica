import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirestoreService } from './firestore.service';
import { NavController } from '@ionic/angular';
import { Cliente } from '../models';

@Injectable({
  providedIn: 'root'
})
export class FirebaseauthService {

  datosCliente!: Cliente;
  uid: any;

  constructor(public auth: AngularFireAuth,
    private firestoreService: FirestoreService,
    private navController: NavController) {
      this.stateUser();
    }


   stateUser() {
      this.stateAuth().subscribe( res => {
        // console.log(res);
        if (res !== null) {
           this.getInfoUser();
        }
     });
    }

  login(email: string, password: string){
    return this.auth.signInWithEmailAndPassword(email, password);
   }

   logout() {
    return this.auth.signOut();
   }

   registrar(email: string, password: string){
    return this.auth.createUserWithEmailAndPassword(email, password);
   }

   async getUid() {
    const user = await this.auth.currentUser;
    if (user === null) {
      return null;
    } else {
       return user.uid;
    }
 }

 stateAuth() {
  return this.auth.authState;
}

async getInfoUser() {
  this.uid = await this.getUid();
  const path = 'Clientes';
  this.firestoreService.getDoc<Cliente>(path, this.uid).subscribe( res => {
        if (res !== undefined) {
              this.datosCliente = res;
              console.log('datosCliente ->' , this.datosCliente);
        }
  });
}

irlogin(){
  this.navController.navigateForward('/login');
 }

}
