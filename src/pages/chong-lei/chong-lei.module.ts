import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'; import { DirectivesModule } from '../../directives/directives.module';
import { ChongLeiPage } from './chong-lei';

@NgModule({
  declarations: [
    ChongLeiPage,
  ],
  imports: [
    DirectivesModule,IonicPageModule.forChild(ChongLeiPage),
  ],
})
export class ChongLeiPageModule {}
