import { IDone } from '../interfaces';

export class LocationsService {
  getAll(done: IDone<any[]>) {
    done(null, []);
  }
}
