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
import { TipoAnalisisComponent } from './tipo-analisis/tipo-analisis.component';
import { ProductAnalisComponent } from './product-analis/product-analis.component';
import { RecomendacionesComponent } from './recomendaciones/recomendaciones.component';
import { PagoComponent } from './pago/pago.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AgendaComponent } from './agenda/agenda.component';



@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RegistroComponent,
    TipoPersonaComponent,
    PersonaExtComponent,
    TipoAnalisisComponent,
    ProductAnalisComponent,
    RecomendacionesComponent,
    PagoComponent,
    ResultadosComponent,
    PerfilComponent,
    CheckoutComponent,
    AgendaComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
  ]
})
export class PagesModule { }
