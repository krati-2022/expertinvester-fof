export class SendOtp {
    mobile_No : number | undefined;
    public constructor(init?: Partial<SendOtp>) {
        Object.assign(this, init);
    }
}

export class VerifyOtp {
    mobileno : number | undefined;
    otp : string | undefined;
    public constructor(init?: Partial<VerifyOtp>) {
        Object.assign(this, init);
    }
}

