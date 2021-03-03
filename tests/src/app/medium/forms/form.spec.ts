import { FormBuilder } from '@angular/forms';
import { RegisterForm } from './form';

describe('Forms', () => {
  let component: RegisterForm;

  beforeEach(() => {
    component = new RegisterForm(new FormBuilder());
  });

  it('should create a form with 2 fields, email and password', () => {
    expect(component.form.contains('email')).toBeTruthy();
    expect(component.form.contains('password')).toBeTruthy();
  });

  it('the email should be required ', () => {
    const control = component.form.get('email');
    control.setValue('');

    expect(control.valid).toBeFalsy();
  });

  it('the email should be an valid email ', () => {
    const control = component.form.get('email');
    control.setValue('will123@gmail.com');

    expect(control.valid).toBeTruthy();
  });
});
