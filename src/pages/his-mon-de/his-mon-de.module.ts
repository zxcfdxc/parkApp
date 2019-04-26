import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'; import { DirectivesModule } from '../../directives/directives.module';
import { HisMonDePage } from './his-mon-de';

@NgModule({
  declarations: [
    HisMonDePage,
  ],
  imports: [
    DirectivesModule,IonicPageModule.forChild(HisMonDePage),
  ],
})
export class HisMonDePageModule {}
