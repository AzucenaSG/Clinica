import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ConfigComponent } from './config/config.component';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';
import { ComponentesModule } from '../componentes/componentes.module';
import { AnalisisComponent } from './analisis/analisis.component';
import { PerfilAdminComponent } from './perfil-admin/perfil-admin.component';



@NgModule({
  declarations: [
    ConfigComponent,
    MenuAdminComponent,
    AnalisisComponent,
    PerfilAdminComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
    ComponentesModule
  ]
})
export class BackendModule { }
