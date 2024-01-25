import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Agendado } from 'src/app/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-agenda-pacientes',
  templateUrl: './agenda-pacientes.page.html',
  styleUrls: ['./agenda-pacientes.page.scss'],
})
export class AgendaPacientesPage implements OnInit {



  constructor(private router: Router,
    private firestoreservice: FirestoreService,
    private firebaseauthservice: FirebaseauthService,
    private activedroute: ActivatedRoute) { 

    }

  ngOnInit() {
  }
  redirigir(){
    this.router.navigateByUrl('/agenda-admin')
  }
 
}
