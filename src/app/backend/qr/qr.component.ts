import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
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
  constructor() { }

  ngOnInit() {}

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


}
