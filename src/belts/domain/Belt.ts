import { BeltPointsRepository } from "./BeltPointsRepository";
import { checkDefinedThis } from "./Colors";

export class Belt {
    constructor(
        private readonly color: string,
        private readonly beltPointsRepository: BeltPointsRepository 
    ) {
        checkDefinedThis(this.color);
    }

    retrieveBeltPoints() {
        return this.beltPointsRepository.retrievePointsOf(this.color);
    }

}