import { IDone } from "../interfaces";
import locations from "../data/locations.json";

class LocationsService {
    all(done: IDone<any[]>) {
        done(null, locations);
    }

    districts(done: IDone<any[]>) {
        let districts = locations.map((location) => location.district);
        districts = districts.filter(
            (item, index, self) => self.indexOf(item) === index,
        );
        done(null, districts);
    }

    divisions(done: IDone<any[]>) {
        let divisions = locations.map((location) => location.division);
        divisions = divisions.filter(
            (item, index, self) => self.indexOf(item) === index,
        );
        done(null, divisions);
    }

    upazilas(done: IDone<any[]>) {
        const upazilas = locations.map((location) => location.upazila);
        done(null, upazilas);
    }

    districtsByDivision(division: string, done: IDone<string[]>) {
        let districts: string[] = [];

        locations.filter((location) => {
            if (location.division === division) {
                districts.push(location.district);
            }
        });

        districts = districts.filter(
            (item, index, self) => self.indexOf(item) === index,
        );

        if (!districts) return done(new Error("Invalid division name"));
        done(null, districts);
    }

    upazilasByDistrict(district: string, done: IDone<string[]>) {
        const upazilas: string[] = [];

        locations.filter((location) => {
            if (location.district === district) {
                upazilas.push(location.upazila);
            }
        });

        upazilas.sort();
        if (!upazilas) return done(new Error("Invalid district name"));
        done(null, upazilas);
    }
}

export const locationsService = new LocationsService();
