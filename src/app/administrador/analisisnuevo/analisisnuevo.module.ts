import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnalisisnuevoPageRoutingModule } from './analisisnuevo-routing.module';

import { AnalisisnuevoPage } from './analisisnuevo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnalisisnuevoPageRoutingModule
  ],
  declarations: [AnalisisnuevoPage]
})
export class AnalisisnuevoPageModule {}
