import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChannelSubscriber } from 'src/app/MainModule/website/components/channel/channel.classes';
import { SharedService } from 'src/app/Service/shared.service';

@Component({
  selector: 'app-common-section',
  templateUrl: './common-section.component.html',
  styleUrls: ['./common-section.component.css'],
})
export class CommonSectionComponent implements OnInit {
  public searchTerm!: string;
  searchFilterForm: FormGroup | any;
  showSearch: boolean = false;
  isLoading: boolean = false;
  isReload: boolean = false;
  current: number = 0;
  perPage: number = 10;
  mobileNumber = localStorage.getItem('mobile_number') || '';
  topTrendingChannel: any = [];
  channelSubscriber = new ChannelSubscriber();

  // selector: string = '.main-pannel-scrl';
  constructor(private _service: SharedService) {}

  ngOnInit(): void {
    this._service.showSearchBar.subscribe(() => {
      this.showSearch = true;
      // console.log('this.showSearch: ', this.showSearch);
    });
    this.GetTopTrendingChannels();
  }

  GetTopTrendingChannels() {
    let mobile_No = '';
    var splitString = this.mobileNumber.split('');
    if (splitString[0] == '+') {
      splitString[0] = '%2B';
      var joinString = splitString.join('');
      mobile_No = joinString;
    }
    // console.log('splitString: ', mobile_No);
    if(this.isReload == false){
      this.isLoading = true;
    }
    this._service
      .TopTrendingChannels(mobile_No, this.current, this.perPage)
      .subscribe((res: any) => {
        // console.log('res: ', res);
        this.topTrendingChannel = res.items;
        this.isLoading = false;
        // console.log('this.topTrendingChannel: ', this.topTrendingChannel);
      });
  }

  onScroll() {
    var pageNumber = ++this.current;
    this._service
      .TopTrendingChannels(this.mobileNumber, pageNumber, this.perPage)
      .subscribe((res: any) => {
        if (res.items.length != 0) {
          this.topTrendingChannel.push(...res.items);
        } else {
          this.current--;
        }

        // this.total = Math.ceil(res.totalRecords / this.perPage) - 1
      });
  }

  subscribe(item: any) {
    // console.log('item: ', item);
    this.isReload = true
    this.channelSubscriber = new ChannelSubscriber({
      channelId: item.channelMasterId,
      subscriber: !item.isSubscribed,
      mobile_No: this.mobileNumber,
    });
    // console.log('this.channelSubscriber: ', this.channelSubscriber);
    // return
    this._service.ChannelSubscribe(this.channelSubscriber).subscribe((res) => {
      // console.log('res: ', res);
      this.GetTopTrendingChannels();
    });
  }

  @HostListener('window:scroll', [])
  public onScrolled() {
    if (window.pageYOffset < 100) {
      this.showSearch = false;
    }
  }
}
