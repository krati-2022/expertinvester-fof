import {
  Directive,
  ElementRef,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';

@Directive({
  selector: '[appScroll]',
})
export class ScrollDirective implements OnInit, OnDestroy {
  @Output() appScroll = new EventEmitter<void>();

  private observer: IntersectionObserver | any;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.appScroll.emit();
        }
      });
    });
    this.observer.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }
}
