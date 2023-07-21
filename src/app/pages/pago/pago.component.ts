import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cita } from 'src/app/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.scss'],
})
export class PagoComponent  implements OnInit {
  id!: any;
  uid = '';
  cita: Cita = {
    id: '',
    paciente: '',
    tipo: '',
    fecha: '',
    fechasub: '',
    pago: '',
    analisis: '',
    hora: '',
    date: '',
    textColor: '',
    backgroundColor: '',
  };
  constructor(private route: ActivatedRoute,
    public firebaseauthService: FirebaseauthService,
    public firestoreService: FirestoreService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.getAll('id').toString();
    console.log('id',this.id);
    this.firebaseauthService.stateAuth().subscribe( (res:any) => {
      this.uid = res.uid;
      this.getCita(this.uid);
   });
  }

  getCita(uid: string) {
    // console.log('getUserInfo');
    const path = 'Clientes/' + uid + '/micita/'
    this.firestoreService.getDoc<Cita>(path, this.id).subscribe( res => {
           if (res !== undefined) {
             this.cita = res;
             console.log('cita',this.cita);
           }
    });
  }

}
