import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'; import { DirectivesModule } from '../../directives/directives.module';
import { OrderConfigPage } from './order-config';

@NgModule({
  declarations: [
    OrderConfigPage,
  ],
  imports: [
    DirectivesModule,IonicPageModule.forChild(OrderConfigPage),
  ],
})
export class OrderConfigPageModule {}
