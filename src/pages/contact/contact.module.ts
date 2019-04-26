import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'; import { DirectivesModule } from '../../directives/directives.module';
import { ContactPage } from './contact';

@NgModule({
  declarations: [
    ContactPage,
  ],
  imports: [
    DirectivesModule,IonicPageModule.forChild(ContactPage),
  ],
})
export class ContactPageModule {}
