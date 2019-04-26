import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'; import { DirectivesModule } from '../../directives/directives.module';
import { BrowserPopoverPage } from './browser-popover';

@NgModule({
  declarations: [
    BrowserPopoverPage,
  ],
  imports: [
    DirectivesModule,IonicPageModule.forChild(BrowserPopoverPage),
  ],
})
export class BrowserPopoverPageModule {}
