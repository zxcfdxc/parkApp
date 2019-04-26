import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'; import { DirectivesModule } from '../../directives/directives.module';
import { NearByPage } from './near-by';

@NgModule({
  declarations: [
    NearByPage,
  ],
  imports: [
    DirectivesModule,IonicPageModule.forChild(NearByPage),
  ],
})
export class NearByPageModule {}
