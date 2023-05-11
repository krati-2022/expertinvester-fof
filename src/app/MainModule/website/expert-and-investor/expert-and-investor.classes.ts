export class ExpertInvestorManagementDetails {
  mobileno: string = '';
  name: string = '';
  usertype: string = '';
  aboutus: string = '';
  email: string = '';
  experttype: string = '';
  experience: string = '';
  knowledgelevel: string = '';
  ideaOnlist: any;
  isSEBI: any;
  sebiRegNo: any;
  file: string = '';
  filetype: string = '';
  accountname: string = '';
  accountnumber: string = '';
  bankname: string = '';
  bankIFSCcode: string = '';
  public constructor(init?: Partial<ExpertInvestorManagementDetails>) {
    Object.assign(this, init);
  }
}
