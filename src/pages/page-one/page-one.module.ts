import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'; import { DirectivesModule } from '../../directives/directives.module';
import { PageOnePage } from './page-one';

@NgModule({
  declarations: [
    PageOnePage,
  ],
  imports: [
    DirectivesModule,IonicPageModule.forChild(PageOnePage),
  ],
})
export class PageOnePageModule {}
