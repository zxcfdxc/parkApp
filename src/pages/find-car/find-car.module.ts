import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'; import { DirectivesModule } from '../../directives/directives.module';
import { FindCarPage } from './find-car';

@NgModule({
  declarations: [
    FindCarPage,
  ],
  imports: [
    DirectivesModule,IonicPageModule.forChild(FindCarPage),
  ],
})
export class FindCarPageModule {}
