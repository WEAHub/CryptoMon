import {
	AbstractControl,
  FormGroup,
	ValidationErrors,
	ValidatorFn,
} from '@angular/forms';

export class CustomValidators {
  constructor() {}

	static cantMatch(controlName: string, matchControlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceCtrl = control.get(controlName);
      const targetCtrl = control.get(matchControlName);

      return sourceCtrl && targetCtrl && sourceCtrl.value === targetCtrl.value
        ? { cantMatch: true }
        : null;
    };
	}
}
