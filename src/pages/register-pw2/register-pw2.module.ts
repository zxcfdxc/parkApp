import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'; import { DirectivesModule } from '../../directives/directives.module';
import { RegisterPw2Page } from './register-pw2';

@NgModule({
  declarations: [
    RegisterPw2Page,
  ],
  imports: [
    DirectivesModule,IonicPageModule.forChild(RegisterPw2Page),
  ],
})
export class RegisterPw2PageModule {}
