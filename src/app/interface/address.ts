export interface IAddress {
   id?: string | undefined;
    aptNumber: string;
    aptName: string;
    street: string;
    sub_district: string;
    district: string;
    postalCode: string;
    address?: string | null | undefined;
    phone: string;
    userId: string;
    isDefault?: boolean | undefined;
}