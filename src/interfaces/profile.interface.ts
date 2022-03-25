import { IUser, IShop } from "./index";

export interface IProfile {
    name: IUser["name"];
    email: IUser["email"];
    mobile: IUser["mobile"];
    shops: {
        total: number;
        data: {
            _id: IShop["_id"];
            name: IShop["name"];
        }[];
    };
    payments: {
        due: number;
        done: number;
        total: number;
    };
}
