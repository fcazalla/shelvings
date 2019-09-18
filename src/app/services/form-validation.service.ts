import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  constructor() { }

  validateFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateFormFields(control);
      }
    });
  }

  isFieldValid(field: string, form) {
    const fieldFromForm = form.get(field);
    return !fieldFromForm.valid && fieldFromForm.touched;
  }

  displayFieldCss(field: string, form) {
    return {
      'is-invalid': this.isFieldValid(field, form)
    };
  }
}
