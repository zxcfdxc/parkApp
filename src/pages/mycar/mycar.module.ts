import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'; import { DirectivesModule } from '../../directives/directives.module';
import { MycarPage } from './mycar';

@NgModule({
  declarations: [
    MycarPage,
  ],
  imports: [
    DirectivesModule,IonicPageModule.forChild(MycarPage),
  ],
})
export class MycarPageModule {}
