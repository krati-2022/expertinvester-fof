export class AddTrade {
    Mobile_No ?: string
    ClublistId ?: string
    externallink ?: string
    description ?: string
    imageurl : any
    constructor(init?: Partial<AddTrade>){
        Object.assign(this, init)
    }
}