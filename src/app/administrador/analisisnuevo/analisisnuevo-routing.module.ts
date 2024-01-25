import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnalisisnuevoPage } from './analisisnuevo.page';

const routes: Routes = [
  {
    path: '',
    component: AnalisisnuevoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalisisnuevoPageRoutingModule {}
