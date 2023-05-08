export class ContactUs {
  email?: string;
  description?: string;
  firstName?: string;
  lastName?: string;
  mobileNumber?: string;

  public constructor(init?: Partial<ContactUs>){
    Object.assign(this ,init);
  }
}
