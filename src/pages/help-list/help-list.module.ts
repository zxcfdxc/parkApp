import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'; import { DirectivesModule } from '../../directives/directives.module';
import { HelpListPage } from './help-list';

@NgModule({
  declarations: [
    HelpListPage,
  ],
  imports: [
    DirectivesModule,IonicPageModule.forChild(HelpListPage),
  ],
})
export class HelpListPageModule {}
