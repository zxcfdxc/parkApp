import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'; import { DirectivesModule } from '../../directives/directives.module';
import { AddCarPage } from './add-car';

@NgModule({
  declarations: [
    AddCarPage,
  ],
  imports: [
    DirectivesModule,IonicPageModule.forChild(AddCarPage),
  ],
})
export class AddCarPageModule {}
