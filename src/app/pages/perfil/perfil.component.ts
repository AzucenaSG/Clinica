import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent  implements OnInit {
  uid!: string;

  cliente: Cliente = {
    uid: '',
    email: '',
    celular: '',
    sexo: '',
    nombre: '',
    contrasena: ''
  };

  suscriberUserInfo!: Subscription;
  usuario = false;
  constructor(public firebaseauthService: FirebaseauthService,
              public firestoreService: FirestoreService,
              private navCtrl: NavController,
              public toastController: ToastController) {
                this.firebaseauthService.stateAuth().subscribe( res => {
                  if (res !== null) {
                    this.uid = res.uid;
                    this.getUserInfo(this.uid);
                    if (this.uid === 'ouTxtYBq2YNxYFoaJCPzpZiY6F73')  {
                      this.usuario = false;
                  }else{
                    this.usuario = true;
                  }
                 }else {
                  this.initCliente();
              }
                 });
              }

  ngOnInit() {}

  initCliente() {
    this.uid = '';
    this.cliente = {
      uid: '',
      email: '',
      celular: '',
      sexo: '',
      nombre: '',
      contrasena: ''
    };
  }

  getUserInfo(uid: string) {
    // console.log('getUserInfo');
    const path = 'Clientes';
    this.suscriberUserInfo = this.firestoreService.getDoc<Cliente>(path, uid).subscribe( res => {
           if (res !== undefined) {
             this.cliente = res;
           }
    });
  }

  async salir(){
    this.firebaseauthService.logout();
    this.suscriberUserInfo.unsubscribe();
    this.firebaseauthService.irlogin();
   }

   async guardarUser() {
    const path = 'Clientes';
    const name = this.cliente.nombre;
    this.firestoreService.createDoc(this.cliente, path, this.cliente.uid).then( res => {
        console.log('guardado con exito', res);
        this.presentToast('guardado con exito','success','close-outline');
    }).catch(   error => {
      console.log('error', error);
    });
  }

  back(){
    this.navCtrl.pop();
  }

  async presentToast(txto: any, color: any, icono: any) {
    const toast = await this.toastController.create({
      message: txto,
      mode: 'ios',
      duration: 2000,
      color: color,
      position : 'middle',
      buttons: [
        {
          icon: icono,
          role: 'info',
        }
      ],
    });
    toast.present();
  }

}
