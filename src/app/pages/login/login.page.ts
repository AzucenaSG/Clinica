import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isToastOpen = false;
  email= '';
  password= '';


  constructor( private router: Router,
    public firestoreService: FirestoreService,
    public firebaseauthservices: FirebaseauthService ) { 
    }

  ngOnInit() {
    
  }
   onSubmit(){
     console.log('submit')
 
   }
   crearcuenta(){
     this.router.navigateByUrl('/crear-cuenta')
   }
   contrasena(){
    this.router.navigateByUrl('/contrasena')
   }
   iniciar(isOpen: boolean){
    this.firebaseauthservices.login(this.email,this.password).then (() =>{
      console.log('se inicio con exito')
      this.router.navigateByUrl('/menu');
    });
    console.log('no hay datos')
    this.isToastOpen = true;
   }
  
  
}
