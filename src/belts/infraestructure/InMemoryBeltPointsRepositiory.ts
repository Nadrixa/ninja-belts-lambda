import { BeltPointsRepository } from "../domain/BeltPointsRepository";

type PointsByColor = {
    [key: string]: number
};

const pointsByColor: PointsByColor = {
    'yellow': 100,
    'orange': 500,
    'green': 1500,
    'blue': 4000,
    'brown': 10000,
    'black': 20000
};

export function inMemoryBeltsRepository(): BeltPointsRepository {

    return {
        retrievePointsOf(color) {
            return pointsByColor[color];
        }
    };
}