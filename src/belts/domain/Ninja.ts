import { NinjaBeltsRepository } from "./NinjaBeltsRepository";
import { NinjaNotifier } from "./NinjaNotifier";

import { checkDefinedThis } from "./Colors";

export class Ninja {

    private readonly ninjaId: string;
    private readonly belt: string;

    constructor(
        ninjaId?: string,
        belt?: string
    ) {
        checkValidThis(ninjaId);
        checkDefinedThis(belt ?? '');

        this.ninjaId = ninjaId as string;
        this.belt = belt as string;
    }

    saveUsing(ninjaBeltsRepository: NinjaBeltsRepository) {

        ninjaBeltsRepository.save(this.ninjaId, this.belt);
    }

    notifyToOtherNinjasUsing(ninjaNotifier: NinjaNotifier) {

        ninjaNotifier.notifyToAll(this.ninjaId, this.belt);
    }
}

function checkValidThis(ninjaId?: string) {

    if(ninjaId === undefined) {
        throw new NotValidNinjaIdError();
    }
}

export class NotValidNinjaIdError extends Error {
    constructor() {
        super(`Ninja id should be defined!`);
    }
}