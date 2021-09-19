import { Belt } from "../domain/Belt";
import { BeltPointsRepository } from "../domain/BeltPointsRepository";

export function retrieveBeltPointsWith(beltPointsRepository: BeltPointsRepository): (color: string) => number {

    return (color) => {

        const belt = new Belt(color, beltPointsRepository);
        return belt.retrieveBeltPoints();
    };
}