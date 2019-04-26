import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'; import { DirectivesModule } from '../../directives/directives.module';
import { RegisterPwPage } from './register-pw';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    RegisterPwPage,
  ],
  imports: [
    ComponentsModule,
    DirectivesModule,IonicPageModule.forChild(RegisterPwPage),
  ],
})
export class RegisterPwPageModule {}
