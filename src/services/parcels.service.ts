import type {
    ICreateParcelDto,
    IUpdateParcelDto,
    IParcel,
    IDone,
    IParcelDoc,
} from "../interfaces";
import { parcelsModel } from "../models";

interface IProps {
    shopId: string;
    parcelId: string;
}

class ParcelsService {
    // create parcel
    async create(
        data: ICreateParcelDto,
        done: IDone<IParcel>
    ): Promise<IParcel | null> {
        try {
            const parcelDoc = new parcelsModel(data);
            const parcel = await parcelDoc.save();
            done(null, parcel);
            return parcel;
        } catch (err) {
            done(err);
            return null;
        }
    }

    // update parcel
    async update(
        { parcelId }: IProps,
        data: IUpdateParcelDto,
        done: IDone<IParcel>
    ): Promise<IParcelDoc | null> {
        try {
            const parcel = await this.findOne(parcelId);
            if (!parcel) {
                done(null);
                return null;
            }
            const updatedParcel = await parcel.updateOne(data, { new: true });
            done(null, updatedParcel);
            return parcel;
        } catch (err) {
            done(err);
            return null;
        }
    }

    // remove parcel
    async remove(
        { shopId, parcelId }: IProps,
        done: IDone<IParcel>
    ): Promise<IParcel | null> {
        try {
            const parcel = await parcelsModel.findOne({
                _id: parcelId,
                shop: { shop_id: shopId },
            });
            if (!parcel) {
                done(null);
                return null;
            }
            await parcel.remove();
            done(null, parcel);
            return parcel;
        } catch (err) {
            done(err);
            return null;
        }
    }

    // find a parcel
    async findOne(
        parcelId: string,
        done?: IDone<IParcel>
    ): Promise<IParcelDoc | null> {
        try {
            const parcel = await parcelsModel.findById(parcelId);

            if (!parcel) {
                done && done(null);
                return null;
            }
            done && done(null, parcel);
            return parcel;
        } catch (err: any) {
            done && done(err);
            return null;
        }
    }

    async findByShop(shopId: string, invoiceId: string, done: IDone<IParcel>) {
        try {
            const parcel = await parcelsModel.findOne({
                shop: { shop_id: shopId },
                invoice_id: invoiceId,
            });
            if (!parcel) return done(null);
            done(null, parcel);
        } catch (err: any) {
            done(err);
        }
    }

    // find a batch of parcels
    async findMany(done: IDone<IParcel[]>): Promise<IParcel[] | null> {
        try {
            const parcels = await parcelsModel.find({});
            if (!parcels) {
                done(null);
                return null;
            }
            done(null, parcels);
            return parcels;
        } catch (err: any) {
            done(err);
            return null;
        }
    }
}

export const parcelsService = new ParcelsService();
