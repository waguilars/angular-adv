import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

declare const gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public formSubmitted = false;
  public auth2: any;

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
    private userSv: UserService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.renderButton();
  }

  noValidField(field: string): boolean {
    if (this.loginForm.get(field).invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

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

        this.router.navigateByUrl('/');
      },
      (err) => {
        Swal.fire('Error', err.error.msg, 'error');
        console.log(err);
      }
    );
  }

  renderButton(): void {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
    });

    this.startApp();
  }

  /* Google Sign in */
  async startApp(): Promise<void> {
    this.auth2 = await this.userSv.initGoogle();

    this.attachSignin(document.getElementById('my-signin2'));
  }

  attachSignin(element: any): void {
    // console.log(element.id);
    this.auth2.attachClickHandler(
      element,
      {},
      (googleUser: any) => {
        const tokenGoogle = googleUser.getAuthResponse().id_token;
        this.userSv.loginGoogle(tokenGoogle).subscribe((resp) => {
          // Redirect to dashboard
          this.ngZone.run(() => {
            this.router.navigateByUrl('/');
          });
        });
      },
      (error: any) => {
        alert(JSON.stringify(error, undefined, 2));
      }
    );
  }
}
