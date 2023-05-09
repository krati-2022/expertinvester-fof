export class UpdateProfileDetails {
  mobileno?: string;
  name?: string;
  aboutus?: string;
  email?: string;
  public constructor(init?: Partial<UpdateProfileDetails>){
    Object.assign(this, init)
  }
}