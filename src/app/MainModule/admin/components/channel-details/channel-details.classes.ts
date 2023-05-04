export class IdeaTracker {
  channelPostId?: string;
  mobile_No?: string;
  istargetprice?: boolean;
  isstoploss?: boolean;
  public constructor(init?: Partial<IdeaTracker>){
    Object.assign(this, init)
  }
}