import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'; import { DirectivesModule } from '../../directives/directives.module';
import { CouponChosePage } from './coupon-chose';

@NgModule({
  declarations: [
    CouponChosePage,
  ],
  imports: [
    DirectivesModule,IonicPageModule.forChild(CouponChosePage),
  ],
})
export class CouponChosePageModule {}
