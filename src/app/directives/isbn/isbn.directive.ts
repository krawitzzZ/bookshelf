import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl } from '@angular/forms';

export function isbnValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const regex = /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/i;
    const valid = regex.test(control.value);
    return valid ? null: { isbn: { value: control.value } };
  };
}

@Directive({
  selector: '[isbn]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: IsbnDirective,
    multi: true,
  }],
})
export class IsbnDirective implements Validator {
  @Input()
  value: string;

  validate(control: AbstractControl): { [key: string]: any } {
    return this.value ? isbnValidator()(control) : null;
  }
}
