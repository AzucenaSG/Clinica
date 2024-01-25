import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoriasl, Cliente } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PersonaService } from 'src/app/services/persona.service';
import { FirebaseauthService } from '../../services/firebaseauth.service';

@Component({
  selector: 'app-pagina1',
  templateUrl: './pagina1.page.html',
  styleUrls: ['./pagina1.page.scss'],
})
export class Pagina1Page implements OnInit {

uid!: string;
nombre!: string;


  constructor(private router: Router, 
    private fireservice: FirestoreService,
    private personaservices: PersonaService,
    private firebaseauthservices: FirebaseauthService) {

      this.firebaseauthservices.stateAuth().subscribe( res => {
        if (res !== null) {
          this.uid = res.uid;
          console.log(this.uid);
          this.informacionusuario()
       }else {

    }
       });
     
     }

  ngOnInit() {
    this.informacionusuario();
  }

  personal(){
    this.router.navigateByUrl('/pagina3')
    this.personaservices.nombre = this.nombre;
    console.log(this.nombre);
  }
  alguienmas(){
    this.router.navigateByUrl('/pagina2')
  }
  redirigir(){
    this.router.navigateByUrl('/menu')
  }
  informacionusuario(){
    const pathcuenta = 'cuenta';
    this.fireservice.getDoc<Cliente>(pathcuenta, this.uid).subscribe (res =>{
      console.log(res)
        
      if (res){
        this.nombre = res?.nombre
       
      }
    });

  }
}