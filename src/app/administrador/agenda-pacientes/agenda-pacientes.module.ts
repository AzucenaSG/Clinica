import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgendaPacientesPageRoutingModule } from './agenda-pacientes-routing.module';

import { AgendaPacientesPage } from './agenda-pacientes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgendaPacientesPageRoutingModule
  ],
  declarations: [AgendaPacientesPage]
})
export class AgendaPacientesPageModule {}
