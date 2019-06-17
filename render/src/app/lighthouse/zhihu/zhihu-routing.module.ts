import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ZhihuComponent } from './zhihu.component';
import { AnswerComponent } from './answer/answer.component';

const routes: Routes = [
  {
    path: 'zhihu',
    children: [
      {
        path: '',
        component: ZhihuComponent,
      },
      {
        path: 'answer/:questionId',
        component: AnswerComponent,
      },
      {
        path: 'answer/:questionId/:answerId',
        component: AnswerComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZhihuRoutingModule { }
