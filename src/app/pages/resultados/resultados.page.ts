import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Agendado } from '../../models';
import { StoragefilesService } from 'src/app/services/storagefiles.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.page.html',
  styleUrls: ['./resultados.page.scss'],
})
export class ResultadosPage implements OnInit {

  idusuario!: string;
  citasres : Agendado []=[];

  selectedItemIndex: number|null = null; 
  contenidoVisible= false;

  constructor(  private router: Router,
    private firestoreservice: FirestoreService,
    private firebaseauthservice: FirebaseauthService,
    private storagefileservice: StoragefilesService ) { 

      this.firebaseauthservice.stateAuth().subscribe( res => {
        if (res !== null) {
          this.idusuario = res.uid;
          console.log(this.idusuario);
          this.getcitas();
       }else {
    }
       });
    }

  ngOnInit() {
   
  }

  redirigir(){
    this.router.navigateByUrl('/menu')
  } 
  getcitas(){
    const pathcitas = 'cuenta/' + this.idusuario + '/citaregistrada';
    console.log(pathcitas)
    this.firestoreservice.getCollection<Agendado>(pathcitas).subscribe (res =>{
      console.log(res);
      this.citasres = res;
    });
  }
  toggleContenido(index: number, cita: Agendado){
    if(this.selectedItemIndex === index){
      this.contenidoVisible = !this.contenidoVisible;
      console.log('if');
    }
    else{
      this.contenidoVisible = true;
      this.selectedItemIndex = index;
      console.log('else');

    }
    console.log('toggleContenido');
  }
  descargar(urlfile: string, idcita: string){
    console.log(urlfile);
      var pdfUrl = urlfile;    
      var link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'resultado_' + idcita;
      link.click();
  }


}