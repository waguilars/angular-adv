import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public formSubmitted = false;
  public loginForm = this.fb.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email],
    ],
    password: ['', Validators.required],
    remember: [localStorage.getItem('remember') || false],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userSv: UserService
  ) {}

  login(): void {
    this.formSubmitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.userSv.login(this.loginForm.value).subscribe(
      (resp) => {
        if (this.loginForm.get('remember').value) {
          localStorage.setItem('email', this.loginForm.get('email').value);
          localStorage.setItem(
            'remember',
            this.loginForm.get('remember').value
          );
        } else {
          localStorage.removeItem('email');
          localStorage.removeItem('remember');
        }
      },
      (err) => {
        Swal.fire('Error', err.error.msg, 'error');
        console.log(err);
      }
    );
  }

  noValidField(field: string): boolean {
    if (this.loginForm.get(field).invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }
}
