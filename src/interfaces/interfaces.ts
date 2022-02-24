export type IAccountTypes = "bronze" | "silver" | "platinum" | "diamond";

export type IProductTypes = "solid" | "liquid" | "fragile";

export type IDone<T> = (err: any | Error, result?: T) => void;

export interface IAddress {
    district: string;
    sub_district: string;
    area: string;
    street: string;
    house: string;
}
