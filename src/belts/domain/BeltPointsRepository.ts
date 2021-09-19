export type BeltPointsRepository = {
    retrievePointsOf: (beltColor: string) => number | Promise<number>
};