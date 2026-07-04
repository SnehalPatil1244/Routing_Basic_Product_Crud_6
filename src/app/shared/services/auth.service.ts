import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILogin, ISingIn } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth_Base_Url: string = environment.AuthBaseUrl

  constructor(private hhtp: HttpClient) { }

  login(userdetails: ILogin): Observable<any> {
    let Login_Url = `${this.auth_Base_Url}/api/auth/login`
    return this.hhtp.post<any>(Login_Url, userdetails)
  }

  SingIn(userdetails: ISingIn): Observable<any> {
    let SingUp_Url = `${this.auth_Base_Url}/api/auth/register`
    return this.hhtp.post<any>(SingUp_Url, userdetails)
  }

  savetoken(token: string) {
    localStorage.setItem('token', token)
  }

  saveuserRole(userRole: string) {
    localStorage.setItem('userRole', userRole)
  }

  getToken() {
    localStorage.getItem('token')
  }
  getuserRole() {
    localStorage.getItem('userRole')
  }

  LogOut() {
    localStorage.removeItem('token')
    localStorage.removeItem('userRole')
  }


}
