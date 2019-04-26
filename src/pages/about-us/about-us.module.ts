import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'; import { DirectivesModule } from '../../directives/directives.module';
import { AboutUsPage } from './about-us';

@NgModule({
  declarations: [
    AboutUsPage,
  ],
  imports: [
    DirectivesModule,IonicPageModule.forChild(AboutUsPage),
  ],
})
export class AboutUsPageModule {}
