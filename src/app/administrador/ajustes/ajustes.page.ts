import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { Categoria } from 'src/app/models';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
})
export class AjustesPage implements OnInit {
  async canDismiss(data?: any, role?: string) {
    return role !== 'gesture';
  }

  id!: string;
  categoria!: Categoria;
  
  categoriares: Categoria[]=[];

  newfilecategoria: any;

  constructor( private router: Router,
    private firestoreservice: FirestoreService,
    private modalcontroller: ModalController,
    private navcontroller: NavController,
    private firestorageservices: FirestorageService ) { }

  ngOnInit() {
    this.initcategoria();
    this.vercategorias();
  }
  initcategoria(){
    this.categoria ={
      id: this.firestoreservice.getId (),
      nombre: '',
      foto: ''
    }
  }
  redirigir(){
    this.navcontroller.pop();
  }
  // analisis(){
  //   this.router.navigateByUrl('/analisis')
  // }
  guardar(){
    const pathcategoria = 'categoria';
    this.firestoreservice.createDoc(this.categoria, pathcategoria, this.categoria.id).then (() =>{
      console.log('se registro el usuario', this.categoria);
      this.initcategoria();
      this.modalcontroller.dismiss();
    });
  }
  async vercategorias(){
    const pathcategoria2 = 'categoria';
    const res = await this.firestorageservices.uploadImage(this.newfilecategoria, pathcategoria2, this.categoria.id);
      this.categoria.foto = res;
    this.firestoreservice.getCollection <Categoria>(pathcategoria2).subscribe (res =>{
        console.log(res);
     this.categoriares = res;   
        
    });
    
  }
  async newImageUploadCategoria(event: any) {
    console.log('foto1');
    if (event.target.files && event.target.files[0]) {
      this.newfilecategoria = event.target.files[0];
     const reader = new FileReader();
     reader.onload = ((image: any) => {
         this.categoria.foto = image.target.result as string;
     });
     reader.readAsDataURL(event.target.files[0]);
   }
  }
  idcategoria(item: any){
    this.router.navigate(['analisis', item])
    console.log(item)
  }
  // /categoria/GtqAbrGFAq5rR5jdaEEL
  eliminar(item: Categoria){
    const pathcategoria = 'categoria';
    this.firestoreservice.deleteDoc(pathcategoria, item.id).then (() =>{
      console.log('se a eliminado', item.id)
    });
  }

}
