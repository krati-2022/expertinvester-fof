export class EditClub {
  id?: string;
  name?: string;
  description?: string;
  country?: string;

  public constructor(inti?: Partial<EditClub>) {
    Object.assign(this, inti);
  }
}
