import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appStringOnly]',
  standalone: true
})
export class StringOnlyDirective {

  // HostListener listens to the 'keypress' event on the element
  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    const inputChar = String.fromCharCode(event.keyCode || event.which);

    // Allow only alphabets and space
    const regex = /^[a-zA-Z\s]*$/;

    if (!regex.test(inputChar)) {
      event.preventDefault(); // Block invalid character input
    }
  }
}
