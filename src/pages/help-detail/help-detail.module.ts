import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'; import { DirectivesModule } from '../../directives/directives.module';
import { HelpDetailPage } from './help-detail';

@NgModule({
  declarations: [
    HelpDetailPage,
  ],
  imports: [
    DirectivesModule,IonicPageModule.forChild(HelpDetailPage),
  ],
})
export class HelpDetailPageModule {}
