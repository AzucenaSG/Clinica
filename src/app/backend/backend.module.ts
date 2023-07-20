import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ConfigComponent } from './config/config.component';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';



@NgModule({
  declarations: [
    ConfigComponent,
    MenuAdminComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
  ]
})
export class BackendModule { }
