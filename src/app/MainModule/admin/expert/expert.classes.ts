export class ExpertManagementDetails {
  mobileno: string = '';
  name: string = '';
  usertype: string = '';
  aboutus: string = '';
  email: string = '';
  IsSEBI: any;
  SEBIRegNo: string = '';
  certificateURL: any;
  experience: string = '';
  knowledgelevel: string = '';
  accountname: string = '';
  accountnumber: string = '';
  bankname: string = '';
  bankIFSCcode: string = '';
  experttype: string = '';
  public constructor(init?: Partial<ExpertManagementDetails>) {
    Object.assign(this, init);
  }
}
