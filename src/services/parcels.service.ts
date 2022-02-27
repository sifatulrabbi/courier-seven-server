import type {
  ICreateParcelDto,
  IUpdateParcelDto,
  IParcel,
  IDone,
  IParcelDoc,
} from '../interfaces';
import { parcelsModel } from '../models';
import { shopsService } from './shops.service';

class ParcelsService {
  // create parcel
  async create(data: ICreateParcelDto, done: IDone<IParcel>) {
    try {
      const shop = await shopsService.findShop(data.shop_id);
      if (!shop) throw new Error('Shop id invalid');

      const parcelData: any = { ...data };
      parcelData.shop = {
        shop_id: shop._id,
        owner: data.user_name,
        name: shop.name,
        mobile: shop.mobile,
        email: shop.email,
        address: shop.address,
      };

      const parcelDoc = new parcelsModel(parcelData);
      const parcel = await parcelDoc.save();
      done(null, parcel);
    } catch (err: any) {
      done(err);
    }
  }

  // update parcel
  async update(parcelId: string, data: IUpdateParcelDto, done: IDone<IParcel>) {
    try {
      const parcel = await parcelsModel.findByIdAndUpdate(parcelId, data, {
        new: true,
      });
      if (!parcel) done(null);
      else done(null, parcel);
    } catch (err) {
      done(err);
    }
  }

  // remove parcel
  async remove(parcelId: string, done: IDone<IParcel>) {
    try {
      const parcel = await parcelsModel.findByIdAndRemove(parcelId);
      if (!parcel) done(null);
      else done(null, parcel);
    } catch (err) {
      done(err);
    }
  }

  // find a parcel
  async findOne(
    parcelId: string,
    done?: IDone<IParcel>,
  ): Promise<IParcelDoc | null> {
    try {
      const parcel = await parcelsModel.findById(parcelId);

      if (!parcel) {
        if (done) done(null);
        return null;
      }
      if (done) done(null, parcel);
      return parcel;
    } catch (err: any) {
      if (done) done(err);
      return null;
    }
  }

  async findByShop(
    shopId: string,
    invoiceId: string | null,
    done: IDone<IParcel[]>,
  ) {
    try {
      const query = { shop: { shop_id: shopId } };
      if (invoiceId) {
        Object.defineProperty(query, 'invoice_id', {
          value: invoiceId,
          writable: false,
        });
      }
      const parcel = await parcelsModel.find(query);
      if (!parcel) return done(null);
      done(null, parcel);
    } catch (err: any) {
      done(err);
    }
  }

  // finds all the parcels
  async all(done: IDone<IParcel[]>): Promise<IParcel[] | null> {
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
