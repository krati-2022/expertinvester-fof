export class SetPin{
    mobileno!: string;
    password!: string;

    public constructor(init?:Partial<SetPin>){
        Object.assign(this, init)
    }   
}