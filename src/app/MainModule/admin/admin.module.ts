import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { TopBarComponent } from 'src/app/SharedComponent/shared-component/top-bar/top-bar.component';
import { SideBarComponent } from 'src/app/SharedComponent/shared-component/side-bar/side-bar.component';
import { FooterComponent } from 'src/app/SharedComponent/shared-component/footer/footer.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { UserSetUpComponent } from './user-set-up/user-set-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExpertComponent } from './expert/expert.component';
import { InvestorComponent } from './investor/investor.component';
import { ExpertAndInvestorComponent } from './expert-and-investor/expert-and-investor.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeedComponent } from './components/feed/feed.component';
import { ClubComponent } from './components/club/club.component';
import { ChannelComponent } from './components/channel/channel.component';
import { AddChannelComponent } from './components/add-channel/add-channel.component';
import { ExpertListComponent } from './expert-list/expert-list.component';
import { ExpertProfileComponent } from './expert-profile/expert-profile.component';
import { ListGroupComponent } from './list-group/list-group.component';
import { DetailsComponent } from './details/details.component';
import { AddTradeComponent } from './Pages/add-trade/add-trade.component';
import { ClubListComponent } from './Pages/club-list/club-list.component';
import { ListComponent } from './Pages/list/list.component';
import { TradesComponent } from './Pages/trades/trades.component';
import { FeedClubListComponent } from './Pages/feed-club-list/feed-club-list.component';
import { UpgradePlanComponent } from './upgrade-plan/upgrade-plan.component';
import { ContactUsComponent } from './Pages/contact-us/contact-us.component';
import { AboutUsComponent } from './Pages/about-us/about-us.component';
import { TermsConditionsComponent } from './Pages/terms-conditions/terms-conditions.component';
import { FaqComponent } from './Pages/faq/faq.component';
import { ProfilePageComponent } from './Pages/profile-page/profile-page.component';
import { PrivacyPolicyComponent } from './Pages/privacy-policy/privacy-policy.component';
import { LegalDisclamerComponent } from './Pages/legal-disclamer/legal-disclamer.component';
import { TermsServicesComponent } from './Pages/terms-services/terms-services.component';
import { CommenSelectionComponent } from 'src/app/SharedComponent/shared-component/commen-selection/commen-selection.component';


@NgModule({
  declarations: [
    HomePageComponent,
    TopBarComponent,
    SideBarComponent,
    FooterComponent,
    SignInComponent,
    UserSetUpComponent,
    ExpertComponent,
    InvestorComponent,
    ExpertAndInvestorComponent,
    DashboardComponent,
    FeedComponent,
    ClubComponent,
    ChannelComponent,
    AddChannelComponent,
    ExpertListComponent,
    ExpertProfileComponent,
    ListGroupComponent,
    DetailsComponent,
    AddTradeComponent,
    ClubListComponent,
    ListComponent,
    TradesComponent,
    FeedClubListComponent,
    UpgradePlanComponent,
    ContactUsComponent,
    AboutUsComponent,
    TermsConditionsComponent,
    FaqComponent,
    ProfilePageComponent,
    PrivacyPolicyComponent,
    LegalDisclamerComponent,
    TermsServicesComponent,
  CommenSelectionComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule

  ]
})
export class AdminModule { }
