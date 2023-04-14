export class SendOtpForRecoverPin {
    mobile_No!: string;
    public constructor(init?: Partial<SendOtpForRecoverPin>) {
        Object.assign(this, init);
    }
}

export class VerifyOtpForRecovery {
    mobileno! : string;
    otp : string | undefined;
    public constructor(init?: Partial<VerifyOtpForRecovery>) {
        Object.assign(this, init);
    }
}

export class UserIsExist{
    Mobile_No!: string
    public constructor(init?: Partial<UserIsExist>){
        Object.assign(this, init)
    }
}

