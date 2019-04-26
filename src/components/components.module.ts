import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YanzhengComponent } from './yanzheng/yanzheng';
import { PMessComponent } from './p-mess/p-mess';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
@NgModule({
	declarations: [
    YanzhengComponent,
    PMessComponent,
   ],
	imports: [FormsModule,ReactiveFormsModule,CommonModule],
	exports: [
    YanzhengComponent,
    PMessComponent,
   ]
})
export class ComponentsModule {}
