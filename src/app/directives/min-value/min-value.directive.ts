import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl } from '@angular/forms';

export function minValueValidator(min: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const valid = control.value >= min;
    return valid ? null: { minValue: { value: control.value } };
  };
}

@Directive({
  selector: '[minValue]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: MinValueDirective,
    multi: true,
  }],
})
export class MinValueDirective implements Validator {
  @Input()
  value: number;

  validate(control: AbstractControl): { [key: string]: any } {
    return this.value ? minValueValidator(this.value)(control) : null;
  }
}
