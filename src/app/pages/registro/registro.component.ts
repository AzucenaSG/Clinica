import { Component, OnInit } from '@angular/core';
import { AlertController, CheckboxCustomEvent, NavController, ToastController } from '@ionic/angular';
import { Cliente } from 'src/app/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent  implements OnInit {
  cliente: Cliente = {
    uid: '',
    email: '',
    celular: '',
    sexo: '',
    nombre: '',
    edad: 0,
    contrasena: ''
  };

  canDismiss = false;

  uid= '';
  id!: any;

  // @ViewChild('popover') popover: any;
  // isOpen = false;
  constructor(public toastController: ToastController,
              private navController: NavController,
              public firebaseauthService: FirebaseauthService,
              public firestoreService: FirestoreService,
              public alertController: AlertController,) { }

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

  onTermsChanged(event: Event) {
    const ev = event as CheckboxCustomEvent;
    this.canDismiss = ev.detail.checked;
    console.log('can true o false',this.canDismiss);
  }

  registrar(){
    if(this.canDismiss){
      this.presentToast('terminos aeptados','success','close-outline');
     this.registrarse();
    }else{
      this.presentToast('Tienes que aceptar los terminos y condiciones','danger','close-outline');
    }
  }

  async registrarse(){
    const credenciales = {
      email: this.cliente.email,
      password: this.cliente.contrasena
    };
    if(credenciales.email.length && credenciales.password.length){
        const res = await this.firebaseauthService.registrar(credenciales.email, credenciales.password).catch( err =>{
          console.log('error->', err);
          const errorText =  err.toString();
          console.log('error a ', errorText);
          const error2 = errorText.substring(25,51);
          console.log('error2 ', error2);
    
          if(error2 === 'The email address is badly'){
            this.presentToast('ingresa un email valido','danger','close-outline');
          }
          if(error2 === 'Password should be at leas'){
            this.presentToast('la contraseña tiene que tener mas de 6 caracteres','danger','close-outline');
          }
          if(error2 === 'The email address is alrea'){
            this.presentToast('este email ya fue registrado intenta con otro','danger','close-outline');
          }
      
         });
        console.log(res);
        this.id = await this.firebaseauthService.getUid();
        this.cliente.uid = this.id;
        this.guardarUser();
        console.log(this.uid);
    }else{
      console.log('sin datos');
    }
  }

  async guardarUser() {
    const path = 'Clientes';
    const name = this.cliente.nombre;
    this.firestoreService.createDoc(this.cliente, path, this.cliente.uid).then( res => {
        console.log('guardado con exito', res);
        this.navController.navigateForward('/home');
    }).catch(   error => {
      console.log('error', error);
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
