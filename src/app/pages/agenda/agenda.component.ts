import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Cita, Cliente, Persona } from 'src/app/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PersonaService } from '../../services/persona.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
})
export class AgendaComponent  implements OnInit {
  highlightedDates2: any;
  highlightedDates3: any;
  miVariableHora!: string;
  fechacalendar!: string;
  cita!: Cita;
  isOpen = false;
  isOpen2 = false;
  hora9!: Cita;
  hora10!: Cita;
  hora11!: Cita;
  hora12!: Cita;
  hora13!: Cita;
  hora14!: Cita;
  hora15!: Cita;
  hora16!: Cita;
  hora17!: Cita;
  hora18!: Cita
  h9 = true;
  h10 = true;
  h11 = true;
  h12 = true;
  h13 = true;
  h14 = true;
  h15 = true;
  h16 = true;
  h17 = true;
  h18 = true;

  uid= '';
  cliente: Cliente = {
    uid: '',
    email: '',
    celular: '',
    sexo: '',
    nombre: '',
    edad: 0,
    contrasena: '',
  };

  total = 1;
  nuevosSuscriber!: Subscription;
  costo: any;
  constructor(public firestoreService: FirestoreService,
    private navController: NavController,
    public firebaseauthService: FirebaseauthService,
    public toastController: ToastController,
    private route: ActivatedRoute,
    public alertController: AlertController,
    public personaService: PersonaService) {
      this.firebaseauthService.stateAuth().subscribe( (res:any) => {
        this.uid = res.uid;
        this.getUserInfo(this.uid);
     });
     this.costo = this.route.snapshot.paramMap.get('costo');
     console.log('costo',this.costo);
     this.getprueba();
    }

    ngOnInit() {
      this.highlightedDates2 = [];
      this.resetarcita();
    }

    async back(){
      // this.navController.navigateForward('/tipopago');
      if(this.costo === '0'){
        this.navController.navigateForward('/pagos');
      }else{
        const alert = await this.alertController.create({
          cssClass: 'asdff',
          header: 'Advertencia',
          message: ' Quieres regresar ala pestaña anterior aun NO agendas y ya has hecho el pago',
          buttons: [
            {
              text: 'cancelar',
              role: 'cancel',
              cssClass: 'normal',
              handler: () => {
                console.log('Confirm Cancel: blah');
              }
            }, {
              text: 'Ok',
              handler: () => {
                this.navController.navigateForward('/pagos');
              }
            }
          ]
        });
        await alert.present();
      }
    }
  
    getUserInfo(uid: string) {
      console.log('getUserInfo');
      const path = 'Clientes';
     this.firestoreService.getDoc<Cliente>(path, uid).subscribe( res => {
             if (res !== undefined) {
               this.cliente = res;
               console.log('getUserInfo',this.cliente );
             }
      });
    }
  
    resetarcita(){
      this.cita={
        id: '',
        paciente: '',
        tipo: '',
        fecha: '',
        fechasub: '',
        pago: '',
        analisis: '',
        hora: '',
        date: '',
        textColor: '#080000',
        backgroundColor: '#ffffff',
      }
    }
  
    fecha(){
      this.botonesfalse();
      this.resetarcita();
      console.log(this.miVariableHora);
      this.cita.fecha = this.miVariableHora;
      this.cita.fechasub = this.miVariableHora.substring(0,10)
      this.fechacalendar = this.miVariableHora.substring(0,10)
      // this.cita.hora = this.miVariableHora.substring(11,16)
      console.log(this.cita.fechasub);
      // console.log( this.cita.hora);
      // this.isModalOpen = isOpen;
      this.isOpen = true;
      console.log('this.fechacalendar',this.fechacalendar);
      this.loadcitas(this.fechacalendar);
    }
  
      
    modal2(hora: string){
      this.isOpen = false;
      this.isOpen2 = true;
      this.cita.hora = hora;
      this.cita.id =  this.cita.fechasub;
      this.cita.paciente = this.personaService.persona.nombre;
      this.cita.analisis = this.personaService.persona.analisis;
      this.cita.date = this.cita.fechasub;
      console.log('this.cita',this.cita);
    }
  
    botonesfalse(){
      this.h9 = true;
      this.h10 = true;
      this.h11 = true;
      this.h12 = true;
      this.h13 = true;
      this.h14 = true;
      this.h15 = true;
      this.h16 = true;
      this.h17 = true;
      this.h18 = true;
    }
  
  // guardo la ccita en un path general que leera el calendario del cliente y el del administrador
    guardarcita(){
      this.isOpen2 = false;
      if(this.costo === '0'){
        this.cita.pago = 'presencial'
        console.log('pago presencial', this.cita.pago);
      }else if(this.costo === undefined){
        this.cita.pago = 'presencial'
      }
      else{
        this.cita.pago = 'online'
        console.log('pago online', this.cita.pago);
      }
  
      const path = 'citas/' + this.cita.fechasub + '/horas/';
      const motivo = this.cita.tipo;
      if(motivo.length){
        console.log('interface', this.cita);
        this.firestoreService.createDoc(this.cita,path,this.cita.hora).then( res => {
          console.log('guardado con exito');
          this.guardarmicita();
          this.resetarcita();
          // this.navController.navigateForward('/micita');
        }).catch(   error => {
          console.log(error);
          console.log('error al guardar');
        });
      }else{
        console.log('agrega dato');
      }
    }
  
  // guardo la mi cita
    guardarmicita(){
      const path = 'Clientes/' + this.cliente.uid + '/micita/';
        console.log('interface', this.cita);
        this.firestoreService.createDoc(this.cita,path,this.cliente.uid).then( res => {
          console.log('guardado con exito');
          this.presentToast('cita agendada con exito','success','checkmark-outline');
        }).catch(   error => {
          console.log(error);
          console.log('error al guardar');
          this.presentToast('error al guarda la cita','danger','close-outline');
        });
    }
    
    // hago una consulta a todas las horas de la fecha seleccionada y si esa hora tiene guardada una cita el boton de agendar lo desaparesco
    loadcitas(fecha: string){
      this.hora9 ={
        id: '',
        paciente: '',
        tipo: '',
        fecha: '',
        fechasub: '',
        pago: '',
        hora: '',
        analisis: '',
        date: '',
        textColor: '#800080',
        backgroundColor: '#ffc0cb',
      };
      console.log('lafecha  que se recibe es', fecha)
      const path9 = 'citas/' + fecha + '/horas/';
      console.log('path9', path9);
      const id9 = '09:00';
      this.firestoreService.getDoc<Cita>(path9, id9).subscribe(res => {
        if (res !== undefined) {
          this.hora9 = res;
          this.h9 = false;
        }
        console.log('9', this.hora9);
      });
    
      this.hora10 ={
        id: '',
        paciente: '',
        tipo: '',
        fecha: '',
        fechasub: '',
        pago: '',
        hora: '',
        analisis: '',
        date: '',
        textColor: '#800080',
        backgroundColor: '#ffc0cb',
      };
      const path10 = 'citas/' + fecha + '/horas/';
      console.log('path10', path10);
      const id10 = '10:00';
      this.firestoreService.getDoc<Cita>(path10, id10).subscribe(res => {
        if (res !== undefined) {
          this.hora10 = res;
          this.h10 = false;
        }
        console.log('10', this.hora10);
      });
    
      this.hora11 ={
        id: '',
        paciente: '',
        tipo: '',
        fecha: '',
        fechasub: '',
        pago: '',
        hora: '',
        analisis: '',
        date: '',
        textColor: '#800080',
        backgroundColor: '#ffc0cb',
      };
      const path11 = 'citas/' + fecha + '/horas/';
      console.log('path11', path11);
      const id11 = '11:00';
      this.firestoreService.getDoc<Cita>(path11, id11).subscribe(res => {
        if (res !== undefined) {
          this.hora11 = res;
          this.h11 = false;
        }
        console.log('11', this.hora11);
      });
    
      this.hora12 ={
        id: '',
        paciente: '',
        tipo: '',
        fecha: '',
        fechasub: '',
        pago: '',
        hora: '',
        analisis: '',
        date: '',
        textColor: '#800080',
        backgroundColor: '#ffc0cb',
      };
      const path12 = 'citas/' + fecha + '/horas/';
      console.log('path12', path12);
      const id12 = '12:00';
      this.firestoreService.getDoc<Cita>(path12, id12).subscribe(res => {
        if (res !== undefined) {
          this.hora12 = res;
          this.h12 = false;
        }
        console.log('12', this.hora12);
      });
    
      this.hora13 ={
        id: '',
        paciente: '',
        tipo: '',
        fecha: '',
        fechasub: '',
        pago: '',
        hora: '',
        analisis: '',
        date: '',
        textColor: '#800080',
        backgroundColor: '#ffc0cb',
      };
      const path13 = 'citas/' + fecha + '/horas/';
      console.log('path13', path13);
      const id13 = '13:00';
      this.firestoreService.getDoc<Cita>(path13, id13).subscribe(res => {
        if (res !== undefined) {
          this.hora13 = res;
          this.h13 = false;
        }
        console.log('13', this.hora13);
      });
    
      this.hora14 ={
        id: '',
        paciente: '',
        tipo: '',
        fecha: '',
        fechasub: '',
        pago: '',
        hora: '',
        analisis: '',
        date: '',
        textColor: '#800080',
        backgroundColor: '#ffc0cb',
      };
      const path14 = 'citas/' + fecha+ '/horas/';
      console.log('path14', path14);
      const id14 = '14:00';
      this.firestoreService.getDoc<Cita>(path14, id14).subscribe(res => {
        if (res !== undefined) {
          this.hora14 = res;
          this.h14 = false;
        }
        console.log('14', this.hora14);
      });
    
      this.hora15 ={
        id: '',
        paciente: '',
        tipo: '',
        fecha: '',
        fechasub: '',
        pago: '',
        hora: '',
        analisis: '',
        date: '',
        textColor: '#800080',
        backgroundColor: '#ffc0cb',
      };
      const path15 = 'citas/' + fecha + '/horas/';
      console.log('path15', path15);
      const id15 = '15:00';
      this.firestoreService.getDoc<Cita>(path15, id15).subscribe(res => {
        if (res !== undefined) {
          this.hora15 = res;
          this.h15 = false;
        }
        console.log('15', this.hora15);
      });
    
      this.hora16 ={
        id: '',
        paciente: '',
        tipo: '',
        fecha: '',
        fechasub: '',
        pago: '',
        hora: '',
        analisis: '',
        date: '',
        textColor: '#800080',
        backgroundColor: '#ffc0cb',
      };
      const path16 = 'citas/' + fecha + '/horas/';
      console.log('path16', path16);
      const id16 = '16:00';
      this.firestoreService.getDoc<Cita>(path16, id16).subscribe(res => {
        if (res !== undefined) {
          this.hora16 = res;
          this.h16 = false;
        }
        console.log('16', this.hora16);
      });
      
      this.hora17 ={
        id: '',
        paciente: '',
        tipo: '',
        fecha: '',
        fechasub: '',
        pago: '',
        hora: '',
        analisis: '',
        date: '',
        textColor: '#800080',
        backgroundColor: '#ffc0cb',
      };
      const path17 = 'citas/' + fecha + '/horas/';
      console.log('path17', path17);
      const id17 = '17:00';
      this.firestoreService.getDoc<Cita>(path17, id17).subscribe(res => {
        if (res !== undefined) {
          this.hora17 = res;
          this.h17 = false;
        }
        console.log('17', this.hora17);
      });
    
      this.hora18 ={
        id: '',
        paciente: '',
        tipo: '',
        fecha: '',
        fechasub: '',
        pago: '',
        hora: '',
        analisis: '',
        date: '',
        textColor: '#800080',
        backgroundColor: '#ffc0cb',
      };
      const path18 = 'citas/' + fecha + '/horas/';
      console.log('path18', path18);
      const id18 = '18:00';
      this.firestoreService.getDoc<Cita>(path18, id18).subscribe(res => {
        if (res !== undefined) {
          this.hora18 = res;
          this.h18 = false;
        }
        console.log('18', this.hora18);
      });
    }
  
    // obtengo las fechas para pintarlas en el calendario
    getprueba(){
      const pathfechas = 'horas';
      this.firestoreService.getCollectionAll<any>(pathfechas).subscribe( res =>  {
        if (res.length) {
          console.log('getPedidosNuevos() -> res ', res);
          this.highlightedDates2 = res;
    }
      });
    
     }
  
     async presentToast(msg: string, color: any, icono: any) {
      const toast = await this.toastController.create({
        message: msg,
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
