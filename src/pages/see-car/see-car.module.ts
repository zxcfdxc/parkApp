import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'; import { DirectivesModule } from '../../directives/directives.module';
import { SeeCarPage } from './see-car';

@NgModule({
  declarations: [
    SeeCarPage,
  ],
  imports: [
    DirectivesModule,IonicPageModule.forChild(SeeCarPage),
  ],
})
export class SeeCarPageModule {}
