import { HydratedDocument, Model } from "mongoose";

export interface IOtp {
    _id: string;
    token: string;
    verification_key: string;
    created_at: Date;
    expires_at: Date;
}

export type IOtpDoc = HydratedDocument<IOtp>;
