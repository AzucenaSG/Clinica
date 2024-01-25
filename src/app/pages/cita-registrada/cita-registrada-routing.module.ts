import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CitaRegistradaPage } from './cita-registrada.page';

const routes: Routes = [
  {
    path: '',
    component: CitaRegistradaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitaRegistradaPageRoutingModule {}
