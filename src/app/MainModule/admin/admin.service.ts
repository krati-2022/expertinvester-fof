import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AdminLogin } from './admin-login/admin-login.classes';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AddClub } from './Components/add-club/add-club.classes';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  apiUrl = environment.baseUrlForAdmmin;
  public toggleSidebar: EventEmitter<any> = new EventEmitter();
  public showSearchBar: EventEmitter<any> = new EventEmitter();
  public search = new BehaviorSubject<string>('');
  private data = new BehaviorSubject<string>('initial data');
  constructor(private http: HttpClient) {}

  ProceedToLogin(data: AdminLogin): Observable<AdminLogin> {
    return this.http.post(this.apiUrl + 'api/Admin/AdminLogin', data);
  }
  
  GetDetails(email: string): Observable<any> {
    return this.http.get(this.apiUrl + 'api/Admin/GetAdmin/' + email);
  }

  AddClub(data: AddClub): Observable<AddClub>{
    return this.http.post(this.apiUrl + 'api/Admin/AddClub', data)
  }
}
