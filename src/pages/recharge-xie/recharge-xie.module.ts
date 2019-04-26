import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'; import { DirectivesModule } from '../../directives/directives.module';
import { RechargeXiePage } from './recharge-xie';

@NgModule({
  declarations: [
    RechargeXiePage,
  ],
  imports: [
    DirectivesModule,IonicPageModule.forChild(RechargeXiePage),
  ],
})
export class RechargeXiePageModule {}
