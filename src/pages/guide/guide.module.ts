import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'; import { DirectivesModule } from '../../directives/directives.module';
import { GuidePage } from './guide';

@NgModule({
  declarations: [
    GuidePage,
  ],
  imports: [
    DirectivesModule,IonicPageModule.forChild(GuidePage),
  ],
})
export class GuidePageModule {}
