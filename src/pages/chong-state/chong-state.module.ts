import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'; import { DirectivesModule } from '../../directives/directives.module';
import { ChongStatePage } from './chong-state';

@NgModule({
  declarations: [
    ChongStatePage,
  ],
  imports: [
    DirectivesModule,IonicPageModule.forChild(ChongStatePage),
  ],
})
export class ChongStatePageModule {}
