import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'; import { DirectivesModule } from '../../directives/directives.module';
import { ClubCardPage } from './club-card';

@NgModule({
  declarations: [
    ClubCardPage,
  ],
  imports: [
    DirectivesModule,IonicPageModule.forChild(ClubCardPage),
  ],
})
export class ClubCardPageModule {}
