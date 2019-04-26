import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'; import { DirectivesModule } from '../../directives/directives.module';
import { RechargePage } from './recharge';

@NgModule({
  declarations: [
    RechargePage,
  ],
  imports: [
    DirectivesModule,IonicPageModule.forChild(RechargePage),
  ],
})
export class RechargePageModule {}
