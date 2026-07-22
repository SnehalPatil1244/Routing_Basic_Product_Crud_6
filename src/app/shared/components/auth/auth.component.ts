import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SnackbarService } from '../../services/snackbar.service';
import { Router } from '@angular/router';
import { ILogin, ISingIn } from '../../models/auth';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isAllReadyHAsAccount: boolean = false
  LoginForm !: FormGroup
  SignUpForm !: FormGroup

  constructor(private authservice: AuthService,
    private snackbar: SnackbarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createLoginForm()
    this.createSignUpForm()
  }

  createLoginForm() {
    this.LoginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

  createSignUpForm() {
    this.SignUpForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      userRole: new FormControl(null, Validators.required)
    })
  }

  get l() {
    return this.LoginForm.controls
  }
  get s() {
    return this.SignUpForm.controls
  }

  onlogin() {
    if (this.LoginForm.invalid) {
      this.LoginForm.markAllAsTouched()
    } else {
      let userdetails: ILogin = {
        ...this.LoginForm.value
      }
      this.authservice.login(userdetails).subscribe({
        next: res => {
          this.snackbar.opensnackbar(res.message)
          this.authservice.savetoken(res.token)
          this.authservice.saveuserRole(res.userRole)
          this.authservice.isLogging$.next(res.userRole)
          this.router.navigate(['/home'])
        },
        error: err => {
          this.snackbar.opensnackbar(err.error.message)
        }
      })
    }

  }
  onsignup() {
    if (this.SignUpForm.invalid) {
      this.SignUpForm.markAllAsTouched()
    }
    else {
      let userdetails: ISingIn = {
        ...this.SignUpForm.value
      }
      this.authservice.SingIn(userdetails).subscribe({
        next: res => {
          this.snackbar.opensnackbar(res.message)
          this.isAllReadyHAsAccount = true
        },
        error: err => {
          this.snackbar.opensnackbar(err.error.message)
          this.isAllReadyHAsAccount = true
        }
      })
    }

  }

}
