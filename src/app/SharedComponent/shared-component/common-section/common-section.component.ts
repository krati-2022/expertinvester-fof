import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  current: number = 0;
  perPage: number = 100;
  mobileNumber = localStorage.getItem('mobile_number') || '';
  topTrendingChannel: any = [];
  selector: string = '.main-pannel-scrl';
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
    this.isLoading = true;
    this._service
      .TopTrendingChannels(mobile_No, this.current, this.perPage)
      .subscribe((res: any) => {
        console.log('res: ', res);
        this.topTrendingChannel = res.items;
        this.isLoading = false;
        // console.log('this.topTrendingChannel: ', this.topTrendingChannel);
      });
  }

  onScroll() {
    var pageNumber = ++this.current;
    console.log('pageNumber: ', pageNumber);
  }

  @HostListener('window:scroll', [])
  public onScrolled() {
    if (window.pageYOffset < 100) {
      this.showSearch = false;
    }
  }
}
