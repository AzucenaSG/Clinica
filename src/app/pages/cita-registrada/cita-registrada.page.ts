import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from '../../services/firestore.service';
import { Agendado } from 'src/app/models';
import { NavController } from '@ionic/angular';
import { Cliente } from '../../models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';

@Component({
  selector: 'app-cita-registrada',
  templateUrl: './cita-registrada.page.html',
  styleUrls: ['./cita-registrada.page.scss'],
})
export class CitaRegistradaPage implements OnInit {

  id: any;

  uid!: string;

  agendado: Agendado = {
    id:'',
    date: '2023-01-05',
    fecha: '',
    hora: '',
    asunto: '',
    nombre:'',
    tipoanalisis: '',
    textColor: '#800080',
    backgroundColor:'#ffc0cb',
    idusuario:'',
    File:'',
  }
   agendadores: Agendado[]=[];

  constructor( private router: Router,
    private firestoreservice: FirestoreService,
    private navcontroller: NavController,
    private activedroute: ActivatedRoute,
    private firebaseauthservice: FirebaseauthService ) {

      this.id = this.activedroute.snapshot.paramMap.getAll('id').toString();
      console.log(this.id);
     
      this.firebaseauthservice.stateAuth().subscribe( res => {
        if (res !== null) {
          this.uid = res.uid;
          console.log(this.uid);
          this.initagendado();

          this.getconsultarcita(this.id, this.uid);
       }else {
       
    }
       });
      
     
     }

  ngOnInit() {
    
  }
  initagendado(){
    this.agendado ={
      id:'',
      fecha: '',
      date: '2023-01-05',
      hora: '',
      asunto: '',
      nombre:'',
      tipoanalisis: '',
      textColor: '#800080',
      backgroundColor:'#ffc0cb',
      idusuario:'',
      File:'',
    }
  }
  redirigir(){
    this.navcontroller.pop();
  }
  getconsultarcita(idagendado: string, uid: string){
    const pathconsulta = 'cuenta/' + uid + '/citaregistrada';
    console.log('pathconsulta', pathconsulta);
    console.log(this.id);
    this.firestoreservice.getDoc<Agendado>(pathconsulta, idagendado).subscribe (res =>{
      console.log(res)
      if( res){
        this.agendado = res;
        console.log(this.agendado)
      }
    });

  } 

}
