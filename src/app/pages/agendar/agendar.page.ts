import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, ModalController, NavController } from '@ionic/angular';
import { Agendado, Cliente } from 'src/app/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-agendar',
  templateUrl: './agendar.page.html',
  styleUrls: ['./agendar.page.scss'],
})
export class AgendarPage implements OnInit {

  uid = '';
  agendado!: Agendado;

  isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();
    return utcDay !== 1 && utcDay !== 8;
  };

  isModalOpen = false;
  // openmodal2= false;
  confirmar1 = false;

  fecha = '';
  fecha2!: string;
  dia!: number;
  mes!:number;
  year!: number;


  seleccionarfecha!: boolean;
  mostrarfecha!: boolean;

  hora!: '';

  highlightedDates : Agendado [] = [];
  fecha1!: string;

  fechasub!: string;

  hora12!: Agendado; 
  hora1!: Agendado;
  hora4!: Agendado;
  hora5!: Agendado;
  hora6!: Agendado;
  hora7!: Agendado;
  hora8!: Agendado;

  h12 = false;
  h1 = false;
  h4 = false;
  h5 = false;
  h6 = false;
  h7 = false;
  h8 = false;

  admin = false;

  constructor( private router: Router,
    public firestoreservice:FirestoreService,
    private actionSheetCtrl: ActionSheetController,
    private modalcontroller: ModalController,
    private navcontroller: NavController,
    private personalservice: PersonaService,
    private firebaseauthservice: FirebaseauthService,
    private alertController: AlertController ) {

      this.firebaseauthservice.stateAuth().subscribe( res => {
        if (res !== null) {
          this.uid = res.uid;
          console.log(this.uid);
          // this.confirmar()
          if(res.uid === 'g3gkGXGlAeTVwC6FQVyanU4VRrJ2'){
            this.admin = true;
          }
          else{
            this.admin = false;
          }
       }else {
       
    }
       });

     }

  ngOnInit() {
    this.fecha2 = 'hola';
    this.initagendado();
    this.getcitasregistradas();
  }
  initagendado(){
    this.agendado ={
      id: this.firestoreservice.getId (),
      fecha: '',
      date: '2023-01-05',
      hora: '',
      asunto: '',
      nombre: '',
      tipoanalisis: '',
      textColor: '#800080',
      backgroundColor:'#ffc0cb',
      idusuario:'',
      File: '',
    }
  }
  onSubmit(){
    console.log('submit');
  }
 redirigir(){
  this.navcontroller.pop();
  }
  fechaSeleccionada(){
    console.log('la fecha es', this.fecha)
    this.agendado.date = this.fecha.substring(0,10);
    this.fechasub = this.fecha.substring(0,10);
    console.log(this.agendado.date);
    const fechaSeleccionada = new
    Date(this.fecha);
    this.dia = fechaSeleccionada.getDate();
    this.mes = fechaSeleccionada.getMonth() + 1;
    this.year = fechaSeleccionada.getFullYear();
    this.fecha1 = this.dia + ' de ' +this.mes + ' de ' + this.year;

    // let dateString: string = this.fecha;
    // for (let i = 5; i < dateString.length; i++) {
    //  console.log(dateString[i]);
    // }
    console.log(this.fecha1)
    this.gethoras();
    this.agendado.fecha = this.fecha;
    this.isModalOpen = true;
    this.seleccionarfecha = true;
  }
  seleccionarhora(hora: any){
    if(this.admin === true){
      console.log('el admin no puede agendar')
    }
    else{
      this.seleccionarfecha = false;
    this.mostrarfecha = true;
    this.hora = hora;
    console.log(this.hora)
    this.confirmar1 = true;
    console.log('el usuario si puede agendar')
    }
    
  }
  cerrarmodal2(){
    this.mostrarfecha = false;
    this.seleccionarfecha = true;
    this.hora = '';
    this.isModalOpen = true;
  }
  confirmar(){
    if (this.confirmar1 == true){
    const pathconfirmar = 'cuenta/' + this.uid + '/citaregistrada';
    this.agendado.idusuario = this.uid;
    this.agendado.fecha = this.fecha1;
    this.agendado.hora = this.hora;
    this.agendado.nombre = this.personalservice.nombre;
    this.agendado.tipoanalisis = this.personalservice.tipoanalisis;
    this.firestoreservice.createDoc(this.agendado, pathconfirmar,this.agendado.id).then (() =>{
      console.log('se ha agendado la cita', this.agendado);
      this.guardarcitasadmin();
      this.guardaragenda();
      this.initagendado();
    });
    this.modalcontroller.dismiss();
    //  this.router.navigateByUrl('/cita-registrada');
    this.router.navigate(['cita-registrada',{id:[`${this.agendado.id}`]}])
    }
    else {
      console.log('no hay fecha seleccionada')
    }  
   
  }
  guardarcitasadmin(){
    const pathcitasadmin = 'citasadmin/';
    this.firestoreservice.createDoc(this.agendado, pathcitasadmin,this.agendado.id).then (() =>{
      console.log('se ha agendado la cita', this.agendado);
    });
  }
  getcitasregistradas(){
    const pathcoleccion = 'citaregistrada';
    this.firestoreservice.getCollectionAll<Agendado>(pathcoleccion).subscribe( res=>{
      console.log(res);
      this.highlightedDates = res;
    });
  }
  guardaragenda(){
    const pathcitas = 'citas/'+ this.agendado.date + '/horas/';
    this.firestoreservice.createDoc(this.agendado, pathcitas, this.agendado.hora).then (res =>{
      console.log('se guardo con exito');
    });
  }
  gethoras(){
    this.hora12 = {
      id: '',
      fecha: '',
      date: '',
      hora: '',
      asunto: '',
      nombre: '',
      tipoanalisis: '',
      textColor: '#800080',
      backgroundColor:'#ffc0cb',
      idusuario:'',
      File: '',

    }
    const path12 = 'citas/'+ this.fechasub + '/horas/'; 
    console.log(path12);
    this.firestoreservice.getDoc<Agendado>(path12, '12:00 pm').subscribe (res =>{
      if (res !== undefined){
        console.log(res)
        this.hora12 = res;
        this.h12 = true;
      }
      else{
        console.log(res);
        this.h12 = false;

      }
    });

    this.hora1 = {
      id: '',
      fecha: '',
      date: '',
      hora: '',
      asunto: '',
      nombre: '',
      tipoanalisis: '',
      textColor: '#800080',
      backgroundColor:'#ffc0cb',
      idusuario:'',
      File: '',

    }
    const path1 = 'citas/'+ this.fechasub + '/horas/'; 
    this.firestoreservice.getDoc<Agendado>(path1, '1:00 pm').subscribe (res =>{
      if (res !== undefined){
        console.log(res)
        this.hora1 = res;
        this.h1 = true;
      }
      else{
        console.log(res);
        this.h1 = false;
      }
    });

    this.hora4 = {
      id: '',
      fecha: '',
      date: '',
      hora: '',
      asunto: '',
      nombre: '',
      tipoanalisis: '',
      textColor: '#800080',
      backgroundColor:'#ffc0cb',
      idusuario:'',
      File: '',

    }
    const path4 = 'citas/'+ this.fechasub + '/horas/'; 
    this.firestoreservice.getDoc<Agendado>(path4, '4:00 pm').subscribe (res =>{
      if (res !== undefined){
        console.log(res)
        this.hora4 = res;
        this.h4 = true;
      }
      else{
        this.h4 = false;
      }
    });

    this.hora5 = {
      id: '',
      fecha: '',
      date: '',
      hora: '',
      asunto: '',
      nombre: '',
      tipoanalisis: '',
      textColor: '#800080',
      backgroundColor:'#ffc0cb',
      idusuario:'',
      File: '',

    }
    const path5 = 'citas/'+ this.fechasub + '/horas/'; 
    this.firestoreservice.getDoc<Agendado>(path5, '5:00 pm').subscribe (res =>{
      if (res !== undefined){
        console.log(res)
        this.hora5 = res;
        this.h5 = true;
      }
      else{
        this.h5 = false;
      }
    });
    this.hora6 = {
      id: '',
      fecha: '',
      date: '',
      hora: '',
      asunto: '',
      nombre: '',
      tipoanalisis: '',
      textColor: '#800080',
      backgroundColor:'#ffc0cb',
      idusuario:'',
      File: '',

    }
    const path6 = 'citas/'+ this.fechasub + '/horas/'; 
    this.firestoreservice.getDoc<Agendado>(path6, '6:00 pm').subscribe (res =>{
      if (res !== undefined){
        console.log(res)
        this.hora6 = res;
        this.h6 = true;
      }
      else{
        this.h6 = false;
      }
    });
    this.hora7 = {
      id: '',
      fecha: '',
      date: '',
      hora: '',
      asunto: '',
      nombre: '',
      tipoanalisis: '',
      textColor: '#800080',
      backgroundColor:'#ffc0cb',
      idusuario:'',
      File: '',

    }
    const path7 = 'citas/'+ this.fechasub + '/horas/'; 
    this.firestoreservice.getDoc<Agendado>(path7, '7:00 pm').subscribe (res =>{
      if (res !== undefined){
        console.log(res)
        this.hora7 = res;
        this.h7 = true;
      }
      else{
        this.h7 = false;
      }
    });

    this.hora8 = {
      id: '',
      fecha: '',
      date: '',
      hora: '',
      asunto: '',
      nombre: '',
      tipoanalisis: '',
      textColor: '#800080',
      backgroundColor:'#ffc0cb',
      idusuario:'',
      File: '',

    }
    const path8 = 'citas/'+ this.fechasub + '/horas/'; 
    this.firestoreservice.getDoc<Agendado>(path8, '8:00 pm').subscribe (res =>{
      if (res !== undefined){
        console.log(res)
        this.hora8 = res;
        this.h8 = true;
      }
      else{
        this.h8 = false;
      }
    });
  }

}
