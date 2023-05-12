import {
  Directive,
  ElementRef,
  HostListener,
  AfterViewInit,
  AfterContentInit,
} from '@angular/core';

@Directive({
  selector: 'form',
})
export class FormFocusDirective implements AfterContentInit {
  focusables = ['input', 'select', 'textarea'];

  constructor(private element: ElementRef) {}

  ngAfterContentInit() {
    const input = this.element.nativeElement.querySelector(
      this.focusables.join(',')
    );
    // if (input) {
    //   input.focus();
    // }
  }

  @HostListener('submit')
  submit() {
    const input = this.element.nativeElement.querySelector(
      this.focusables.map((x) => `${x}.ng-invalid`).join(',')
    );
    if (input) {
      input.focus();
    }
  }
}
