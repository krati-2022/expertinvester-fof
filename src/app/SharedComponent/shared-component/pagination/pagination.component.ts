import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {
  @Input() totalRecords = 0;  
  @Input() recordsPerPage = 0;  

  @Output() onPageChange: EventEmitter<number> = new EventEmitter();  

  public pages: number [] = [];  
  activePage: number = 0;  


  ngOnChanges(): any {  
    const pageCount = this.getPageCount();  
    this.pages = this.getArrayOfPage(pageCount);  
    // console.log('this.pages: ', this.pages);
    this.activePage = 0;  
    this.onPageChange.emit(this.activePage);  
  }  

  private  getPageCount(): number {  
    let totalPage = 0;  
    // console.log('totalPage: ', totalPage);

    // console.log('this.totalRecords: ', this.totalRecords);
    // console.log('this.recordsPerPage: ', this.recordsPerPage);
    if (this.totalRecords > 0 && this.recordsPerPage > 0) {  
      const pageCount = this.totalRecords / this.recordsPerPage;  
      const roundedPageCount = Math.floor(pageCount);  
      totalPage = roundedPageCount < pageCount ? roundedPageCount +  0 : roundedPageCount;  
     
    }  

    return totalPage;  
  }  

  private getArrayOfPage(pageCount: number): number [] {  
  // console.log('pageCount: ', pageCount);
    const pageArray = [];  

    if (pageCount > 0) {  
        for(let i = 1 ; i <= pageCount ; i++) {  
          pageArray.push(i);  
        }  
    }  

    return pageArray;  
  }  

  onClickPage(pageNumber: number): void { 
    
      if (pageNumber >= 0 && pageNumber <= this.pages.length) {  
          this.activePage = pageNumber;  
          this.onPageChange.emit(this.activePage);  
      }  
  }  
}  