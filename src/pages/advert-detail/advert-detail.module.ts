import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'; import { DirectivesModule } from '../../directives/directives.module';
import { AdvertDetailPage } from './advert-detail';

@NgModule({
  declarations: [
    AdvertDetailPage,
  ],
  imports: [
    DirectivesModule,IonicPageModule.forChild(AdvertDetailPage),
  ],
})
export class AdvertDetailPageModule {}
