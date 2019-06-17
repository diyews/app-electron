import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZhihuService } from '../zhihu.service';
import { Answer } from '../models/AnswerResponse.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  qId: number;
  aId: number;
  list: Answer[] = [];
  listLoading = false;

  constructor(private activatedRouter: ActivatedRoute,
              private zhihuService: ZhihuService,
              ) { }

  ngOnInit() {
    const params = this.activatedRouter.snapshot.params;
    this.qId = +params.questionId;
    this.aId = +params.answerId;
    this.fetch();
  }

  fetch() {
    if (this.listLoading) {
      return;
    }
    this.listLoading = true;
    this.zhihuService.fetchAnswer({ questionId: this.qId })
      .pipe(
        finalize(() => this.listLoading = false)
      )
      .subscribe(data => {
        console.log(data);
        this.list = this.list.concat(data.data);
      });
  }
}
