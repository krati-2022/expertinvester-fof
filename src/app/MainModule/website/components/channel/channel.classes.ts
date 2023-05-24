export class ChannelSubscriber {
  channelId!: string;
  subscriber!: boolean;
  mobile_No!: string;
  constructor(init?: Partial<ChannelSubscriber>) {
    Object.assign(this, init);
  }
}
export class ChannelApproveReject {
  channelMasterId!: string;
  expertId!: string;
  approve!: boolean;
  reject!: boolean;
  constructor(init?: Partial<ChannelApproveReject>) {
    Object.assign(this, init);
  }
}

export class ChannelLike {
  channelId!: string;
  mobileno!: string;
  like!: boolean;
  public constructor(init?: Partial<ChannelLike>) {
    Object.assign(this, init);
  }
}
export const DATA = [
  { name: 'Expert', checked: false },
  { name: 'Investor', checked: false },
  { name: 'ExpertAndInvester', checked: false },
  { name: 'Free Access', checked: false },
  { name: 'Paid Access', checked: false },
];

  export const FeedDATA = [
    { name: 'Expert', checked: false },
    { name: 'Investor', checked: false },
    { name: 'ExpertAndInvester', checked: false },
    { name: 'Club', checked: false },
    { name: 'Channel', checked: false },
  ];