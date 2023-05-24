import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  userList: any;
  isLoading: boolean = false;
  isReload: boolean = false;
  constructor(private _service: AdminService) {}

  ngOnInit(): void {
    this.GetUsersList();
  }

  GetUsersList() {
    if(this.isReload == true){
      this.isLoading = false;
    }else{
      this.isLoading = true;
    }
    this._service.GetUserList().subscribe((res) => {
      console.log('res: ', res);
      this.userList = res.data;
      this.isLoading = false;
    });
  }

  onChange(userId: string, status: boolean) {
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
}
