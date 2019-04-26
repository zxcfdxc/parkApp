import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'; import { DirectivesModule } from '../../directives/directives.module';
import { ChongCheweiPage } from './chong-chewei';

@NgModule({
  declarations: [
    ChongCheweiPage,
  ],
  imports: [
    DirectivesModule,IonicPageModule.forChild(ChongCheweiPage),
  ],
})
export class ChongCheweiPageModule {}
