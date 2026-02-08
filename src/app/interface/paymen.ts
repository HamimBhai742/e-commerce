export interface IPayment{
    sub_total:number
    status:PaymentStatus
}

export enum PaymentStatus{
    PENDING="PENDING",
    PAID="PAID",
    FAILED="FAILED",
    CANCELLED="CANCELLED",
    REFUNEDE="REFUNEDE"
}