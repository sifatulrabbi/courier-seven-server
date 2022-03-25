import { usersService, shopsService } from "./index";
import type { IDone, IProfile } from "../interfaces";

class ProfilesService {
    async getProfile(userId: string, done: IDone<IProfile>): Promise<void> {
        try {
            const profile: any = {};

            const user = await usersService.findOne({ id: userId });
            if (!user) throw new Error("User not found");
            Object.assign(profile, { name: user.name });
            Object.assign(profile, { shops: { total: 0, data: [] } });

            shopsService.findUsersShop({ userId }, (err, shops) => {
                if (err) throw err;
                if (!shops) return;

                profile.shops.total = shops.length;
                for (const shop of shops) {
                    profile.shops.data.push({ _id: shop._id, name: shop.name });
                }
            });

            Object.assign(profile, {
                payments: { due: 0, done: 1000, total: 1000 },
            });

            done(null, profile as IProfile);
        } catch (err) {
            done(err);
        }
    }
}

export const profilesService = new ProfilesService();
