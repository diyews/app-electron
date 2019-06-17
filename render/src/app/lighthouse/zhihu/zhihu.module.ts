import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZhihuRoutingModule } from './zhihu-routing.module';
import { ZhihuComponent } from './zhihu.component';
import { ZhihuService } from './zhihu.service';
import { SharedModule } from '../../shared/shared.module';
import { AnswerComponent } from './answer/answer.component';
import { AnswerItemComponent } from './answer-item/answer-item.component';

@NgModule({
  declarations: [ZhihuComponent, AnswerComponent, AnswerItemComponent],
  imports: [
    CommonModule,

    SharedModule,

    ZhihuRoutingModule
  ],
  providers: [ZhihuService],
})
export class ZhihuModule {
}
