import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'; import { DirectivesModule } from '../../directives/directives.module';
import { ChoseCarportPage } from './chose-carport';

@NgModule({
  declarations: [
    ChoseCarportPage,
  ],
  imports: [
    DirectivesModule,IonicPageModule.forChild(ChoseCarportPage),
  ],
})
export class ChoseCarportPageModule {}
