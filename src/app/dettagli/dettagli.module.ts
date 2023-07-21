import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DettagliPageRoutingModule } from './dettagli-routing.module';

import { DettagliPage } from './dettagli.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DettagliPageRoutingModule
  ],
  declarations: [DettagliPage]
})
export class DettagliPageModule {}
