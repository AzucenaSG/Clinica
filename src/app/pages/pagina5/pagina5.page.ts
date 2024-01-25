import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from '../../services/firestore.service';
import { Recomendaciones } from 'src/app/models';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pagina5',
  templateUrl: './pagina5.page.html',
  styleUrls: ['./pagina5.page.scss'],
})
export class Pagina5Page implements OnInit {

  id!: string;

  idanalisis: any;


  recomendaciones: Recomendaciones = {
    id: '',
    recomendacion: ''
  };
  recomendacionres: Recomendaciones[]=[];

  constructor( private router: Router,
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    public navcontroller: NavController) { 

      this.id = this.route.snapshot.paramMap.getAll('id').toString();
      console.log(this.id);

      this.idanalisis = this.route.snapshot.paramMap.getAll('idanalisis').toString();
      console.log(this.idanalisis);
     }


  ngOnInit() {
    this.Verrecomendaciones();
    this.initrecomendaciones();
  }
  initrecomendaciones(){
    this.recomendaciones ={
      id: this.firestoreService.getId (),
      recomendacion: '',
    }
  }
  agendar(){
   this.router.navigateByUrl('/agendar')
  }
  redirigir(){
    this.navcontroller.pop();
  }
  // /categoria/0aYbGeuvJrRhvaXEwhzV/tipoanalisis/SjAXaukpdF13J4ssjQZs/recomendaciones
  Verrecomendaciones(){
    const pathrecomendaciones = 'categoria/'+ this.id + '/tipoanalisis/' + this.idanalisis + '/recomendaciones' ;
    this.firestoreService.getCollection<Recomendaciones>(pathrecomendaciones).subscribe (res =>{
      console.log(res);
      this.recomendacionres = res;
    });
  }

}
