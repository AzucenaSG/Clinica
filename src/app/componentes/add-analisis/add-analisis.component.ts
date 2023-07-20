import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Analisis, Recomendacion } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-add-analisis',
  templateUrl: './add-analisis.component.html',
  styleUrls: ['./add-analisis.component.scss'],
})
export class AddAnalisisComponent  implements OnInit {
  newAnalisis!: Analisis;
  pathAnalisis= '';

  loading: any;
  path: any;
  id: any;

  recomendaciones = false;
  recomendacion!: Recomendacion;
  listRecomendaciones: Recomendacion[] = [];
  constructor(public modalController: ModalController,
    public firestoreService: FirestoreService,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public toastController: ToastController) { }

  ngOnInit() {
    console.log('path', this.path);
    console.log('id', this.id);
    // this.nuevoCategoria();

    if(this.id === ''){
      this.nuevoAnalisis();
      this.nuevoRecomendacion();
    }else{
      this.newAnalisis = {
        id: this.id.id,
        nombre:this.id.nombre,
        precio: this.id.precio,
      }
      this.nuevoRecomendacion();
      this.recomendaciones = true;
      this.id = this.newAnalisis.id;
      console.log('newCategoria con id', this.newAnalisis);
      this.getRecomendaciones();
    }
    this.pathAnalisis = 'categorias/' + this.path + '/analisis/';
    console.log('path',  this.pathAnalisis)
  }

  nuevoAnalisis(){
    this.newAnalisis = {
      id: this.firestoreService.getId(),
      nombre: '',
      precio: 0,
    }
    console.log(this.newAnalisis);
  }

  async guardarAnalisis() {
    const name = this.newAnalisis.nombre;
    if(name.length){
      this.presentLoading();
      console.log('interface', this.newAnalisis);
      this.firestoreService.createDoc(this.newAnalisis,this.pathAnalisis,this.newAnalisis.id).then( res => {
        console.log('guardado con exito');
        this.recomendaciones = true;
        this.id = this.newAnalisis.id;
        this.getRecomendaciones();
        this.presentToast('guardado con exito','success','checkmark-outline');
        this.loading.dismiss();
      }).catch(   error => {
        console.log(error);
        this.presentToast('error al guardar','danger','close-outline');
        this.loading.dismiss();
      });
    }else{
      console.log('agrega dato');
    }
  }

  nuevoRecomendacion(){
    this.recomendacion = {
      id: this.firestoreService.getId(),
      descripcion: ''
    }
    console.log(this.recomendacion);
  }

  async guardarRecomendacion() {
    const name = this.recomendacion.descripcion;
    const pathRecomendacion = 'categorias/' + this.path + '/analisis/' + this.id + '/recomendaciones';
    if(name.length){
      this.presentLoading();
      console.log('interface', this.recomendacion);
      this.firestoreService.createDoc(this.recomendacion,pathRecomendacion,this.recomendacion.id).then( res => {
        console.log('guardado con exito');
        this.presentToast('guardado con exito','success','checkmark-outline');
        this.nuevoRecomendacion();
        this.loading.dismiss();
      }).catch(   error => {
        console.log(error);
        this.presentToast('error al guardar','danger','close-outline');
        this.loading.dismiss();
      });
    }else{
      console.log('agrega dato');
    }
  }

  getRecomendaciones(){
    const pathRecomendacion = 'categorias/' + this.path + '/analisis/' + this.id + '/recomendaciones';
    this.firestoreService.getCollection<Recomendacion>(pathRecomendacion).subscribe(   res => {
      this.listRecomendaciones = res;
      console.log('recomendaciones', res);
    });
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
