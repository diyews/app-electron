import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZhihuService } from '../zhihu.service';
import { Answer } from '../models/AnswerResponse.model';

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
  viewedSet = new Set<number>();

  constructor(private activatedRouter: ActivatedRoute,
              private zhihuService: ZhihuService,
              ) { }

  ngOnInit() {
    const params = this.activatedRouter.snapshot.params;
    this.qId = +params.questionId;
    this.aId = +params.answerId;

    // First load local data, then request server
    this.zhihuService.fetchViewedAnswerByQuestionId(this.qId)
      .then(data => {
        data.docs.forEach(o => {
          this.viewedSet.add(+o._id);
        });
        this.fetch();
      });
  }

  fetch() {
    if (this.listLoading) {
      return;
    }
    this.listLoading = true;
    this.zhihuService.fetchAnswer({ questionId: this.qId })
      .then(data => {
        const list = data.data.filter(answer => !this.viewedSet.has(answer.id));
        this.list = this.list.concat(list);
        if (this.list.length < 6) {
          setTimeout(() => this.fetch());
        }
      })
      .finally(() => {
        this.listLoading = false;
      });
  }
}
