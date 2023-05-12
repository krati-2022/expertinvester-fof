import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import {
  CommonModule,
  HashLocationStrategy,
  LocationStrategy,
} from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';
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
import { NgOtpInputModule } from 'ng-otp-input';
import { EnterPinComponent } from './enter-pin/enter-pin.component';
import { SetuUpPinComponent } from './setu-up-pin/setu-up-pin.component';
import { CommonSectionComponent } from 'src/app/SharedComponent/shared-component/common-section/common-section.component';
import { PaginationComponent } from 'src/app/SharedComponent/shared-component/pagination/pagination.component';
import { ChannelDetailsComponent } from './components/channel-details/channel-details.component';
import { InfiniteScrollComponent } from 'src/app/SharedComponent/shared-component/infinite-scroll/infinite-scroll.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FilterPipe } from 'src/app/Utils/filter.pipe';
import { PinRecoveryComponent } from './pin-recovery/pin-recovery.component';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { ResponsiveViewComponent } from './components/responsive-view/responsive-view.component';
import { ClubDetailsComponent } from './components/club-details/club-details.component';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';
import { SharedService } from 'src/app/Service/shared.service';
import { ScrollDirective } from 'src/app/Utils/scroll-directive';
import { EditChannelComponent } from './components/edit-channel/edit-channel.component';
import { NgChartsModule } from 'ng2-charts';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MessagePageComponent } from './message-page/message-page.component';


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
    EnterPinComponent,
    SetuUpPinComponent,
    CommonSectionComponent,
    PaginationComponent,
    ChannelDetailsComponent,
    InfiniteScrollComponent,
    FilterPipe,
    PinRecoveryComponent,
    ResponsiveViewComponent,
    ClubDetailsComponent,
    ChatBoxComponent,
    ScrollDirective,
    EditChannelComponent,
    MessagePageComponent,
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgOtpInputModule,
    InfiniteScrollModule,
    NgxGalleryModule,
    NgChartsModule,
    AngularEditorModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [
    SharedService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
})
export class WebsiteModule {}
