import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl } from '@angular/forms';

export function maxValueValidator(max: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const valid = control.value <= max;
    return valid ? null: { maxValue: { value: control.value } };
  };
}

@Directive({
  selector: '[maxValue]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: MaxValueDirective,
    multi: true,
  }],
})
export class MaxValueDirective implements Validator {
  @Input()
  value: number;

  validate(control: AbstractControl): { [key: string]: any } {
    return this.value ? maxValueValidator(this.value)(control) : null;
  }
}
