import {
  IShopDoc,
  ICreateShopDto,
  IUpdateShopDto,
  IDone,
  IShop,
} from '../interfaces';
import { shopsModel } from '../models/shops.model';
import { usersService } from './users.service';

class ShopsService {
  constructor() {
    usersService.subscribe('remove', (user) => {
      this.removeByUser(user._id);
    });

    usersService.subscribe('update', () => {
      console.log('inside shopsService: Callback from usersService');
    });
  }

  // finds all the shops
  async allShops(done: IDone<IShop[]>) {
    try {
      const shops = await shopsModel.find({});
      done(null, shops);
    } catch (err) {
      done(err);
    }
  }

  // find all the shops of a single user
  async findUsersShop({ userId }: { userId: string }, done: IDone<IShop[]>) {
    try {
      const shops = await shopsModel.find({ owner_id: userId });
      done(null, shops);
    } catch (err) {
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
      // look for duplicate shop name
      const duplicate = await shopsModel.findOne({
        owner_id: data.owner_id,
        name: data.name,
      });
      if (duplicate) {
        throw new Error("Can't have multiple shops with the same name");
      }

      // create the shop
      const shopDoc = new shopsModel(data);
      const shop: IShopDoc = await shopDoc.save();
      done(null, shop);
    } catch (err) {
      done(err);
    }
  }

  // updates a shop
  async update(shopId: string, data: IUpdateShopDto, done: IDone<IShop>) {
    try {
      // look for duplicate shop name
      const duplicate = await shopsModel.findOne({
        owner_id: data.owner_id,
        name: data.name,
      });
      if (duplicate) {
        throw new Error('Shop name has been taken please use another name');
      }

      // find the shop with owner id, shop id and update
      const shop = await shopsModel.findOne({
        owner_id: data.owner_id,
        _id: shopId,
      });
      if (!shop) return done(null);
      const updatedShop = await shopsModel.findByIdAndUpdate(shopId, data, {
        new: true,
      });
      if (!updatedShop) return done(null);
      done(null, updatedShop);
    } catch (err) {
      done(err);
    }
  }

  // remove shop
  async remove(shopId: string, ownerId: string, done: IDone<IShop>) {
    try {
      // find shop with owner id, shop id and remove
      const shop = await shopsModel.findOne({
        owner_id: ownerId,
        _id: shopId,
      });
      if (!shop) {
        return done(null);
      }
      await shop.remove(done);
    } catch (err: any) {
      done(err);
    }
  }

  private async removeByUser(userId: string) {
    try {
      await shopsModel.remove({ owner_id: userId.toString() });
    } catch (err) {
      console.log(err);
    }
  }
}

export const shopsService = new ShopsService();
