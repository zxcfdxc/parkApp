import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'; import { DirectivesModule } from '../../directives/directives.module';
import { MyAccountPage } from './my-account';

@NgModule({
  declarations: [
    MyAccountPage,
  ],
  imports: [
    DirectivesModule,IonicPageModule.forChild(MyAccountPage),
  ],
})
export class MyAccountPageModule {}
