import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'; import { DirectivesModule } from '../../directives/directives.module';
import { AppointDetailPage } from './appoint-detail';

@NgModule({
  declarations: [
    AppointDetailPage,
  ],
  imports: [
    DirectivesModule,IonicPageModule.forChild(AppointDetailPage),
  ],
})
export class AppointDetailPageModule {}
