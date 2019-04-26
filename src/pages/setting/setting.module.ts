import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'; import { DirectivesModule } from '../../directives/directives.module';
import { SettingPage } from './setting';

@NgModule({
  declarations: [
    SettingPage,
  ],
  imports: [
    DirectivesModule,IonicPageModule.forChild(SettingPage),
  ],
})
export class SettingPageModule {}
