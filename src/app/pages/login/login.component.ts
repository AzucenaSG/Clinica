import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  cliente: Cliente = {
    uid: '',
    email: '',
    celular: '',
    sexo: '',
    nombre: '',
    edad: 0,
    contrasena: ''
  };

  uid= '';
  suscriberUserInfo!: Subscription;
  id!: any;
  constructor(public firebaseauthService: FirebaseauthService,
              public firestoreService: FirestoreService,
              public alertController: AlertController,
              public toastController: ToastController,
              private navController: NavController) {
                this.firebaseauthService.stateAuth().subscribe( res => {
                  if (res !== null) {
                    this.uid = res.uid;
                    this.getUserInfo(this.uid);
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
      edad: 0,
      contrasena: ''
    };
  }

  ingresar(){
    const credenciales = {
      email: this.cliente.email,
      password: this.cliente.contrasena
    };
    if(credenciales.email.length && credenciales.password.length){
      this.firebaseauthService.login(credenciales.email, credenciales.password).then( res => {
        this.presentToast('ingreso exitoso','success','checkmark-outline');
        this.navController.navigateForward('/home');
        this.initCliente();
    }).catch ( error =>{
      const errorText =  error.toString();
      console.log('error a ', errorText);
      const error2 = errorText.substring(25,51);
      console.log('error2 ', error2);

      if(error2 === 'The email address is badly'){
        this.presentToast('ingresa un email valido','danger','close-outline');
      }
      if(error2 === 'There is no user record co'){
        this.presentToast('este usuario no existe','danger','close-outline');
      }
      if(error2 === 'The password is invalid or'){
        this.presentToast('contraseña incorrecta','danger','close-outline');
      }
      if(error2 === 'Access to this account has'){
        this.presentToast('Por seguridad se bloqueo el acceso comunicate con el administrador','danger','close-outline');
      }

    });
    }else{
      console.log('faltan datos');
      this.presentToast('faltan datos','danger','close-outline');
    }
  }

  getUserInfo(uid: string) {
    console.log('getUserInfo');
    const path = 'Clientes';
    this.suscriberUserInfo = this.firestoreService.getDoc<Cliente>(path, uid).subscribe( res => {
           if (res !== undefined) {
             this.cliente = res;
             console.log('getUserInfo',this.cliente );
            //  this.navController.navigateForward('/inicio');
           }
    });
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
