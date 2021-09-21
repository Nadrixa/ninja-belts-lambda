import axios from "axios";

describe('Asssign belt to ninja', () => {

    it('Should return 204, save in dynamoDB and notify other ninjas when ninja and belt passed are right', async () => {

        const belt = 'black';
        const ninja = 'EXXXX';

        const response = await axios.post('http://localhost:3000/dev/ninja/belt', {
            belt,
            ninja
        });

        expect(response.status).toBe(204);
        // TODO: DymamoDB assertion
        // TODO: Notification assertion
    });

});