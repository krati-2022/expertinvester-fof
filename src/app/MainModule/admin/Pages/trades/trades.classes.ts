export class AddPostDetails {
  Mobile_No: string = '';
  channelId: string = '';
  interval: string = '';
  entryprice: string = '';
  targetprice: string = '';
  stoploss: any;
  externallink: string = '';
  imageurl: any;
  description: string = '';
  tradetype: string = '';
  stockname: string = '';
  public constructor(init?: Partial<AddPostDetails>) {
    Object.assign(this, init);
  }
}
