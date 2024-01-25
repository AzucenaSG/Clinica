import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: 'home', component: HomeComponent },
  // { path: '', component: LoginComponent },
  // { path: '**', redirectTo: 'login', pathMatch: 'full'},
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'crear-cuenta',
    loadChildren: () => import('./pages/crear-cuenta/crear-cuenta.module').then( m => m.CrearCuentaPageModule)
  },
  {
    path: 'agenda-admin',
    loadChildren: () => import('./administrador/agenda-admin/agenda-admin.module').then( m => m.AgendaAdminPageModule)
  },
  {
    path: 'ajustes',
    loadChildren: () => import('./administrador/ajustes/ajustes.module').then( m => m.AjustesPageModule)
  },
  {
    path: 'analisis',
    loadChildren: () => import('./administrador/analisis/analisis.module').then( m => m.AnalisisPageModule)
  },
  {
    path: 'analisisnuevo',
    loadChildren: () => import('./administrador/analisisnuevo/analisisnuevo.module').then( m => m.AnalisisnuevoPageModule)
  },
  {
    path: 'pagina1',
    loadChildren: () => import('./pages/pagina1/pagina1.module').then( m => m.Pagina1PageModule)
  },
  {
    path: 'pagina2',
    loadChildren: () => import('./pages/pagina2/pagina2.module').then( m => m.Pagina2PageModule)
  },
  {
    path: 'pagina3',
    loadChildren: () => import('./pages/pagina3/pagina3.module').then( m => m.Pagina3PageModule)
  },
  {
    path: 'pagina4',
    loadChildren: () => import('./pages/pagina4/pagina4.module').then( m => m.Pagina4PageModule)
  },
  {
    path: 'pagina5',
    loadChildren: () => import('./pages/pagina5/pagina5.module').then( m => m.Pagina5PageModule)
  },
  {
    path: 'resultados',
    loadChildren: () => import('./pages/resultados/resultados.module').then( m => m.ResultadosPageModule)
  },
  {
    path: 'cita-registrada',
    loadChildren: () => import('./pages/cita-registrada/cita-registrada.module').then( m => m.CitaRegistradaPageModule)
  },
  {
    path: 'agendar',
    loadChildren: () => import('./pages/agendar/agendar.module').then( m => m.AgendarPageModule)
  },
  {
    path: 'pacientes',
    loadChildren: () => import('./administrador/pacientes/pacientes.module').then( m => m.PacientesPageModule)
  },  {
    path: 'agenda-pacientes',
    loadChildren: () => import('./administrador/agenda-pacientes/agenda-pacientes.module').then( m => m.AgendaPacientesPageModule)
  },
  {
    path: 'citas',
    loadChildren: () => import('./administrador/citas/citas.module').then( m => m.CitasPageModule)
  },
  {
    path: 'contrasena',
    loadChildren: () => import('./pages/contrasena/contrasena.module').then( m => m.ContrasenaPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
