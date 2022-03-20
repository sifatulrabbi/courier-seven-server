export type IAccountTypes = "bronze" | "silver" | "platinum" | "diamond";

export type IProductTypes = "solid" | "liquid" | "fragile";

export type IDone<T> = (err: any, result?: T) => void;

export interface IAddress {
    division: string;
    district: string;
    upazila: string;
    area: string;
    street: string;
    house: string;
}

export type ICallback<D> = (data: D) => any;

export interface ISubscriber<T, D> {
    event: T;
    callback: ICallback<D>;
}

export interface IEventEmitter<T, D> {
    subscribers: ISubscriber<T, D>[];

    subscribe: (event: T, callback: ICallback<D>) => void;

    unsubscribe: (event: T, callback: ICallback<D>) => void;

    trigger: (event: T, data: D) => void;
}

export interface JWTPayload {
    sub: string;
    email: string;
    iat: number;
}
