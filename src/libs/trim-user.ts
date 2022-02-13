import { IUserDoc } from "../interfaces";

export function trimUser(user: IUserDoc) {
    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        permanent_address: user.permanent_address,
        present_address: user.present_address,
        account_type: user.account_type,
    };
}
