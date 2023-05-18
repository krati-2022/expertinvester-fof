import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Service/shared.service';
import Swal from 'sweetalert2';
import { InvestorManagementDetails } from './investor.classes';
declare var $: any;

interface Country {
  id: string;
  countryName: string;
}
interface IdeaOn {
  countryname: string;
  ideaOn: string;
}

@Component({
  selector: 'app-investor',
  templateUrl: './investor.component.html',
  styleUrls: ['./investor.component.css'],
})
export class InvestorComponent implements OnInit {
  AddInvestorForm: FormGroup | any;
  submitted: boolean = false;
  submitPhone: boolean = false;
  InvestorDetails = new InvestorManagementDetails();
  usertype = sessionStorage.getItem('usertype');
  ismobileNumberExist = localStorage.getItem('mobile_number')
  country: Array<Country> = [];
  ideaOn: Array<IdeaOn> = [];
  ideaOnlist: Array<any> = [];
  isChecked: boolean = false;
  message: string = ''
  experience = ['1 Year', '2 Year', '3 Year', '4 Year', '5 Year']
  knowledgeLevel = ['Beginner', 'Intermediate', 'Professional']
  isData :any
  isLoading:boolean = false
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private _service: SharedService
  ) {}

  ngOnInit(): void {
    if(!this.ismobileNumberExist){
      this.router.navigate([''])
     }
    this.AddInvestorForm = this.formBuilder.group({
      mobileno: [this.ismobileNumberExist, Validators.required],
      name: ['', Validators.required],
      ideaOn: [],
      usertype: [this.usertype, Validators.required],
      aboutus: ['', Validators.required],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      experttype: ['', Validators.required],
      experience: ['', Validators.required],
      knowledgelevel: ['', Validators.required],
      ideaOnlist: this.formBuilder.array([]),
    });

    this._service.GetCountry().subscribe((response) => {
      this.country = response.data;
      // console.log('this.country: ', this.country);
    });
  }

  get InvestorControl() {
    return this.AddInvestorForm.controls;
  }

  // goToHomePage() {
  //   this.router.navigate(['home']);
  // }

  getCountry(event: string) {
    this._service.GetIdeaonlist(event).subscribe((response) => {
      this.ideaOn = response.data;
      this.isData = this.ideaOn
      // console.log('this.isData: ', this.isData);
    });
  }

  getIdeaOn(data: any, item: object, name: any) {
    if (data == true) {
      this.ideaOnlist.push(item);
    } else {
      let removeIndexValue = -1;
      for (let i = 0; i < this.ideaOnlist.length; i++) {
        if (name == this.ideaOnlist[i].ideaOn) {
          removeIndexValue = i;
          break;
        }
      }
      this.ideaOnlist.splice(removeIndexValue, 1);
    }
    this.AddInvestorForm.value.ideaOnlist = this.ideaOnlist;
    // console.log('this.AddInvestorForm.value.ideaOnlist: ', this.AddInvestorForm.getRawValue().ideaOnlist);
    // this.AddInvestorForm.getRawValue() as InvestorManagementDetails
  }

  // SaveChanges() {
  //   (<any>$('#exampleModalCenter').modal('hide'));
  // }

  openPopUp() {
    <any>$('#exampleModalCenter').modal('show');
  }
  closePopUp() {
    <any>$('#exampleModalCenter').modal('hide');
  }

  keyPressNumbers(event: any) {
    var charCode = event.which ? event.which : event.keyCode;
    // Only Numbers 0-9
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  onSubmit() {
    this.submitted = true;
    this.submitPhone = true;
    if (this.AddInvestorForm.invalid) {
      return;
    }
   
    let formData = {
      mobileno: this.AddInvestorForm.value.mobileno,
      name: this.AddInvestorForm.value.name,
      usertype: this.AddInvestorForm.value.usertype,
      aboutus: this.AddInvestorForm.value.aboutus,
      email: this.AddInvestorForm.value.email,
      experttype: this.AddInvestorForm.value.experttype,
      experience: this.AddInvestorForm.value.experience,
      knowledgelevel: this.AddInvestorForm.value.knowledgelevel,
      ideaOnlist: this.AddInvestorForm.value.ideaOnlist,
    };
    // console.log('formData: ', formData);
    // console.log('formData: ', formData);
    // return
    // return;
    this.isLoading = true
    this._service.AddInvestor(formData).subscribe(
      (response) => {
        console.log(response);
        this.AddInvestorForm.reset();
        this.submitted = false;
        this.submitPhone = false;
        this.isLoading = false
        sessionStorage.removeItem('usertype');
        this.router.navigate(['club-list']);
      },
      (error) => {
        if (error.status == '400') {
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
            title: 'Something went wrong please try again',
          });
        }
      }
    );
  }
}
