export class AddClub {
  clubName?: string;
  clubDescription?: string;
  country?: string;

  public constructor(inti?: Partial<AddClub>) {
    Object.assign(this, inti);
  }
}
