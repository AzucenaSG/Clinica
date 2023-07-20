import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Analisis } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-analisis',
  templateUrl: './analisis.component.html',
  styleUrls: ['./analisis.component.scss'],
})
export class AnalisisComponent  implements OnInit {
  id!: any;
  categorias: Analisis[] = [];
  pathAnalisis= '';
  constructor(private route: ActivatedRoute,
    public firestoreService: FirestoreService,
    public modalcontroller: ModalController) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.getAll('id').toString();
    console.log('id',this.id);
    this.pathAnalisis = 'categorias/' + this.id + '/analisis/';
    this.getAnalisis();
  }

  getAnalisis(){
    this.firestoreService.getCollection<Analisis>(this.pathAnalisis).subscribe(   res => {
      this.categorias = res;
      console.log('categorias', res);
    });
  }

  // async openmodal(){
  //   const modal = await this.modalcontroller.create({
  //     component: AddcateComponent,
  //     componentProps:  {id: ''}
  //   });
  //   return await modal.present();
  //  }

  //  async openmodal2(id: any){
  //   const modal = await this.modalcontroller.create({
  //     component: AddcateComponent,
  //     componentProps: {id}
  //   });
  //   return await modal.present();
  //  }

}
