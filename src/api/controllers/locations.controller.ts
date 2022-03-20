import { Request, Response, NextFunction } from "express";
import { CustomResponse } from "../../lib";
import { locationsService } from "../../services";

export class LocationsController {
    getAll(req: Request, res: Response, next: NextFunction) {
        locationsService.all((err: any, data?: any[]) => {
            if (err) return next(err);
            if (!data) return CustomResponse.notFound(res, false, []);
            CustomResponse.ok(res, false, data);
        });
    }

    getDistricts(req: Request, res: Response, next: NextFunction) {
        function done(err: any, data?: any[]) {
            if (err) return next(err);
            if (!data) return CustomResponse.notFound(res, false, []);
            CustomResponse.ok(res, false, data);
        }

        const division = req.query.division;
        if (division) {
            return locationsService.districtsByDivision(
                division.toString(),
                done,
            );
        }

        locationsService.districts(done);
    }

    getDivisions(req: Request, res: Response, next: NextFunction) {
        locationsService.divisions((err: any, data?: any[]) => {
            if (err) return next(err);
            if (!data) return CustomResponse.notFound(res, false, []);
            CustomResponse.ok(res, false, data);
        });
    }

    getUpazilas(req: Request, res: Response, next: NextFunction) {
        function done(err: any, data?: any[]) {
            if (err) return next(err);
            if (!data) return CustomResponse.notFound(res, false, []);
            CustomResponse.ok(res, false, data);
        }

        const district = req.query.district;
        if (district) {
            return locationsService.upazilasByDistrict(
                district.toString(),
                done,
            );
        }

        locationsService.upazilas(done);
    }
}
