import { Belt } from "../domain/Belt";
import { BeltPointsRepository } from "../domain/BeltPointsRepository";

export function retrieveBeltPointsWith(beltPointsRepository: BeltPointsRepository): (color: string) => Promise<number> {

    return async (color) => {
        const belt = new Belt(color, beltPointsRepository);
        return await belt.retrieveBeltPoints();
    };
}