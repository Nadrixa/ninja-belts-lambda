import { validateThis } from "../domain/Belts";
import { RetrievePointsOf } from "../domain/BeltPointsRetriever";

export function retrieveBeltPointsWith(retrieveBeltPointsFor: RetrievePointsOf): (color: string) => number {

    return (color) => {
        validateThis(color);
        return retrieveBeltPointsFor(color);
    };
}