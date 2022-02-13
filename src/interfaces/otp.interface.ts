import { HydratedDocument, Model } from "mongoose";

export interface IOtp {
    _id?: string;
    key: string;
    created_at: Date;
    expires_at: Date;
}

export interface IOtpMethods {
    isValid: () => boolean;
}

export type IOtpDoc = HydratedDocument<IOtp>;

export type IOtpModel = Model<IOtp, {}, IOtpMethods>;
