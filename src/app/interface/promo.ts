export interface PromoPayload{
    promo:string,
    discount:number,
    startDate:Date,
    status:"ACTIVE" | "INACTIVE" | "EXPIRED",
    expireDate:Date
}