import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Cita } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { StoragefilesService } from '../../services/storagefiles.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss'],
})
export class ResultadosComponent  implements OnInit {
  id!: any;
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
  constructor(private route: ActivatedRoute,
    public firestoreService: FirestoreService,
    private navCtrl: NavController,
    private storagefilesService: StoragefilesService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.getAll('id').toString();
    console.log('id',this.id);
    this.getCita();
  }

  getCita() {
    // console.log('getUserInfo');
    const path = 'CitasAdmin/';
    this.firestoreService.getDoc<Cita>(path, this.id).subscribe( res => {
           if (res !== undefined) {
             this.cita = res;
             console.log('cita',this.cita);
           }
    });
  }

  back(){
    this.navCtrl.pop();
  }

  descargar(){
     // URL del archivo PDF que deseas descargar
     var pdfUrl = this.cita.file;    
     // Crea un elemento 'a' para simular un clic en un enlace y descargar el archivo
     var link = document.createElement('a');
     link.href = pdfUrl;
     link.download = this.cita.paciente; // Nombre con el que se descargará el archivo (opcional)
     // Dispara el clic simulado en el enlace
     link.click();
  }
  
  descarga(){
    const filePath = this.cita.file; // Reemplaza esto con la ruta de tu archivo en Cloud Storage
    this.storagefilesService.downloadFile(filePath);
  }

    
  descarga2(){
    const filePath =  this.cita.file; // Reemplaza esto con la ruta de tu archivo en Cloud Storage
    this.storagefilesService.downloadFile2(filePath);
  }
    
  descarga3(){
    const filePath =  this.cita.file; // Reemplaza esto con la ruta de tu archivo en Cloud Storage
    this.storagefilesService.downloadFile3(filePath);
  }

}
