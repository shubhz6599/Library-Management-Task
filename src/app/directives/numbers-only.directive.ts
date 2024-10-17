import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumbersOnly]',
  standalone: true
})
export class NumbersOnlyDirective {

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const allowedKeys = [
      'Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab', 'Enter'
    ]; // Essential keys

    if (allowedKeys.includes(event.key)) {
      return; // Allow the key press
    }

    const regex = /^[0-9]*$/; // Regular expression for numbers only
    const inputChar = event.key;

    // If the input is not a number, prevent the key press
    if (!regex.test(inputChar)) {
      event.preventDefault();
    }
  }
}
