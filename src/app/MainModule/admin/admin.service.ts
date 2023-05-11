import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AdminLogin } from './admin-login/admin-login.classes';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  apiUrl = environment.apiUrl
  constructor(private http : HttpClient) { }

  ProceedToLogin(data: AdminLogin): Observable<AdminLogin> {
    return this.http.post(this.apiUrl + 'api/login', data)
  }
}
