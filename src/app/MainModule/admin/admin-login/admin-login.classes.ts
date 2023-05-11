export class AdminLogin{
    emial?: string;
    password?: string;
    public constructor(init ?: Partial<AdminLogin>){
        Object.assign(this, init)
    }
}