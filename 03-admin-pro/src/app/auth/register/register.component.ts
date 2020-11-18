import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public formSubmitted = false;

  public registerForm = this.fb.group(
    {
      name: ['Wilson Aguilar', [Validators.required]],
      email: [
        'wilson-881@hotmail.com',
        [Validators.required, Validators.email],
      ],
      password: ['123456', [Validators.required]],
      password2: ['123456', [Validators.required]],
      terms: [true, [Validators.required]],
    },
    {
      validators: this.passwordsMatch('password', 'password2'),
    }
  );

  constructor(
    private fb: FormBuilder,
    private userSv: UserService,
    private router: Router
  ) {}

  createUser(): void {
    this.formSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.userSv.createUser(this.registerForm.value).subscribe(
      (resp) => {
        this.router.navigateByUrl('/');
      },
      (err) => Swal.fire('Error', err.error.msg, 'error')
    );
  }

  noValidField(field: string): boolean {
    if (this.registerForm.get(field).invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

  noValidPasswords(): boolean {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if (pass1 !== pass2 && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  acceptTerms(): boolean {
    return !this.registerForm.get('terms').value && this.formSubmitted;
  }

  passwordsMatch(pass1Name: string, pass2Name: string): CallableFunction {
    return (formGroup: FormGroup) => {
      const pass1Ctrl = formGroup.get(pass1Name);
      const pass2Ctrl = formGroup.get(pass2Name);

      if (pass1Ctrl.value === pass2Ctrl.value) {
        pass2Ctrl.setErrors(null);
      } else {
        pass2Ctrl.setErrors({ notMatching: true });
      }
    };
  }
}
