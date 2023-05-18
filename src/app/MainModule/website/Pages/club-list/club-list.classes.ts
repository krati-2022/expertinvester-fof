export class FollowClub{
    clublistId?: string;
    mobileno? : string;

    public constructor(inti?: Partial<FollowClub>){
        Object.assign(this, inti)
    }
}