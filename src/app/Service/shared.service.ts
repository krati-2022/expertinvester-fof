import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ExpertInvestorManagementDetails } from '../MainModule/admin/expert-and-investor/expert-and-investor.classes';
import { ExpertManagementDetails } from '../MainModule/admin/expert/expert.classes';
import { InvestorManagementDetails } from '../MainModule/admin/investor/investor.classes';
import { SendOtp, VerifyOtp } from '../MainModule/admin/sign-in/sign-in.class';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  apiUrl = environment.apiUrl
  public toggleSidebar: EventEmitter<any> = new EventEmitter()
  constructor(private http: HttpClient) { }

  SendOtp(data: SendOtp): Observable<any>{
    return this.http.post(this.apiUrl + 'api/Login/SendOTP', data)
  }
  
  VerifyOtp(data: VerifyOtp): Observable<any>{
    return this.http.post(this.apiUrl + 'api/Login/ConfirmOTP', data)
  }

  GetCountry(): Observable<any>{
    return this.http.get(this.apiUrl + 'api/ExpertInvestor/GetCountrylist')
  }

  GetIdeaonlist(countryname:string): Observable<any>{
    return this.http.get(this.apiUrl + 'api/ExpertInvestor/GetIdeaonlist?countryname=' + countryname)
  }

  AddExpert(data: ExpertManagementDetails): Observable<any>{
    let formData = new FormData()
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('mobileno', data.mobileno)
    formData.append('usertype',data.usertype)
    formData.append('aboutus',data.aboutus)
    formData.append('experttype',data.experttype)
    formData.append('IsSEBI',data.IsSEBI)
    formData.append('SEBIRegNo',data.SEBIRegNo)
    formData.append('certificateURL',data.certificateURL)
    formData.append('experience',data.experience)
    formData.append('knowledgelevel',data.knowledgelevel)
    formData.append('accountname',data.accountname)
    formData.append('accountnumber',data.accountnumber)
    formData.append('bankname',data.bankname)
    formData.append('bankIFSCcode',data.bankIFSCcode)
    return this.http.post(this.apiUrl + 'api/ExpertInvestor/AddExpert', formData)
  }

  AddInvestor(data: InvestorManagementDetails): Observable<any>{
    return this.http.post(this.apiUrl + 'api/ExpertInvestor/AddInvester', data)
  }
  
  AddExpertInvestor(data: ExpertInvestorManagementDetails): Observable<any>{
    return this.http.post(this.apiUrl + 'api/ExpertInvestor/AddExpertInvester', data)
  }
}
