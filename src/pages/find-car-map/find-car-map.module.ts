import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'; import { DirectivesModule } from '../../directives/directives.module';
import { FindCarMapPage } from './find-car-map';

@NgModule({
  declarations: [
    FindCarMapPage,
  ],
  imports: [
    DirectivesModule,IonicPageModule.forChild(FindCarMapPage),
  ],
})
export class FindCarMapPageModule {}
