export type AccountTypes = "bronze" | "silver" | "platinum" | "diamond";

export type IDone<T> = (err: any | Error, result?: T) => void;

export interface IAddress {
    district: string;
    sub_district: string;
    area: string;
    detail: string;
}
