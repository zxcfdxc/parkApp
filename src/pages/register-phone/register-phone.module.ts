import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'; import { DirectivesModule } from '../../directives/directives.module';
import { RegisterPhonePage } from './register-phone';

@NgModule({
  declarations: [
    RegisterPhonePage,
  ],
  imports: [
    DirectivesModule,IonicPageModule.forChild(RegisterPhonePage),
  ],
})
export class RegisterPhonePageModule {
  
}
