import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'; import { DirectivesModule } from '../../directives/directives.module';
import { CouponPage } from './coupon';

@NgModule({
  declarations: [
    CouponPage,
  ],
  imports: [
    DirectivesModule,IonicPageModule.forChild(CouponPage),
  ],
})
export class CouponPageModule {}
