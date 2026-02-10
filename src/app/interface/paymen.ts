export interface IPayment{
    sub_total:number
    status:PaymentStatus
}

export enum PaymentStatus{
    CASH="CASH",
    PENDING="PENDING",
    PAID="PAID",
    FAILED="FAILED",
    CANCELLED="CANCELLED",
    REFUNEDE="REFUNEDE"
}


export interface OnlinePayment{
    phone:string;
    payment_method:'BKASH'|'NAGAD'|'ROCKET'|'UPAY',
    transactionId:string
}