import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[dPreventClickEvent]'
})
export class PreventClickEventDirective {
  @HostListener('click', ['$event'])
  onClick(event) {
    event.preventDefault();
  }
}
