import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Cita } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';
@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss'],
})
export class QrComponent  implements OnInit {
  qr: any;
  qrtext!: string;
  scanActive: boolean = false;
  vermenu = true;
  verbtnq = false;

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
  datos = false;
  loco = '';
  constructor(public firestoreService: FirestoreService) { }

  ngOnInit() {
    this.startScanner();
  }

  async checkPermission() {
    return new Promise(async (resolve, reject) => {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        resolve(true);
      } else if (status.denied) {
        BarcodeScanner.openAppSettings();
        resolve(false);
      }
    });
}

async startScanner() {
  const allowed = await this.checkPermission();
  if (allowed) {
    this.vermenu = false;
    this.datos = false;
    this.scanActive = true;
    BarcodeScanner.hideBackground();
    const result = await BarcodeScanner.startScan();
    if (result.hasContent) {
      this.scanActive = false;
      this.vermenu = true;
      this.qr = result.content;
      console.log('result.content',result.content);
      this.qrtext = this.qr;
      console.log('qrtex',this.qr);
      this.getprueba2();
    } else {
      alert('NO DATA FOUND!');
    }
  } else {
    alert('NOT ALLOWED!');
  }
}

stopScanner() {
  BarcodeScanner.stopScan();
  this.scanActive = false;
}

ionViewWillLeave() {
  BarcodeScanner.stopScan();
  this.scanActive = false;
}

// getCita() {
//   // console.log('getUserInfo');
//   console.log('id get cita',this.qrtext);
//   const path = 'CitasAdmin/'
//   this.firestoreService.getDoc<Cita>(path,this.qrtext).subscribe( res => {
//          if (res !== undefined) {
//            this.cita = res;
//            console.log('cita',this.cita);
//          }
//   });
// }

getprueba() {
  // console.log('getUserInfo');
  this.datos = true;
  console.log('id get cita',this.qrtext);
  // this.qrtext = 'uPAQMfkzyMtXdxresgfb'
  const path = 'CitasAdmin/'
  this.firestoreService.getDoc<Cita>(path,this.qrtext).subscribe( res => {
         if (res !== undefined) {
           this.cita = res;
           console.log('cita',this.cita);
         }
  });
}

getprueba2() {
  // console.log('getUserInfo');
  this.datos = true;
  console.log('id get loco',this.loco);
  // this.qrtext = 'uPAQMfkzyMtXdxresgfb'
  this.loco = this.qr;
  const path2 = '/CitasAdmin/';
  this.firestoreService.getDoc<Cita>(path2,this.loco).subscribe(   res => {
    console.log('res2',res);
    if (res !== undefined) {
       this.cita = res;
       console.log('cita2',this.cita);
      }
  });
}

}
