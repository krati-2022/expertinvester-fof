export class InvestorManagementDetails {
  mobileno: string = '';
  name: string = '';
  usertype: string = '';
  aboutus: string = '';
  email: string = '';
  experttype: string = '';
  experience: string = '';
  knowledgelevel: string = '';
  ideaOnlist: any;
  public constructor(init?:Partial<InvestorManagementDetails>){
    Object.assign(this, init)
  }
}
