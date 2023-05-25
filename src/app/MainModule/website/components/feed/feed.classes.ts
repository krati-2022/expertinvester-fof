export interface GetFeedDetails {
    clubName: string;
    clublistId: string;
    description: string;
    email: string;
    entryprice: string;
    experttype: string;
    externallink: string;
    id: string;
    imagename: string;
    imageurl: string;
    interval: string;
    isUserLiked: boolean;
    isstoploss: boolean;
    istargetprice: boolean;
    likeCount: number;
    mobile_No: string;
    recordType: string;
    sebi: string;
    stockname: string;
    stoploss: string;
    targetprice: string;
    tradetype: string;
    username: string;
    usertype: string;
  }

  export const DATA =[
    { name: 'Expert', checked: false },
    { name: 'Investor', checked: false },
    { name: 'ExpertAndInvester', checked: false },
    // { name: 'Club', checked: false },
    // { name: 'Channel', checked: false },
  ]

  export const ChannelDATA = [
    { name: 'Expert', checked: false },
    { name: 'Investor', checked: false },
    { name: 'ExpertAndInvester', checked: false },
    // { name: 'Free Access', checked: false },
    // { name: 'Paid Access', checked: false },
  ];