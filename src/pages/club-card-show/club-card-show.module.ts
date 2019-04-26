import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'; import { DirectivesModule } from '../../directives/directives.module';
import { ClubCardShowPage } from './club-card-show';

@NgModule({
  declarations: [
    ClubCardShowPage,
  ],
  imports: [
    DirectivesModule,IonicPageModule.forChild(ClubCardShowPage),
  ],
})
export class ClubCardShowPageModule {}
