import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CoreHelperService } from 'src/app/providers/core-helper/core-helper.service';
import { SharedService } from 'src/app/Service/shared.service';
import Swal from 'sweetalert2';
import { ExpertManagementDetails } from './expert.classes';

@Component({
  selector: 'app-expert',
  templateUrl: './expert.component.html',
  styleUrls: ['./expert.component.css'],
})
export class ExpertComponent implements OnInit {
  AddExpertForm: FormGroup | any;
  formData = new FormData();
  submitted: boolean = false;
  submitPhone: boolean = false;
  imageSrc: string = '';

  ExpertDetails = new ExpertManagementDetails();
  country: Array<any> = [];
  file: File[] | any;
  url: any;
  usertype = sessionStorage.getItem('usertype');
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private coreHelperService: CoreHelperService,
    private _service: SharedService
  ) {}

  ngOnInit(): void {
    this.AddExpertForm = this.formBuilder.group({
      name: [
        '',
        Validators.compose([
          Validators.required,
          this.coreHelperService.getNameValidation(),
        ]),
      ],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      mobileno: [
        '',
        Validators.compose([Validators.maxLength(20), Validators.required]),
      ],
      usertype: [this.usertype, Validators.required],
      aboutus: ['', Validators.required],
      experttype: ['', Validators.required],
      IsSEBI: ['', Validators.required],
      SEBIRegNo: [''],
      certificateURL: [],
      experience: ['', Validators.required],
      knowledgelevel: ['', Validators.required],
      accountname: ['', Validators.required],
      accountnumber: ['', Validators.required],
      bankname: ['', Validators.required],
      bankIFSCcode: ['', Validators.required],
    });
    this._service.GetCountry().subscribe((response) => {
      this.country = response.data;
      // console.log('this.country: ', this.country);
    });
  }

  get ExpertControl() {
    return this.AddExpertForm.controls;
  }

  omit_special_char(event: any) {
    var k;
    k = event.charCode;
    return (
      (k > 64 && k < 91) ||
      (k > 96 && k < 123) ||
      k == 8 ||
      k == 32 ||
      (k >= 48 && k <= 57)
    );
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

  // goToHomePage() {
  //   this.router.navigate(['home/expertList']);
  // }

  onSelectFile(event: any) {
    // console.log('event: ', event);
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      // reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = () => {
        let ext = event.target.files[0].name.split('.').pop().toLowerCase();
        let accpt = ['pdf'];
        if (accpt.includes(ext)) {
        
          this.formData.append('FilePath', file, file.name);
          this.imageSrc = reader.result as string;
        }
      
      };
      // let formData = new FormData();
      // formData.set('file', this.file);
      
      
    }
  }

  onSubmit() {
    // this.ExpertDetails = this.AddExpertForm.getRawValue() as ExpertManagementDetails;
    // console.log('this.ExpertDetails: ', this.ExpertDetails);
    // return
    this.submitted = true;
    this.submitPhone = true;
    if (this.AddExpertForm.invalid) {
      return;
    }

    
    // let name = this.AddExpertForm.value.name
    // let email = this.AddExpertForm.value.email
    // let mobileno = this.AddExpertForm.value.mobileno
    // let usertype = this.AddExpertForm.value.usertype
    // let aboutus = this.AddExpertForm.value.aboutus
    // let experttype = this.AddExpertForm.value.experttype
    // let IsSEBI = this.AddExpertForm.value.IsSEBI
    // let SEBIRegNo = this.AddExpertForm.value.SEBIRegNo
    // let experience = this.AddExpertForm.value.name
    // let knowledgelevel = this.AddExpertForm.value.knowledgelevel
    // let accountname = this.AddExpertForm.value.accountname
    // let accountnumber = this.AddExpertForm.value.accountnumber
    // let bankname = this.AddExpertForm.value.bankname
    // let bankIFSCcode = this.AddExpertForm.value.bankIFSCcode
    
    // this.formData.append('name', this.AddExpertForm.value.name)
    // this.formData.append('email', this.AddExpertForm.value.email)
    // this.formData.append('mobileno', this.AddExpertForm.value.mobileno)
    // this.formData.append('usertype',this.AddExpertForm.value.usertype)
    // this.formData.append('aboutus',this.AddExpertForm.value.aboutus)
    // this.formData.append('experttype',this.AddExpertForm.value.experttype)
    // this.formData.append('IsSEBI',this.AddExpertForm.value.IsSEBI)
    // this.formData.append('SEBIRegNo',this.AddExpertForm.value.SEBIRegNo)
    // this.formData.append('experience',this.AddExpertForm.value.experience)
    // this.formData.append('knowledgelevel',this.AddExpertForm.value.knowledgelevel)
    // this.formData.append('accountname',this.AddExpertForm.value.accountname)
    // this.formData.append('accountnumber',this.AddExpertForm.value.accountnumber)
    // this.formData.append('bankname',this.AddExpertForm.value.bankname)
    // this.formData.append('bankIFSCcode',this.AddExpertForm.value.bankIFSCcode)
    // this.formData.append('certificateURL', this.imageSrc);

    // this.formData = new ExpertManagementDetails
    // let modelDetail = new ExpertManagementDetails
    // modelDetail.certificateURL = this.imageSrc
    // modelDetail.name = name
    // modelDetail.email = email
    // modelDetail.mobileno = mobileno
    // modelDetail.usertype = usertype
    // modelDetail.aboutus = aboutus
    // modelDetail.experttype = experttype
    // modelDetail.IsSEBI = IsSEBI
    // modelDetail.SEBIRegNo = SEBIRegNo
    // modelDetail.experience = experience
    // modelDetail.knowledgelevel = knowledgelevel
    // modelDetail.accountname = accountname
    // modelDetail.accountnumber = accountnumber
    // modelDetail.bankname = bankname
    // modelDetail.bankIFSCcode = bankIFSCcode
    // console.log('modelDetail.certificateURL: ', modelDetail);
    this.ExpertDetails = this.AddExpertForm.getRawValue() as ExpertManagementDetails;
    // console.log('this.ExpertDetails: ', this.ExpertDetails);
    // return
    this._service.AddExpert(this.ExpertDetails).subscribe(
      (response) => {
        console.log('response: ', response);
        debugger
        this.AddExpertForm.reset();
        this.submitted = false;
        this.submitPhone = false;
        sessionStorage.removeItem('usertype');
        this.router.navigate(['home/expertList']);
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
