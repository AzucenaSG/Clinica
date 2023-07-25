import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Cita } from 'src/app/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
const QRCode = require('qrcode');

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
    iduser: '',
    file: '',
    edad: 0
  };

  url: any
  sanitizedSvg!: SafeHtml;
  text1= 'xhgcfh';
  constructor(private route: ActivatedRoute,
    public firebaseauthService: FirebaseauthService,
    public firestoreService: FirestoreService,
    private sanitizer: DomSanitizer) { }

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
    this.creraqr();
  }

  creraqr(){
    this.text1 = this.id;
    QRCode.toString(this.text1, {
      errorCorrectionLevel: 'H',
      type: 'svg'
    }, (err : any, data: any) => {
      if (err) throw err;
      console.log(data);
      this.url = data;
      this.sanitizedSvg = this.sanitizer.bypassSecurityTrustHtml(this.url);
    });
  }

}
