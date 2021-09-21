import { NinjaBeltsRepository } from "../domain/NinjaBeltsRepository";
import { NinjaNotifier } from "../domain/NinjaNotifier";

import { Ninja } from "../domain/Ninja";

export function assignBeltToNinjaWith(ninjaBeltsRepository: NinjaBeltsRepository, ninjaNotifier: NinjaNotifier): (ninjaId?: string, belt?: string) => Promise<void> {

    return async (ninjaId, belt) => {

        const ninja = new Ninja(ninjaId, belt);

        ninja.saveUsing(ninjaBeltsRepository);
        ninja.notifyToOtherNinjasUsing(ninjaNotifier);
    };
}