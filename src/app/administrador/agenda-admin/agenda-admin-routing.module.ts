import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendaAdminPage } from './agenda-admin.page';

const routes: Routes = [
  {
    path: '',
    component: AgendaAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgendaAdminPageRoutingModule {}
