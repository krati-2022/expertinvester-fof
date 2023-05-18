export class AdminLogin {
  emailId?: string;
  password?: string;
  public constructor(init?: Partial<AdminLogin>) {
    Object.assign(this, init);
  }
}