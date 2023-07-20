import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AddcateComponent } from './addcate/addcate.component';
import { AddAnalisisComponent } from './add-analisis/add-analisis.component';



@NgModule({
  declarations: [
    AddcateComponent,
    AddAnalisisComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
  ]
})
export class ComponentesModule { }
