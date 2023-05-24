import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../admin.service';
import Swal from 'sweetalert2';
declare var $ : any
@Component({
  selector: 'app-club-list',
  templateUrl: './club-list.component.html',
  styleUrls: ['./club-list.component.css'],
})
export class ClubListComponent implements OnInit {
  clubList: any;
  isLoading: boolean = false;
  isReload: boolean = false;
  constructor(private router: Router, private _service: AdminService) {}

  ngOnInit(): void {
    this.GetClubList();
  }

  addClub() {
    this.router.navigate(['admin/home/add-club']);
  }

  GetClubList() {
    // console.log('this.isReload: ', this.isReload);
    if (this.isReload == true){
      this.isLoading = false;
    }else {
      this.isLoading = true
    }
      
    this._service.GetClubList().subscribe((res) => {
      this.clubList = res.data;
      this.isLoading = false;
      // console.log('this.clubList: ', this.clubList);
    });
  }

  onChange(clubId: string, status: boolean) {
    this.isReload = true;
    switch (status) {
      case false:
        this._service.ActiveClub(clubId).subscribe((res: any) => {
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
            title: 'Club Activaed',
          });
          this.GetClubList();
        });
        break;
      case true:
        this._service.DeActiveClub(clubId).subscribe((res: any) => {
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
            title: 'Club De-Activaed',
          });
          this.GetClubList();
        });
        break;
    }
  }
  Edit(id: any) {
    this.router.navigate(['admin/home/edit-club/' + id]);
  }
}
