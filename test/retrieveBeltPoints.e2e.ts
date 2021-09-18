import axios from 'axios';

describe('Retrieve belt points', () => {

    it('Should return points to get yellow belt', async () => {
        const beltColor = 'yellow';

        const { data: points, status } = (await axios.get(`http://localhost:3000/dev/belts/${beltColor}/points`));

        expect(status).toBe(200);
        expect(points).toBe(100);
    });

});