import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddChannelComponent } from './components/add-channel/add-channel.component';
import { ChannelComponent } from './components/channel/channel.component';
import { ClubComponent } from './components/club/club.component';
import { FeedComponent } from './components/feed/feed.component';
import { DetailsComponent } from './details/details.component';
import { ExpertAndInvestorComponent } from './expert-and-investor/expert-and-investor.component';
import { ExpertListComponent } from './expert-list/expert-list.component';
import { ExpertProfileComponent } from './expert-profile/expert-profile.component';
import { ExpertComponent } from './expert/expert.component';
import { HomePageComponent } from './home-page/home-page.component';
import { InvestorComponent } from './investor/investor.component';
import { ListGroupComponent } from './list-group/list-group.component';
import { AboutUsComponent } from './Pages/about-us/about-us.component';
import { AddTradeComponent } from './Pages/add-trade/add-trade.component';
import { ClubListComponent } from './Pages/club-list/club-list.component';
import { ContactUsComponent } from './Pages/contact-us/contact-us.component';
import { FaqComponent } from './Pages/faq/faq.component';
import { FeedClubListComponent } from './Pages/feed-club-list/feed-club-list.component';
import { LegalDisclamerComponent } from './Pages/legal-disclamer/legal-disclamer.component';
import { ListComponent } from './Pages/list/list.component';
import { PrivacyPolicyComponent } from './Pages/privacy-policy/privacy-policy.component';
import { ProfilePageComponent } from './Pages/profile-page/profile-page.component';
import { TermsConditionsComponent } from './Pages/terms-conditions/terms-conditions.component';
import { TermsServicesComponent } from './Pages/terms-services/terms-services.component';
import { TradesComponent } from './Pages/trades/trades.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { UpgradePlanComponent } from './upgrade-plan/upgrade-plan.component';
import { UserSetUpComponent } from './user-set-up/user-set-up.component';
import { EnterPinComponent } from './enter-pin/enter-pin.component';
import { SetuUpPinComponent } from './setu-up-pin/setu-up-pin.component';
import { ChannelDetailsComponent } from './components/channel-details/channel-details.component';
import { PinRecoveryComponent } from './pin-recovery/pin-recovery.component';
import { ClubDetailsComponent } from './components/club-details/club-details.component';
import { EditChannelComponent } from './components/edit-channel/edit-channel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './user-list/user-list.component';
import { PaymentListComponent } from './payment-list/payment-list.component';

const routes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'user-set-up', component: UserSetUpComponent },
  { path: 'expert', component: ExpertComponent },
  { path: 'investor', component: InvestorComponent },
  { path: 'expertAndInvestor', component: ExpertAndInvestorComponent },
  { path: 'enter-pin', component: EnterPinComponent },
  { path: 'set-up-pin', component: SetuUpPinComponent },
  { path: 'club-list', component: ClubListComponent },
  { path: 'pin-recovery', component: PinRecoveryComponent },
  { path: 'terms-of-services', component: TermsServicesComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  {
    path: 'home',
    component: HomePageComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'feed', component: FeedComponent },
      { path: 'club', component: ClubComponent },
      { path: 'channel', component: ChannelComponent },
      {
        path: 'channel-details/:param1/:param2/:param3/:param4/:param5',
        component: ChannelDetailsComponent,
      },
      { path: 'add-channel', component: AddChannelComponent },
      { path: 'edit-channel/:param1', component: EditChannelComponent },
      { path: 'expertList', component: ExpertListComponent },
      { path: 'expertProfile', component: ExpertProfileComponent },
      { path: 'listGroup/:param1/:param2', component: ListGroupComponent },
      { path: 'details/:param1/:param2', component: DetailsComponent },
      { path: 'list/:param1/:param2/:param3', component: ListComponent },
      {
        path: 'add-trade/:param1/:param2/:param3',
        component: AddTradeComponent,
      },
      {
        path: 'trades/:param1/:param2/:param3/:param4',
        component: TradesComponent,
      },
      {
        path: 'club-details/:param1/:param2/:param3',
        component: ClubDetailsComponent,
      },
      { path: 'feed-club', component: FeedClubListComponent },
      { path: 'upgrade-plan', component: UpgradePlanComponent },
      { path: 'profile-page', component: ProfilePageComponent },
      { path: 'faq', component: FaqComponent },
      { path: 'contact', component: ContactUsComponent },
      { path: 'about', component: AboutUsComponent },
      { path: 'terms', component: TermsConditionsComponent },
      { path: 'privacy-policy', component: PrivacyPolicyComponent },
      { path: 'legal-disclamer', component: LegalDisclamerComponent },
      { path: 'terms-services', component: TermsServicesComponent },
      { path: 'user-list', component: UserListComponent },
      { path: 'payment-list', component: PaymentListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebsiteRoutingModule {}
