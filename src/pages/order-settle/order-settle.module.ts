import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'; import { DirectivesModule } from '../../directives/directives.module';
import { OrderSettlePage } from './order-settle';

@NgModule({
  declarations: [
    OrderSettlePage,
  ],
  imports: [
    DirectivesModule,IonicPageModule.forChild(OrderSettlePage),
  ],
})
export class OrderSettlePageModule {}
