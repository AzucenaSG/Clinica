import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cita } from 'src/app/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-list-citas',
  templateUrl: './list-citas.component.html',
  styleUrls: ['./list-citas.component.scss'],
})
export class ListCitasComponent  implements OnInit {
  uid = '';
  analisis: Cita[] = [];
  constructor(public firestoreService: FirestoreService,
    public firebaseauthService: FirebaseauthService,
    private router: Router) {
  }

  ngOnInit() {
    this.firebaseauthService.stateAuth().subscribe( (res:any) => {
      this.uid = res.uid;
      this.getAnalisis(this.uid);
   });
  }

  getAnalisis(id: string){
    const path = 'Clientes/' + id + '/micita/'
    this.firestoreService.getCollection<Cita>(path).subscribe(   res => {
      this.analisis = res;
      console.log('analisis', res);
    });
  }

  irInfoAnali(id: string){
    console.log(id);
    this.router.navigate(['pago',{ id: [`${id}`]}]);
  }

}
