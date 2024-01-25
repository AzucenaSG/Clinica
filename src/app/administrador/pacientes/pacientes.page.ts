import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agendado } from 'src/app/models';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { StoragefilesService } from 'src/app/services/storagefiles.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.page.html',
  styleUrls: ['./pacientes.page.scss'],
})
export class PacientesPage implements OnInit {

  citas: Agendado[]=[];
  selectedItemIndex: number|null = null; 
  contenidoVisible= false;

  newFile!: string;
  nombre!: string;
  nombrearchivo= '';
  archivo= false;

  constructor( private router: Router,
    private firestoreservices: FirestoreService,
    private storagefiles: StoragefilesService) { }

  ngOnInit() {
    this.getcitas();
  }
  redirigir(){
    this.router.navigateByUrl('/agenda-admin')
  }
  getcitas(){
    const pathcoleccion = 'citaregistrada';
    this.firestoreservices.getCollectionAll<Agendado>(pathcoleccion).subscribe( res=>{
      console.log(res);
      this.citas = res;
    });
  }
  toggleContenido(index: number, cita: Agendado){
    if(this.selectedItemIndex === index){
      this.contenidoVisible = !this.contenidoVisible;
      console.log('if');
    }
    else{
      this.contenidoVisible = true;
      this.selectedItemIndex = index;
      console.log('else');

    }
    console.log('toggleContenido');
  }
  newFileCita(event: any){
    console.log('file', event);
    console.log('nombre', event.target.files[0].name);
    if (event.target.files && event.target.files[0]) {
      this.newFile = event.target.files[0];
     const reader = new FileReader();
     reader.onload = ((image: any) => {
         this.nombre = image.target.result as string;
         if(this.nombre){
          this.archivo = true;
          this.nombrearchivo = event.target.files[0].name;
        }
         console.log(this.nombre);
     });
     reader.readAsDataURL(event.target.files[0]);
   }
  }
  async subirArcivo(idcita: string, idusuario: string){
    if(this.archivo){
      const res = await this.storagefiles.uploadFile(this.newFile, 'archivos', idcita);
      console.log(res);
      const updatefile = {
        File: res,
      }
      const pathcitaadmin = 'citasadmin/';
      this.firestoreservices.updateDoc(updatefile, pathcitaadmin, idcita);
      const pathcitausuario = 'cuenta/'+ idusuario + '/citaregistrada' ;
      this.firestoreservices.updateDoc(updatefile, pathcitausuario, idcita);
    }else{
      console.log('no se cargo el archivo')
      // this.toastService.presentToast('aun no has cargado un archivo','danger','close-outline');
    }
  }

}
