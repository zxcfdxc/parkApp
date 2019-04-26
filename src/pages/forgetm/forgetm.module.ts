import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'; import { DirectivesModule } from '../../directives/directives.module';
import { ForgetmPage } from './forgetm';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ForgetmPage,
  ],
  imports: [
    ComponentsModule,
    DirectivesModule,IonicPageModule.forChild(ForgetmPage),
  ],
})
export class ForgetmPageModule {}
