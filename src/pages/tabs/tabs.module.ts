import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'; import { DirectivesModule } from '../../directives/directives.module';
import { TabsPage } from './tabs';

@NgModule({
  declarations: [
    TabsPage,
  ],
  imports: [
    DirectivesModule,IonicPageModule.forChild(TabsPage),
  ],
})
export class RegisterPwPageModule {}
