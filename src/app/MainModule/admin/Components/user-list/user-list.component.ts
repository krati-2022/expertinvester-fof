import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../../admin.service';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  userList = new Array<any>();
  isLoading: boolean = false;
  isReload: boolean = false;
  isShowContent: boolean = false;
  contentId: any;
  isTableHasData: boolean = false;
  pageSizeOptions: number[] = [10];
  displayedColumns: string[] = [
    'NAME',
    'User Type',
    'Mobile',
    'Email',
    'Country',
    'Experience',
    'Bank',
    'Account Number',
    'IFSC Code',
    'About Us',
    'Status',
    'Options',
  ];
  public dataSource = new MatTableDataSource<any>();
  @ViewChild('paginator') paginator: MatPaginator | any;

  constructor(private _service: AdminService) {}

  ngOnInit(): void {
    this.GetUsersList();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  GetUsersList() {
    if (this.isReload == true) {
      this.isLoading = false;
    } else {
      this.isLoading = true;
    }
    this._service.GetUserList().subscribe((res) => {
      // console.log('res: ', res);
      this.userList = res.data as Array<any>;
      this.dataSource.data = this.userList;
      this.isTableHasData = this.userList.length != 0;
      this.isLoading = false;
    });
  }


  onChange(userId: string, status: boolean) {
  
    if(status === null){
      status = false;
    }
    // console.log(status);
    // return
    this.isReload = true;
    switch (status) {
      case false:
        this._service.ActiveUser(userId).subscribe((res: any) => {
          // console.log('res: ', res);
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: 'success',
            title: 'User Activaed',
          });
          this.GetUsersList();
        });
        break;
      case true:
        this._service.DeActiveUser(userId).subscribe((res: any) => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: 'success',
            title: 'User De-Activaed',
          });
          this.GetUsersList();
        });
        break;
    }
  }

  showContent(id: any) {
    this.contentId = id;
    this.isShowContent = !this.isShowContent;
  }
}
