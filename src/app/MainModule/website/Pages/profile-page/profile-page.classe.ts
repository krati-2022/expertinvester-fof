export class UpdateProfileDetails {
  mobileno?: string;
  name?: string;
  aboutus?: string;
  email?: string;
  instagramUrl?: string;
  faceBookUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string
  public constructor(init?: Partial<UpdateProfileDetails>) {
    Object.assign(this, init);
  }
}