import type { ICreateParcelDto, IParcel, IDone } from "../../interfaces";
import { Router, Express, Response } from "express";
import { CustomResponse } from "../../libs";
import { parcelsService } from "../../services";

const router = Router();

// find parcel withing a shop
router.route("/").get((req, res) => {
    if (req.query.shop && req.query.invoice) {
        return parcelsService.findByShop(
            req.query.shop.toString(),
            req.query.invoice.toString(),
            (err, parcel) => {
                if (err) {
                    return CustomResponse.badRequest(res, err.message, {
                        ...err,
                    });
                }
                if (!parcel) return CustomResponse.notFound(res, false, null);
                CustomResponse.ok(res, false, [parcel]);
            }
        );
    }

    parcelsService.findMany((err, parcels) => {
        if (err) {
            return CustomResponse.badRequest(res, err.message, {
                ...err,
            });
        }
        if (!parcels) return CustomResponse.notFound(res, false, null);
        CustomResponse.ok(res, false, parcels);
    });
});

router
    .route("/single/:id")
    // get parcel with id
    .get((req, res) => {
        parcelsService.findOne(req.params.id, (err, parcel) => {
            if (err) {
                return CustomResponse.badRequest(res, err.message, { ...err });
            }
            if (!parcel) return CustomResponse.notFound(res, false, null);
            CustomResponse.ok(res, false, [parcel]);
        });
    })
    // update parcel
    .put((req, res) => {
        const data = req.body as ICreateParcelDto;
        parcelsService.update(
            { parcelId: req.params.id, shopId: data.shop.shop_id },
            data,
            (err, parcel) => {
                if (err) {
                    return CustomResponse.badRequest(res, err.message, {
                        ...err,
                    });
                }
                if (!parcel) return CustomResponse.notFound(res, false, null);
                CustomResponse.ok(res, false, [parcel]);
            }
        );
    });

// create parcel
router.route("/create").post((req, res) => {
    parcelsService.create(req.body, (err, parcel) => {
        if (err) {
            return CustomResponse.badRequest(res, err.message, { ...err });
        }
        if (!parcel) return CustomResponse.notFound(res, false, null);
        CustomResponse.created(res, false, [parcel]);
    });
});

export function useParcelsController(app: Express) {
    app.use("/api/v1/parcels", router);
}
