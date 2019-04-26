import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'; import { DirectivesModule } from '../../directives/directives.module';
import { HistoryPage } from './history';

@NgModule({
  declarations: [
    HistoryPage,
  ],
  imports: [
    DirectivesModule,IonicPageModule.forChild(HistoryPage),
  ],
})
export class MyPageModule {}
