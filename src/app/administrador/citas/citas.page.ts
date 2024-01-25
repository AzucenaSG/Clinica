import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Cliente } from '../../models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.scss'],
})
export class CitasPage implements OnInit {

  cliente!: Cliente;
  clienteres: Cliente[]=[];

  constructor(private router: Router,
    private firestoreservice: FirestoreService) { }

  ngOnInit() {
    this.veridcliente();
    this.initcliete();
  }
  initcliete(){
    this.cliente ={
      uid: this.firestoreservice.getId (),
      nombre: '',
      email: '',
      password: '',
      genero: '',
      tel:0
    }
  }
  redirigir(){
    this.router.navigateByUrl('/agenda-admin')
  }
  veridcliente(){
    const pathregistrar = 'cuenta';
    this.firestoreservice.getCollection <Cliente>(pathregistrar).subscribe (res =>{
      console.log(res)
      this.clienteres = res;
    });

  }
  idcliente(){
    this.router.navigate(['pacientes'])
  }

}
