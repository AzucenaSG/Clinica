import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CitaRegistradaPageRoutingModule } from './cita-registrada-routing.module';

import { CitaRegistradaPage } from './cita-registrada.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CitaRegistradaPageRoutingModule
  ],
  declarations: [CitaRegistradaPage]
})
export class CitaRegistradaPageModule {}
