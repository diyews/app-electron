import { Directive, ElementRef, EventEmitter, Input, NgZone, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[appAwayBottom]'
})
export class AwayBottomDirective implements OnInit {
  @Input() distance = 120;
  @Output() closeBottom = new EventEmitter();

  constructor(private el: ElementRef,
              private ngZone: NgZone,
  ) {
  }

  ngOnInit(): void {
    const el: HTMLElement = this.el.nativeElement;
    this.ngZone.runOutsideAngular(() => {
      el.addEventListener('scroll', this.scroll.bind(this));
    });
  }

  scroll(e: Event) {
    const el = (e.target as HTMLElement);

    if (el.scrollHeight - el.scrollTop - el.clientHeight <= this.distance) {
      console.log('trigger');
      this.ngZone.run(() => {
        this.closeBottom.emit();
      });
    }
  }
}
