import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Cliente } from 'src/app/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  uid: any;

  isToastOpen = false;
  
  usuario: Cliente = {
    uid: '',
    nombre: '',
    email: '',
    password: '',
    genero: '',
    tel: 1
  }

  constructor( private router: Router,
    private firebaseauthservice: FirebaseauthService,
    private firestoreservices: FirestoreService,
    private navcontroller: NavController) {

      this.getactualizar();

    this.firebaseauthservice.stateAuth().subscribe( res => {
      if (res !== null) {
        this.uid = res.uid;
        console.log(this.uid);
        this.informacionusuario()
     }else {
      this.initCliente();
  }
     });
   }

  ngOnInit() {
  }
  initCliente(){
    this.usuario = {
    uid: '',
    nombre: '',
    email: '',
    password: '',
    genero: '',
    tel: 1
  
    }
  }
  redirigir(){
    this.navcontroller.pop();
  }
  informacionusuario(){
    const pathcuenta = 'cuenta';
    this.firestoreservices.getDoc<Cliente>(pathcuenta, this.uid).subscribe (res =>{
      console.log(res)

      if (res){
        this.usuario = res
      }
    });
  }
  cerrarsesion(){
    this.firebaseauthservice.logout();
    this.navcontroller.navigateForward('login')
  }
  actualizarcambios(isOpen: boolean){
    const pathregistrar = 'cuenta';
    this.firestoreservices.createDoc(this.usuario, pathregistrar, this.usuario.uid).then(() =>{
      console.log('se actualizaron los cambios con exito', this.usuario);
      this.isToastOpen = isOpen;
    });
  }
  getactualizar(){
    const pathregistrar = 'cuenta';
    this.firestoreservices.getDoc<Cliente>(pathregistrar, this.uid).subscribe (res =>{
      console.log(res)
      if( res){
        this.usuario = res;
        console.log(this.usuario)
      }
    });
  }

}
