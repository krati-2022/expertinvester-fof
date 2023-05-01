import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ExpertInvestorManagementDetails } from '../MainModule/admin/expert-and-investor/expert-and-investor.classes';
import { ExpertManagementDetails } from '../MainModule/admin/expert/expert.classes';
import { InvestorManagementDetails } from '../MainModule/admin/investor/investor.classes';
import {
  SendOtp,
  UserIsExist,
  VerifyOtp,
} from '../MainModule/admin/sign-in/sign-in.class';
import { SetPin } from '../MainModule/admin/setu-up-pin/set-up-pin.classes';
import { Login } from '../MainModule/admin/enter-pin/enter-pin.classes';
import { FollowClub } from '../MainModule/admin/Pages/club-list/club-list.classes';
import { AddTrade } from '../MainModule/admin/Pages/add-trade/add-trade.classes';
import {
  SendOtpForRecoverPin,
  VerifyOtpForRecovery,
} from '../MainModule/admin/pin-recovery/pin-recovery.classes';
import { ChannelApproveReject, ChannelSubscriber } from '../MainModule/admin/components/channel/channel.classes';
import { AddPostDetails } from '../MainModule/admin/Pages/trades/trades.classes';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  apiUrl = environment.apiUrl;
  public toggleSidebar: EventEmitter<any> = new EventEmitter();
  public showSearchBar: EventEmitter<any> = new EventEmitter();
  public search = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  SendOtp(data: SendOtp): Observable<any> {
    return this.http.post(this.apiUrl + 'api/Login/SendOTP', data);
  }

  SendOtpForRestPin(data: SendOtpForRecoverPin): Observable<any> {
    return this.http.post(
      this.apiUrl + 'api/Login/SendForgotPasswordOTP',
      data
    );
  }

  VerifyOtp(data: VerifyOtp): Observable<any> {
    return this.http.post(this.apiUrl + 'api/Login/ConfirmOTP', data);
  }
  VerifyRecoverPinOtp(data: VerifyOtpForRecovery): Observable<any> {
    return this.http.post(
      this.apiUrl + 'api/Login/ForgotPasswordConfirmOTP',
      data
    );
  }

  LoginIn(data: Login): Observable<any> {
    return this.http.post(this.apiUrl + 'api/Login/LoginIn', data);
  }

  UserIsExist(mobile_No: string): Observable<any> {
    return this.http.get(
      this.apiUrl + 'api/Login/CheckUserExists?Mobile_No=' + mobile_No
    );
  }

  SetPin(data: SetPin): Observable<any> {
    return this.http.post(this.apiUrl + 'api/Login/SetPIN', data);
  }

  GetCountry(): Observable<any> {
    return this.http.get(this.apiUrl + 'api/ExpertInvestor/GetCountrylist');
  }

  GetIdeaonlist(countryname: string): Observable<any> {
    return this.http.get(
      this.apiUrl +
        'api/ExpertInvestor/GetIdeaonlist?countryname=' +
        countryname
    );
  }

  GetPin(mobile_number: string): Observable<any> {
    return this.http.get(
      this.apiUrl + 'api/Login/GetPIN?Mobile_No=' + mobile_number
    );
  }

  // AddExpert(data: ExpertManagementDetails): Observable<any>{
  //   let formData = new FormData()
  //   formData.append('name', data.name)
  //   formData.append('email', data.email)
  //   formData.append('mobileno', data.mobileno)
  //   formData.append('usertype',data.usertype)
  //   formData.append('aboutus',data.aboutus)
  //   formData.append('experttype',data.experttype)
  //   formData.append('IsSEBI',data.IsSEBI)
  //   formData.append('SEBIRegNo',data.SEBIRegNo)
  //   formData.append('certificateURL',data.certificateURL)
  //   formData.append('experience',data.experience)
  //   formData.append('knowledgelevel',data.knowledgelevel)
  //   formData.append('accountname',data.accountname)
  //   formData.append('accountnumber',data.accountnumber)
  //   formData.append('bankname',data.bankname)
  //   formData.append('bankIFSCcode',data.bankIFSCcode)
  //   return this.http.post(this.apiUrl + 'api/ExpertInvestor/AddExpert', formData)
  // }

  AddInvestor(data: InvestorManagementDetails): Observable<any> {
    return this.http.post(this.apiUrl + 'api/ExpertInvestor/AddInvester', data);
  }

  AddExpertInvestor(data: ExpertInvestorManagementDetails): Observable<any> {
    return this.http.post(
      this.apiUrl + 'api/ExpertInvestor/AddExpertInvester',
      data
    );
  }

  GetMasterData(mobile_No: string): Observable<any> {
    return this.http.get(
      this.apiUrl + 'api/Club/GetMasterclublist?mobileno=' + mobile_No
    );
  }

  FollowClub(data: FollowClub): Observable<any> {
    return this.http.post(this.apiUrl + 'api/Club/AddUserFollowClub', data);
  }
  UnFollowClub(data: FollowClub): Observable<any> {
    return this.http.post(
      this.apiUrl + 'api/Club/UserUnFollowClubListUpdate',
      data
    );
  }

  GetFeed(
    mobile_No: string,
    pageNumber: number,
    pageSize: number
  ): Observable<any> {
    return this.http.get(
      this.apiUrl +
        'GetFeedPost?Mobile_No=' +
        mobile_No +
        '&pageNumber=' +
        pageNumber +
        '&pageSize=' +
        pageSize
    );
  }

  GetChannel(mobile_No: string): Observable<any> {
    return this.http.get(
      this.apiUrl + 'api/Channel/GetChannelMasterList?Mobile_No=' + mobile_No
    );
  }

  GetExpertList(mobile_No: string): Observable<any> {
    return this.http.get(
      this.apiUrl + 'api/Channel/GetExpertProfile?Mobile_No=' + mobile_No
    );
  }

  AddChannel(data: any): Observable<any> {
    return this.http.post(this.apiUrl + 'api/Channel/AddchannelMaster', data);
  }

  GetActivePost(mobile_No: string, id: string): Observable<any> {
    return this.http.get(
      this.apiUrl +
        'api/Channel/GetChannelActivePost?Mobile_No=' +
        mobile_No +
        '&channelid=' +
        id
    );
  }

  GetPastPost(mobile_No: string, id: string): Observable<any> {
    return this.http.get(
      this.apiUrl +
        'api/Channel/GetChannelPastPost?Mobile_No=' +
        mobile_No +
        '&channelid=' +
        id
    );
  }

  GetProfile(mobile_No: string, id: string): Observable<any> {
    return this.http.get(
      this.apiUrl +
        'api/Channel/GetChannelProfile?Mobile_No=' +
        mobile_No +
        '&channelid=' +
        id
    );
  }

  AddFeedPost(data: AddTrade): Observable<any> {
    return this.http.post(this.apiUrl + 'AddFeedPost', data);
  }

  GetFeedPostdetail(Mobileno: string, feedpostid: string): Observable<any> {
    return this.http.get(
      this.apiUrl +
        'GetFeedPostdetail?Mobileno=' +
        Mobileno +
        '&feedpostid=' +
        feedpostid
    );
  }

  BlockUnblockFeedPost(
    id: string,
    mobile_No: string,
    status: boolean
  ): Observable<any> {
    const data = {};
    return this.http.post(
      this.apiUrl +
        'FeedPostblock?FeedPostID=' +
        id +
        '&mobileno=' +
        mobile_No +
        '&block=' +
        status,
      data
    );
  }

  FeedPostLikeDislike(
    FeedPostID: string,
    status: boolean,
    mobile_No: string
  ): Observable<any> {
    const data = {};
    return this.http.post(
      this.apiUrl +
        'UpdateFeedPostlike?FeedPostID=' +
        FeedPostID +
        '&like=' +
        status +
        '&Mobileno=' +
        mobile_No,
      data
    );
  }

  ChannelPostLikeDislike(data: any): Observable<any> {
    return this.http.post(this.apiUrl + 'UpdateChannelMasterLike', data);
  }
  GetLikes(id: string): Observable<any> {
    return this.http.get(this.apiUrl + 'GetLikeCount?id=' + id);
  }

  GetClubDetails(mobileNumber: string, id: string) {
    return this.http.get(
      this.apiUrl +
        'api/Club/GetUserClublistDetail?mobileno=' +
        mobileNumber +
        '&clublistid=' +
        id
    );
  }

  ChannelSubscribe(data: ChannelSubscriber): Observable<any> {
    return this.http.post(
      this.apiUrl + 'api/channel/UpdateChannelMasterSubscriber',
      data
    );
  }

  AddPost(data: AddPostDetails): Observable<any> {
    return this.http.post(this.apiUrl + 'api/channel/AddChannelPost', data);
  }

  ApproveRejectChannel(data: ChannelApproveReject): Observable<any> {
    return this.http.post(
      this.apiUrl + 'api/channel/UpdateChannelMasterApproveReject',
      data
    );
  }

  FilterData(
    mobile_No: number,
    Club: string,
    Channel: string,
    Expert: string,
    Investor: string,
    ExpertAndInvestor: string,
    pageNumber:number,
    pageSize:number
  ): Observable<any> {
    return this.http.get(
      this.apiUrl +
        'GetFeedPost?Mobile_No='+mobile_No+'&Club='+Club+'&Channel='+Channel+'&Expert='+Expert+'&Investor='+Investor+'&ExpertAndInvestor='+ExpertAndInvestor+'&pageNumber='+pageNumber+'&pageSize='+ pageSize
    );
  }
}
