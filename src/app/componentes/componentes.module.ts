import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddcateComponent } from './addcate/addcate.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AddcateComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule
  ]
})
export class ComponentesModule { }
