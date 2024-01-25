import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgendaAdminPageRoutingModule } from './agenda-admin-routing.module';

import { AgendaAdminPage } from './agenda-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgendaAdminPageRoutingModule
  ],
  declarations: [AgendaAdminPage]
})
export class AgendaAdminPageModule {}
