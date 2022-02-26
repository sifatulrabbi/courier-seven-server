import {
  IShopDoc,
  ICreateShopDto,
  IUpdateShopDto,
  IDone,
  IShop,
} from '../interfaces';
import { shopsModel } from '../models/shops.model';

class ShopsService {
  // finds shops
  async allShops(done: IDone<IShop[]>) {
    try {
      const shops = await shopsModel.find({});
      done(null, shops);
    } catch (err: any) {
      done(err);
    }
  }

  async findUsersShop(
    { userId, invoiceId }: { userId: string; invoiceId?: string },
    done: IDone<IShop[]>,
  ) {
    try {
      const query = {
        owner_id: userId,
        invoice_id: invoiceId,
      };
      const shops = await shopsModel.find(query);
      if (shops.length < 1) return done(null);
      done(null, shops);
    } catch (err: any) {
      done(err);
    }
  }

  // finds a single shop
  async findShop(
    shopId: string,
    done?: IDone<IShop>,
  ): Promise<IShopDoc | null> {
    try {
      const shop = await shopsModel.findById(shopId);
      if (!shop) {
        if (done) done(null);
        return null;
      }
      if (done) done(null, shop);
      return shop;
    } catch (err) {
      if (done) done(err);
      return null;
    }
  }

  // creates a shop
  async create(data: ICreateShopDto, done: IDone<IShop>) {
    try {
      const prevShop = await shopsModel.findOne({
        owner_id: data.owner_id,
        name: data.name,
      });
      if (prevShop) {
        throw new Error("Can't have multiple shops with the same name");
      }

      const shopDoc = new shopsModel(data);
      const shop: IShopDoc = await shopDoc.save();
      done(null, shop);
    } catch (err: any) {
      done(err);
    }
  }

  // updates a shop
  async update(shopId: string, data: IUpdateShopDto, done: IDone<IShop>) {
    try {
      const shop = await this.findShop(shopId);
      if (!shop) return done(null);
      const updatedShop: IShopDoc | null = await shop.updateOne(data, {
        new: true,
      });
      if (!updatedShop) throw new Error('Unable to update shop');
      done(null, updatedShop);
    } catch (err: any) {
      done(err);
    }
  }
}

export const shopsService = new ShopsService();
