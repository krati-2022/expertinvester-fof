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
  ismobileNumberExist = localStorage.getItem('mobile_number')
  ideaOn: Array<IdeaOn> = [];
  ideaOnlist: Array<any> = [];
  submitted: boolean = false
  submitPhone: boolean = false;
  imageSrc: string = ''
  extention: string = ''
  fileName: string = ''
  experience = ['1 Year', '2 Year', '3 Year', '4 Year', '5 Year']
  knowledgeLevel = ['Beginner', 'Intermediate', 'Professional']
  constructor(private router: Router, private _service: SharedService, private _fb: FormBuilder, private coreHelperService: CoreHelperService) { }

  ngOnInit(): void {
    if(!this.ismobileNumberExist){
      this.router.navigate([''])
     }
    this.AddExpertInvestorForm = this._fb.group({
      name: [
        '',
        Validators.compose([
          Validators.required,
          this.coreHelperService.getNameValidation(),
        ]),
      ],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      mobileno: [this.ismobileNumberExist,Validators.required],
      usertype: [this.usertype, Validators.required],
      aboutus: ['', Validators.required],
      experttype: ['', Validators.required],
      IsSEBI: ['', Validators.required],
      SEBIRegNo: [''],
      file : [''],
      filetype : [''],
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

  onSelectFile(event: any) {

    // console.log('event: ', event);
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      // reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = () => {
        let ext = event.target.files[0].name.split('.').pop().toLowerCase();
        this.fileName = event.target.files[0].name;
        let accpt = ['pdf'];
        if (accpt.includes(ext)) {
          this.imageSrc = reader.result as string;
          // console.log('this.imageSrc: ', this.imageSrc);
          
        }

      };
   

    }
  }

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
    
    
    this.submitted  = true
    this.submitPhone = true;
    if(this.AddExpertInvestorForm.invalid){
        return
      }
    const splitString = this.imageSrc.split('data:application/pdf;base64,')
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
      file: splitString[1],
      filetype: this.extention,
    }
    // console.log('formData: ', formData);
    // return
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
