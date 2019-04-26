import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'; import { DirectivesModule } from '../../directives/directives.module';
import { CurrentCarPage } from './current-car';

@NgModule({
  declarations: [
    CurrentCarPage,
  ],
  imports: [
    DirectivesModule,IonicPageModule.forChild(CurrentCarPage),
  ],
})
export class CurrentCarPageModule {}
