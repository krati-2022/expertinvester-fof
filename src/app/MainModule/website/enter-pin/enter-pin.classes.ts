export class Login {
  mobileno!: string;
  password!: string;
  public constructor(init?: Partial<Login>) {
    Object.assign(this, init);
  }
}
