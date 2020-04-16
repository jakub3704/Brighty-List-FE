import { AbstractControl, ValidationErrors, FormControl } from '@angular/forms';

export function equalValidator(formControl: FormControl) {
  return (control: AbstractControl): ValidationErrors|null => {
    if (isEmptyInputValue(control.value)) {
      return null;
    }
    if (control.value as string !== formControl.value as string) {
      return {'equal' : true};
    }
    return null;
  }
}

function isEmptyInputValue(value: any): boolean {
  return value == null || value.length === 0;
}