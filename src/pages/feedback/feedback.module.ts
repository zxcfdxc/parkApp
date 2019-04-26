import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'; import { DirectivesModule } from '../../directives/directives.module';
import { FeedbackPage } from './feedback';

@NgModule({
  declarations: [
    FeedbackPage,
  ],
  imports: [
    DirectivesModule,IonicPageModule.forChild(FeedbackPage),
  ],
})
export class FeedbackPageModule {}
