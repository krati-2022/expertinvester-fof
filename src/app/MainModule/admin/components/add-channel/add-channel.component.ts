import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { SharedService } from 'src/app/Service/shared.service';
import Swal from 'sweetalert2';
declare var $: any;
export interface benefits {
  benefits: string;
}

export interface ExpertList {
  id: string;
  mobileno: string;
  name: string;
  userType: string;
  aboutUs: string;
  email: string;
  expertType: string;
  isSEBI: boolean;
  isSelected: boolean;
  sebiRegNo: string;
  certificateURL: string;
  certificatefilename: string;
  experience: string;
  knowledgeLevel: string;
  accountname: string;
  accountnumber: string;
  bankname: string;
  bankIFSCcode: string;
  followersCount: number;
  likecount: number;
  post: number;
  reputation: number;
}
@Component({
  selector: 'app-add-channel',
  templateUrl: './add-channel.component.html',
  styleUrls: ['./add-channel.component.css'],
})
export class AddChannelComponent implements OnInit {
  mobileNumber = localStorage.getItem('mobile_number') || '';
  AddChannelFrom: FormGroup | any;
  ideaOn = ['Nifty', 'Bank Nifty', 'Stock F & O'];
  fee_subscription = ['Free Access', 'Paid Access'];
  isSEBIReg = ['Led By SEBI Reg', 'Led By SEBI Reg'];
  benefits: any = [];
  ideaOnlist: any = [];
  fileName: string = '';
  base64: string = '';
  submitted: boolean = false;
  isLoading: boolean = false;
  formData: any;
  expertList: ExpertList[] = [];
  coAdList: any = [];
  myForm: FormGroup | any;
  idealMessage: string = '';
  benefitMessage: string = '';
  message: string = '';
  maxFileSize: number = 200 * 1024;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '5rem',
    minHeight: '5rem',
    translate: 'no',
    rawPaste: false,
    showToolbar: false,
    
  };
  constructor(
    private router: Router,
    private _service: SharedService,
    private fb: FormBuilder,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.AddChannelFrom = new FormGroup({
      mobile_No: new FormControl(this.mobileNumber),
      name: new FormControl('', Validators.required),
      subscription: new FormControl(''),
      coAdChannel: new FormControl(false),
      description: new FormControl('', Validators.required),
      imageurl: new FormControl(''),
      ideaOn: new FormControl(false),
      addBenefits: new FormControl(''),
      idealfor: new FormControl(''),
      benefits: new FormControl(''),
      coAdList: new FormControl(''),
    });
    this.myForm = new FormGroup({
      adOn: new FormControl(false),
    });
    this.getExpertList();
  }

  goBack() {
    this.location.back();
  }

  get AddChannelControl() {
    return this.AddChannelFrom.controls;
  }

  getExpertList() {
    let mobile_number = '';
    var splitString = this.mobileNumber.split('');
    if (splitString[0] == '+') {
      splitString[0] = '%2B';
      var joinString = splitString.join('');
      mobile_number = joinString;
    }
    this._service.GetExpertList(mobile_number).subscribe((res) => {
      this.expertList = res.data;

      this.expertList.map((i: any) => {
        i.isSelected = false;
      });
      // console.log('this.expertList: ', this.expertList);
    });
  }

  removeCoAdList(id: string) {
    this.coAdList
      .filter((i: any) => i.expertId == id)
      .forEach((x: any) => this.coAdList.splice(this.coAdList.indexOf(x), 1));
  }

  onChange(event: any) {
    // console.log('event: ', event.target.id);
    if (event.target.id == 'gridRadios2') {
      this.router.navigate(['home/upgrade-plan']);
    }
  }

  getIdeaFor(status: boolean, item: string) {
    if (status == true) {
      this.ideaOnlist.push({ idealfor: item });
      // console.log('this.ideaOnlist: ', this.ideaOnlist);
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
  }

  coAddChannel(event: any) {
    if (!event == true) {
      (<any>$('.bd-example-modal-lg')).modal('show');
    } else if (!event == false) {
      // console.log('this.coAdList: ', this.expertList);
      this.expertList.map((i: any) => {
        if (i.isSelected == true) {
          i.isSelected = false;
        }
      });
      // return
      this.coAdList.splice(0, this.coAdList.length);

      // this.coAdList = [
      //   {
      //     "expertId": '00000000-0000-0000-0000-000000000000',
      //   },
      // ];
      // console.log(this.coAdList);
    }
  }

  goToExpertProfilePage(data: any, status: boolean) {
    if (data.isSelected == false) {
      data.isSelected = true;
    } else {
      data.isSelected = false;
    }
    // console.log('data: ', data);
    if (status == true) {
      if (data.isSEBI == false) {
        this.expertList = this.expertList.filter((i: any) => i.isSEBI == true);
      }
      this.coAdList.push({
        expertId: data.id,
        name: data.name,
        isSEBI: data.isSEBI,
      });
    } else {
      if (status == false && data.isSEBI == false) {
        this.getExpertList();
      }

      this.coAdList
        .filter((i: any) => i.expertId == data.id)
        .forEach((x: any) => this.coAdList.splice(this.coAdList.indexOf(x), 1));
      // console.log('this.coAdList: ', this.coAdList);
    }
    // console.log('this.coAdList: ', this.coAdList);
  }

  close() {
    (<any>$('.bd-example-modal-lg')).modal('hide');
  }

  addBenefits(data: string) {
    console.log('data: ', data);
    if (this.benefits.length >= 4) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,

        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: 'warning',
        title: 'You can add 4 benifis only',
        background: 'red',
        color: 'white',
        iconColor: 'white',
      });
      return;
    }

    if (data == '' || data == null) {
      return;
    }
    this.benefits.push({ id: this.benefits.length, benefits: data });
    this.AddChannelFrom.get('addBenefits')?.reset();
    // this.AddChannelFrom.value.benefits =  this.benefits
    // console.log('this.AddChannelFrom.value.benefits: ', this.AddChannelFrom.value.benefits);
  }

  remove(id: string) {
    this.benefits
      .filter((i: any) => i.id == id)
      .forEach((x: any) => this.benefits.splice(this.benefits.indexOf(x), 1));
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      if (file.size > this.maxFileSize) {
        // alert('');
        const Toast = Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,

          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: 'warning',
          title: 'File size exceeds the limit of 200kb',
        });
        return;
      }
      reader.onload = () => {
        let ext = event.target.files[0].name.split('.').pop().toLowerCase();
        this.fileName = event.target.files[0].name;
        // let accept = ['png', 'jpeg', 'jpg', 'pdf'];
        // if (accept.includes(ext)) {
        //   this.base64 = reader.result as string;
        //   console.log('this.base64: ', this.base64);
        // }
        this.base64 = reader.result as string;
      };
    }
  }

  onSubmit() {
    // this.AddChannelFrom.value.imageurl = this.base64;
    this.submitted = true;
    if (this.AddChannelFrom.invalid) {
      return;
    }
    if (this.AddChannelFrom.value.coAdChannel == false) {
      this.coAdList = [
        {
          expertId: '00000000-0000-0000-0000-000000000000',
        },
      ];
    }
    this.AddChannelFrom.value.idealfor = this.ideaOnlist;
    this.benefits.map((i: any) => {
      delete i.id;
    });
    this.AddChannelFrom.value.benefits = this.benefits;

    // console.log('this.AddChannelFrom.value.benefits: ', this.AddChannelFrom.value.benefits);
    // return
    this.AddChannelFrom.value.coAdList = this.coAdList;
    if (this.AddChannelFrom.value.idealfor.length == 0) {
      this.idealMessage = 'Select at least one';
      return;
    }
    // console.log('this.AddChannelFrom.value.benefits.length: ', this.AddChannelFrom.value.benefits.length);
    if (this.AddChannelFrom.value.benefits.length == 0) {
      this.benefitMessage = 'Add at least one';
      return;
    }

    var splitString = this.base64.split('data:image/jpeg;base64,');
    // console.log('splitString: ', splitString);
    this.formData = {
      mobile_No: this.AddChannelFrom.value.mobile_No,
      name: this.AddChannelFrom.value.name,
      idealfor: this.AddChannelFrom.value.idealfor,
      benefits: this.AddChannelFrom.value.benefits,
      subscription: this.AddChannelFrom.value.subscription,
      coAdChannel: this.AddChannelFrom.value.coAdChannel,
      description: this.AddChannelFrom.value.description,
      imageurl: splitString[1],
      coAdList: this.AddChannelFrom.value.coAdList,
    };
    // console.log('formData: ', this.formData);
    // return
    this.isLoading = true;
    this._service.AddChannel(this.formData).subscribe((res) => {
      // console.log('res: ', res);
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-right',
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
        title: 'Channel Added Successfully',
      });
      this.isLoading = false;
      this.router.navigate(['home/channel']);
    });
  }
}
