import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { NavController } from '@ionic/angular';
import { FirebaseauthService } from '../../services/firebaseauth.service';


@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.page.html',
  styleUrls: ['./crear-cuenta.page.scss'],
})
export class CrearCuentaPage implements OnInit {

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} ingresa de 6 a 8 caracteres`;
  }
  isToastOpen = false;
  isToastOpen2 = false;

  cliente!: Cliente;
  id!: any;
  constructor( private router: Router,
    private firestoreService: FirestoreService,
    private navController: NavController,
    private firebaseauthservices: FirebaseauthService,
    ) { }

  ngOnInit() {
    this.initcliente();
  }
  redirigir(){
    this.router.navigateByUrl('/login')
  }
  initcliente(){
    this.cliente ={
    uid: '',
    nombre: '',
    email: '',
    password: '',
    genero: '',
    tel: 0
    }
  }
  async crearcuenta(isOpen: boolean){
    console.log(this.cliente);
    if (this.cliente.email && this.cliente.password){
      this.firebaseauthservices.registrar(this.cliente.email, this.cliente.password).then(async ()=>{
          console.log('el usuario se registro con exito')
          this.isToastOpen = true;
          this.id = await this.firebaseauthservices.getUid();
        this.cliente.uid = this.id;
          this.registrarusuario();
      });
      console.log ('existe correo y password');
    }
    else{
      console.log('no hay datos')
      this.isToastOpen2 = true;
    }
  }
  registrarusuario(){
    const pathregistrar = 'cuenta';
    this.firestoreService.createDoc(this.cliente, pathregistrar, this.cliente.uid).then(() =>{
      console.log('se registro el usuario', this.cliente);
      this.navController.navigateForward('/menu');
    });
    
  }
}
