import { Component, ElementRef, Input, NgZone, OnInit } from '@angular/core';
import { Answer } from '../models/AnswerResponse.model';
import { RecommendAnswer } from '../models/RecommendResponse.model';

@Component({
  selector: 'app-answer-item',
  templateUrl: './answer-item.component.html',
  styleUrls: ['./answer-item.component.scss']
})
export class AnswerItemComponent implements OnInit {
  @Input() item: Answer | RecommendAnswer;
  @Input() scrollElement: HTMLElement;
  isQA: boolean;
  
  constructor(private el: ElementRef,
              private ngZone: NgZone,
              ) { }

  ngOnInit() {
    this.isQA = this.item.__more = !(this.item as RecommendAnswer).excerpt_new;

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
      console.log(rect);
      console.log(scrollRect);
      if (rect.top < scrollRect.height) {
        el.style.background = '#0f0';
        el.style.display = 'block';
      }
    };

    this.ngZone.runOutsideAngular(() => {
      this.scrollElement.addEventListener('scroll', onScroll);
    });
  }
}
