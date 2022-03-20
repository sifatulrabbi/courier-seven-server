import { IDone } from '../interfaces';

export class PricesCalculator {
    calculatePrice(from: string, to: string, done: IDone<number>) {
        console.log(from, to);
        done(null, 80);
    }
}
