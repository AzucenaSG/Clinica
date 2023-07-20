import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Categoria } from 'src/app/models';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-addcate',
  templateUrl: './addcate.component.html',
  styleUrls: ['./addcate.component.scss'],
})
export class AddcateComponent  implements OnInit {
  newCategoria!: Categoria;
  newImageCategoria= '';
  newFileCategoria= '';
  pathCategoria= 'categorias/';

  loading: any;
  clave: any;
  id: any;
  constructor(public modalController: ModalController,
              public firestoreService: FirestoreService,
              public alertController: AlertController,
              public loadingController: LoadingController,
              public toastController: ToastController,
              public firestorageService: FirestorageService) { }

  ngOnInit() {
    console.log('clave', this.clave);
    console.log('id', this.id);
    // this.nuevoCategoria();

    if(this.id === ''){
      this.nuevoCategoria();
    }else{
      this.newCategoria = {
        id: this.id.id,
        nombre:this.id.nombre,
        foto: this.id.foto,
      }
      console.log('newCategoria con id', this.newCategoria);
    }
  }

  nuevoCategoria(){
    this.newCategoria = {
      id: this.firestoreService.getId(),
      nombre: '',
      foto: '',
    }
    console.log(this.newCategoria);
  }

  async guardarCategoria() {
    const path = 'categoria';
    const name = this.newCategoria.id;
    if(name.length){
      this.presentLoading();
      const res = await this.firestorageService.uploadImage(this.newFileCategoria, path, name);
      this.newCategoria.foto = res;
      console.log('interface', this.newCategoria);
      this.firestoreService.createDoc(this.newCategoria,this.pathCategoria,this.newCategoria.id).then( res => {
        console.log('guardado con exito');
        this.presentToast('guardado con exito','success','checkmark-outline');
        this.nuevoCategoria();
        this.loading.dismiss();
      }).catch(   error => {
        console.log(error);
        this.presentToast('error al guardar','danger','close-outline');
      });
    }else{
      console.log('agrega dato');
    }
  }

  async actualizarCategoria() {
    const name = this.newCategoria.id;
    if(name.length){
      this.presentLoading();
      console.log('interface', this.newCategoria);
      this.firestoreService.createDoc(this.newCategoria,this.pathCategoria,this.newCategoria.id).then( res => {
        console.log('guardado con exito');
        this.presentToast('guardado con exito','success','checkmark-outline');
        this.nuevoCategoria();
        this.loading.dismiss();
      }).catch(   error => {
        console.log(error);
        this.presentToast('error al guardar','danger','close-outline');
      });
    }else{
      console.log('agrega dato');
    }
  }

  async newImageUploadCategoria(event: any) {
    console.log('foto1');
    if (event.target.files && event.target.files[0]) {
      this.newFileCategoria = event.target.files[0];
     const reader = new FileReader();
     reader.onload = ((image: any) => {
         this.newCategoria.foto = image.target.result as string;
     });
     reader.readAsDataURL(event.target.files[0]);
   }
  }

  closeModal(){
    this.modalController.dismiss();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'normal',
      message: 'guardando...',
    });
    await this.loading.present();
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
