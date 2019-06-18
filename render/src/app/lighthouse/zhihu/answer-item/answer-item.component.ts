import { Component, ElementRef, Input, NgZone, OnInit } from '@angular/core';
import { Answer } from '../models/AnswerResponse.model';
import { RecommendAnswer } from '../models/RecommendResponse.model';
import { ZhihuService } from '../zhihu.service';
import { PouchDBPutResult } from '@app/declarations/pouchdb';

@Component({
  selector: 'app-answer-item',
  templateUrl: './answer-item.component.html',
  styleUrls: ['./answer-item.component.scss']
})
export class AnswerItemComponent implements OnInit {
  @Input() item: Answer | RecommendAnswer;
  @Input() scrollElement: HTMLElement;
  isQA: boolean;
  docPutResult: PouchDBPutResult;
  
  constructor(private el: ElementRef,
              private ngZone: NgZone,
              private zhihuService: ZhihuService,
              ) { }

  ngOnInit() {
    this.isQA = this.item.__more = !(this.item as RecommendAnswer).excerpt_new;
    this.item.content = this.item.content.replace(/(<\/noscript>)<img .*?\/>/g, '$1');

    if (this.isQA && this.scrollElement) {
      this.registerScroll();
    }
  }

  registerScroll() {
    const onScroll = (e: Event) => {
      const scrollElement = (e.target as HTMLElement);
      const el = (this.el.nativeElement as HTMLElement);
      const rect = el.getBoundingClientRect();
      const scrollRect = scrollElement.getBoundingClientRect();
      if (rect.top < scrollRect.height) {
        this.scrollElement.removeEventListener('scroll', onScroll);
        this.zhihuService.putViewedAnswer({ _id: this.item.id + '', questionId: this.item.question.id, updateTime: this.item.updated_time })
          .then(data => {
            console.log(data);
            this.ngZone.run(() => {
              this.docPutResult = data;
            });
          });
      }
    };

    this.ngZone.runOutsideAngular(() => {
      this.scrollElement.addEventListener('scroll', onScroll);
    });
  }

  collapse() {
    const item = this.item;
    item.__more = !item.__more;
    this.scrollElement.scrollTo({
      top: this.scrollElement.scrollTop + (this.el.nativeElement as HTMLElement).getBoundingClientRect().top,
      behavior: 'smooth',
    });
  }

  unread() {
    this.zhihuService.removeViewedAnswer(this.docPutResult)
      .then(data => {
        console.log(data);
      });
  }
}
