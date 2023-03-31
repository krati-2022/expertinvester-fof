import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CoreHelperService } from 'src/app/providers/core-helper/core-helper.service';
import { SharedService } from 'src/app/Service/shared.service';
import { ExpertInvestorManagementDetails } from './expert-and-investor.classes';
declare var $ : any

interface Country {
  id: string;
  countryName: string;
}
interface IdeaOn {
  countryname: string;
  ideaOn: string;
}
@Component({
  selector: 'app-expert-and-investor',
  templateUrl: './expert-and-investor.component.html',
  styleUrls: ['./expert-and-investor.component.css']
})
export class ExpertAndInvestorComponent implements OnInit {

  AddExpertInvestorForm: FormGroup | any
  country:Array<any> = []
  usertype = sessionStorage.getItem('usertype')
  ideaOn: Array<IdeaOn> = [];
  ideaOnlist: Array<any> = [];
  submitted: boolean = false
  submitPhone: boolean = false;
  constructor(private router: Router, private _service: SharedService, private _fb: FormBuilder, private coreHelperService: CoreHelperService) { }

  ngOnInit(): void {
    
    this.AddExpertInvestorForm = this._fb.group({
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
      IsSEBI: [true, Validators.required],
      SEBIRegNo: ['', Validators.required],
      file : ['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'],
      filetype : ['jpeg'],
      experience: ['', Validators.required],
      knowledgelevel: ['', Validators.required],
      accountname: ['', Validators.required],
      accountnumber: ['', Validators.required],
      bankname: ['', Validators.required],
      bankIFSCcode: ['', Validators.required],
      country: ['', Validators.required],
      ideaOn: [],
      ideaOnlist: this._fb.array([]),
    })

    this._service.GetCountry().subscribe(response => {
      this.country = response.data
    })
  }

  get ExpertInvestorControl() { return this.AddExpertInvestorForm.controls; }
  goToHomePage(){
    this.router.navigate(['home'])
  }

  getCountry(event: string) {
    this._service.GetIdeaonlist(event).subscribe((response) => {
      this.ideaOn = response.data;
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
    this.AddExpertInvestorForm.value.ideaOnlist = this.ideaOnlist;
    // console.log('this.AddExpertInvestorForm.value.ideaOnlist: ', this.AddExpertInvestorForm.getRawValue().ideaOnlist);
    // this.AddExpertInvestorForm.getRawValue() as InvestorManagementDetails
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
  onSubmit(){
    console.log(this.AddExpertInvestorForm.value);
    
    this.submitted  = true
    this.submitPhone = true;
    if(this.AddExpertInvestorForm.invalid){
      return
    }
    let formData = {
      mobileno: this.AddExpertInvestorForm.value.mobileno,
      name: this.AddExpertInvestorForm.value.name,
      usertype: this.AddExpertInvestorForm.value.usertype,
      aboutus: this.AddExpertInvestorForm.value.aboutus,
      email: this.AddExpertInvestorForm.value.email,
      experttype: this.AddExpertInvestorForm.value.experttype,
      isSEBI: this.AddExpertInvestorForm.value.IsSEBI,
      sebiRegNo: this.AddExpertInvestorForm.value.SEBIRegNo,
      experience: this.AddExpertInvestorForm.value.experience,
      knowledgelevel: this.AddExpertInvestorForm.value.knowledgelevel,
      ideaOnlist: this.AddExpertInvestorForm.value.ideaOnlist,
      accountname: this.AddExpertInvestorForm.value.accountname,
      accountnumber: this.AddExpertInvestorForm.value.accountnumber,
      bankname: this.AddExpertInvestorForm.value.bankname,
      bankIFSCcode: this.AddExpertInvestorForm.value.bankIFSCcode,
      file: this.AddExpertInvestorForm.value.file,
      filetype: this.AddExpertInvestorForm.value.filetype,
    }
    // console.log('formData: ', formData);
    this._service.AddExpertInvestor(formData).subscribe(response =>{
    // console.log('response: ', response);
    this.AddExpertInvestorForm.reset()
    this.submitted = false
    this.submitPhone = false
    sessionStorage.removeItem('usertype')
    this.router.navigate(['home']);
    })
  }

}
