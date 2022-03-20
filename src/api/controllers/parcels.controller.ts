import type { ICreateParcelDto, IUser } from "../../interfaces";
import { Request, Response, NextFunction } from "express";
import { CustomResponse } from "../../lib";
import { parcelsService } from "../../services";

const { notFound, ok, created } = CustomResponse;

export class ParcelsController {
    getAll(req: Request, res: Response, next: NextFunction) {
        // by shop and invoice
        const shopId = req.query.shop?.toString();
        const invoiceId = req.query.invoice?.toString();

        if (shopId && invoiceId) {
            return parcelsService.findByShop(
                shopId,
                invoiceId,
                (err, parcels) => {
                    if (err) return next(err);
                    if (!parcels) return notFound(res, false, null);
                    ok(res, false, parcels);
                },
            );
        }

        // by shop
        if (shopId && !invoiceId) {
            return parcelsService.findByShop(shopId, null, (err, parcels) => {
                if (err) return next(err);
                if (!parcels) return notFound(res, "Parcel not found", null);
                ok(res, "Parcel found", parcels);
            });
        }

        // all
        parcelsService.all(
            /* admin auth guard needed */ (err, parcels) => {
                if (err) return next(err);
                if (!parcels) return notFound(res, false, null);
                ok(res, false, parcels);
            },
        );
    }

    create(req: Request, res: Response, next: NextFunction) {
        const user = req.user as IUser;
        const data = req.body;
        data.user_name = user.name.first + " " + user.name.last;
        parcelsService.create(data, (err, parcel) => {
            if (err) return next(err);
            if (!parcel) return notFound(res, false, null);
            created(res, false, [parcel]);
        });
    }

    getById(req: Request, res: Response, next: NextFunction) {
        parcelsService.findOne(req.params.id, (err, parcel) => {
            if (err) return next(err);
            if (!parcel) return notFound(res, false, null);
            ok(res, false, [parcel]);
        });
    }

    update(req: Request, res: Response, next: NextFunction) {
        const data = req.body as ICreateParcelDto;
        parcelsService.update(req.params.id, data, (err, parcel) => {
            if (err) return next(err);
            if (!parcel) return notFound(res, false, null);
            ok(res, false, [parcel]);
        });
    }

    remove(req: Request, res: Response, next: NextFunction) {
        parcelsService.remove(req.params.id, (err, parcel) => {
            if (err) return next(err);
            if (!parcel) return notFound(res, "Parcel not found", null);
            ok(res, "Parcel removed", [parcel]);
        });
    }
}
