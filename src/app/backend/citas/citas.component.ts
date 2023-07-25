import { Component, OnInit } from '@angular/core';
import { StoragefilesService } from '../../services/storagefiles.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Cita } from 'src/app/models';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss'],
})
export class CitasComponent  implements OnInit {
  newFileProductos!: string;
  nombre = '';
  citas: Cita[]=[];
  constructor(public storagefilesService: StoragefilesService,
    public firestoreService: FirestoreService) { }

  ngOnInit() {
    this.getCitas();
  }

  getCitas(){
    const path = 'CitasAdmin/';
    this.firestoreService.getCollection<Cita>(path).subscribe(   res => {
      this.citas = res;
      console.log('citas', res);
    });
  }

  async subirArcivo(){
    const res = await this.storagefilesService.uploadFile(this.newFileProductos, 'archivos', 'file1');
    console.log(res);
  }

  async newImageUploadProductos(event: any) {
    console.log('foto', event);
    if (event.target.files && event.target.files[0]) {
      this.newFileProductos = event.target.files[0];
     const reader = new FileReader();
     reader.onload = ((image: any) => {
         this.nombre = image.target.result as string;
         console.log(this.nombre);
     });
     reader.readAsDataURL(event.target.files[0]);
   }
  }

}
