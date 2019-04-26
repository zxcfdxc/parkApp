import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'; import { DirectivesModule } from '../../directives/directives.module';
import { AllParkPage } from './all-park';

@NgModule({
  declarations: [
    AllParkPage,
  ],
  imports: [
    DirectivesModule,IonicPageModule.forChild(AllParkPage),
  ],
})
export class AllParkPageModule {}
