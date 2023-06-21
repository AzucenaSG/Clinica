import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { TipoPersonaComponent } from './tipo-persona/tipo-persona.component';
import { PersonaExtComponent } from './persona-ext/persona-ext.component';



@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RegistroComponent,
    TipoPersonaComponent,
    PersonaExtComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
  ]
})
export class PagesModule { }
