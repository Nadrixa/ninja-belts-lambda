import { assignBeltToNinjaWith } from "../../../src/belts/application/assignBeltToNinja";
import { NotDefinedColorError } from "../../../src/belts/domain/Colors";
import { NotValidNinjaIdError } from "../../../src/belts/domain/Ninja";

describe('assignBeltToNinja use case', () => {

    it('Should save ninja with belt and notify to other ninjas', async () => {

        const ninjaId = 'EXXXX';
        const belt = 'brown';
        const ninjaBeltsRepository = {
            save: jest.fn()
        }
        const ninjaNotifier = {
            notifyToAll: jest.fn()
        }
        const assignBeltToNinja = assignBeltToNinjaWith(ninjaBeltsRepository, ninjaNotifier);

        await assignBeltToNinja(ninjaId, belt);

        expect(ninjaBeltsRepository.save).toBeCalledTimes(1);
        expect(ninjaBeltsRepository.save).toBeCalledWith(ninjaId, belt);
        expect(ninjaNotifier.notifyToAll).toBeCalledTimes(1);
        expect(ninjaNotifier.notifyToAll).toBeCalledWith(ninjaId, belt);
    });

    it.each([
        ['belt color not exists', 'someColor'],
        ['belt color is not defined', undefined]
    ])('Should throw not defined color error when belt passed is not defined - case %s', async (_caseDesription, belt) => {

        const ninjaId = 'EXXXX';
        const ninjaBeltsRepository = {
            save: jest.fn()
        }
        const ninjaNotifier = {
            notifyToAll: jest.fn()
        }
        const assignBeltToNinja = assignBeltToNinjaWith(ninjaBeltsRepository, ninjaNotifier);

        await expect(assignBeltToNinja(ninjaId, belt)).rejects.toThrow(NotDefinedColorError);
    });

    it('Should throw not valid ninjaId when ninjaId is not defined', async () => {

        const ninjaId = undefined;
        const belt = 'black';

        const ninjaBeltsRepository = {
            save: jest.fn()
        }
        const ninjaNotifier = {
            notifyToAll: jest.fn()
        }
        const assignBeltToNinja = assignBeltToNinjaWith(ninjaBeltsRepository, ninjaNotifier);

        await expect(assignBeltToNinja(ninjaId, belt)).rejects.toThrow(NotValidNinjaIdError);
    });
});