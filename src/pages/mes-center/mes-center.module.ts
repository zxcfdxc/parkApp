import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'; import { DirectivesModule } from '../../directives/directives.module';
import { MesCenterPage } from './mes-center';

@NgModule({
  declarations: [
    MesCenterPage,
  ],
  imports: [
    DirectivesModule,IonicPageModule.forChild(MesCenterPage),
  ],
})
export class MesCenterPageModule {}
