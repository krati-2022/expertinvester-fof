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
  constructor(private _service: SharedService) {}

  ngOnInit(): void {
    
    this._service.showSearchBar.subscribe(() => {
      this.showSearch = true;
      // console.log('this.showSearch: ', this.showSearch);
    });
  }

  
  @HostListener('window:scroll', [])
  public onScrolled() {
    if (window.pageYOffset < 100) {
      this.showSearch = false;
    }
  }
}
