export class SendOtp {
    mobile_No!: string;
    public constructor(init?: Partial<SendOtp>) {
        Object.assign(this, init);
    }
}

export class VerifyOtp {
    mobileno! : string;
    otp : string | undefined;
    public constructor(init?: Partial<VerifyOtp>) {
        Object.assign(this, init);
    }
}

export class UserIsExist{
    Mobile_No!: string
    public constructor(init?: Partial<UserIsExist>){
        Object.assign(this, init)
    }
}

