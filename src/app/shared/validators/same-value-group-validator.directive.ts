import { Directive, Input, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, ValidatorFn } from '@angular/forms';
import { sameValueGroupValidator } from './same-value-group-validator';

@Directive({
  selector: '[appSameValueGroupValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: SameValueGroupValidatorDirective,
      multi: true,
    },
  ],
})
export class SameValueGroupValidatorDirective {
  @Input() appSameValueGroupValidator: string[] = [];

  validator: ValidatorFn = () => null;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    const appSameValueGroupValidatorList = changes['appSameValueGroupValidator'];
    if (appSameValueGroupValidatorList) {
      this.validator = sameValueGroupValidator(appSameValueGroupValidatorList.currentValue[0], appSameValueGroupValidatorList.currentValue[1]);
    }
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.validator(control);
  }
}
