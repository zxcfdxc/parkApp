import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'; import { DirectivesModule } from '../../directives/directives.module';
import { ParkDetailPage } from './park-detail';

@NgModule({
  declarations: [
    ParkDetailPage,
  ],
  imports: [
    DirectivesModule,IonicPageModule.forChild(ParkDetailPage),
  ],
})
export class ParkDetailPageModule {}
