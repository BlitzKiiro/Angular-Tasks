import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

export const minLength = (length: number): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const target = control.value;
    return target && target.length < length
      ? {
          length: {
            msg: `You should enter at least ${length} characters`,
          },
        }
      : null;
  };
};

export const required = (control: AbstractControl): ValidationErrors | null => {
  return control.value
    ? null
    : {
        required: {
          msg: 'This field is required',
        },
      };
};

export const email = (control: AbstractControl): ValidationErrors | null => {
  return Validators.email(control) ? { email: { msg: 'Invalid email' } } : null;
};

export const onlyAlphabetAndSpaces = (
  control: AbstractControl
): ValidationErrors | null => {
  return control.value && Validators.pattern(/^[a-zA-Z]+/)(control)
    ? { onlyAlphabet: { msg: 'Only english alphabet characters allowed' } }
    : null;
};

export const phoneNumber = (
  control: AbstractControl
): ValidationErrors | null => {
  return control.value &&
    Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)(control)
    ? { phoneNumber: { msg: 'Please enter a valid phone number' } }
    : null;
};

export const minimumAge = (age: number): ValidatorFn => {
  const requiredAgeDate = new Date();
  requiredAgeDate.setFullYear(requiredAgeDate.getFullYear() - age);

  return (control: AbstractControl): ValidationErrors | null => {
    const target = control.value;
    return target && new Date(target) > requiredAgeDate
      ? {
          minimumAge: {
            msg: `Should be at least ${age} years old`,
          },
        }
      : null;
  };
};
