import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ConfigComponent } from './backend/config/config.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { TipoPersonaComponent } from './pages/tipo-persona/tipo-persona.component';
import { PersonaExtComponent } from './pages/persona-ext/persona-ext.component';
import { TipoAnalisisComponent } from './pages/tipo-analisis/tipo-analisis.component';
import { ProductAnalisComponent } from './pages/product-analis/product-analis.component';
import { RecomendacionesComponent } from './pages/recomendaciones/recomendaciones.component';
import { PagoComponent } from './pages/pago/pago.component';
import { ResultadosComponent } from './pages/resultados/resultados.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { MenuAdminComponent } from './backend/menu-admin/menu-admin.component';
import { AnalisisComponent } from './backend/analisis/analisis.component';
import { PerfilAdminComponent } from './backend/perfil-admin/perfil-admin.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'config', component: ConfigComponent},
  { path: 'login', component: LoginComponent},
  { path: 'registro', component: RegistroComponent},
  { path: 'persona', component: TipoPersonaComponent},
  { path: 'personaExterna', component: PersonaExtComponent},
  { path: 'tipoAnalisis', component: TipoAnalisisComponent},
  { path: 'producto', component: ProductAnalisComponent},
  { path: 'recomendaciones', component: RecomendacionesComponent},
  { path: 'pago', component: PagoComponent},
  { path: 'resultados', component: ResultadosComponent},
  { path: 'perfil', component: PerfilComponent},
  { path: 'menuAdmin', component: MenuAdminComponent},
  { path: 'analisis', component: AnalisisComponent},
  { path: 'perfilAdmin', component: PerfilAdminComponent},
  { path: 'checkout', component: CheckoutComponent},
  { path: '', component: LoginComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full'},
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
