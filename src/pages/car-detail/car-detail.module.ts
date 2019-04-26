import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'; import { DirectivesModule } from '../../directives/directives.module';
import { CarDetailPage } from './car-detail';

@NgModule({
  declarations: [
    CarDetailPage,
  ],
  imports: [
    DirectivesModule,IonicPageModule.forChild(CarDetailPage),
  ],
})
export class CarDetailPageModule {}
