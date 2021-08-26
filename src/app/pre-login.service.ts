import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PreLoginService {
  public baseApi = 'api.insight.com';
  public loginApi = '/loginAuth';
  public registerApi = '/registerAuth';

  constructor(public http: HttpClient, public route: Router) {}

  authoriseLogin(payload: any) {
    const url = this.baseApi + this.loginApi;
    return this.http.post(url, payload);
  }
  registerUser(payload: any) {
    const url = this.baseApi + this.registerApi;
    return this.http.post(url, payload);
  }
}
