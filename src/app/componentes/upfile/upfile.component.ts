import { Component, Input, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { error } from 'console';
import { Cita } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { StoragefilesService } from 'src/app/services/storagefiles.service';

@Component({
  selector: 'app-upfile',
  templateUrl: './upfile.component.html',
  styleUrls: ['./upfile.component.scss'],
})
export class UpfileComponent  implements OnInit {
@Input() cita!: Cita;
datos =  false;
count = 1;
newFileProductos!: string;
nombre!: string;
archivo = false;
  constructor(public storagefilesService: StoragefilesService,
    public firestoreService: FirestoreService,
    public toastController: ToastController) { }

  ngOnInit() {}

  verDatos(){
    this.count++
    if(this.count<=2){
      this.datos = true;  
    }else{
      this.datos=false;
      this.count = 1;
    }
}

async subirArcivo(){
  const res = await this.storagefilesService.uploadFile(this.newFileProductos, 'archivos', this.cita.id);
  console.log(res);

  const pathCitaAdmin = 'CitasAdmin/';
  const userUpdate1 = {
    file: res,
};  
this.firestoreService.updateDoc(userUpdate1, pathCitaAdmin, this.cita.id);
  
  const path = 'Clientes/' + this.cita.iduser + '/micita';
          const userUpdate = {
            file: res,
  };  
  this.firestoreService.updateDoc(userUpdate, path, this.cita.id).then( () => {
    console.log('guardado con exito');
    this.presentToast('guardado con exito','success','checkmark-outline');
    }).catch (error => {
      console.error (error);
      this.presentToast('error al guardar','danger','close-outline');
    });
}

async newImageUploadProductos(event: any) {
  console.log('foto', event);
  if (event.target.files && event.target.files[0]) {
    this.newFileProductos = event.target.files[0];
   const reader = new FileReader();
   reader.onload = ((image: any) => {
       this.nombre = image.target.result as string;
       if(this.nombre){
        this.archivo = true;
      }
       console.log(this.nombre);
   });
   reader.readAsDataURL(event.target.files[0]);
 }
}

async presentToast(txto: any, color: any, icono: any) {
  const toast = await this.toastController.create({
    message: txto,
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