export class AddSettings{
    externalLink ?: string
    public constructor(init?: Partial<AddSettings>){
        Object.assign(this, init)
    }
}