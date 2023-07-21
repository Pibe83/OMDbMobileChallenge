import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DettagliPage } from './dettagli.page';

const routes: Routes = [
  {
    path: '',
    component: DettagliPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DettagliPageRoutingModule {}
