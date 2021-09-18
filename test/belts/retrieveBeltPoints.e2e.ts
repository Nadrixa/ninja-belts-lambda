import axios from 'axios';

describe('Retrieve belt points', () => {

    it('Should return 400 when no color is not defined', async () => {

        // Setup
        expect.assertions(2);

        // Given
        const notDefinedColor = 'someColor';

        try {
            // When
            await axios.get(`http://localhost:3000/dev/belts/${notDefinedColor}/points`);
        } catch (error: any) {
            // Then
            expect(error.response.status).toBe(400);
            expect(error.response.data).toBe(`Color ${notDefinedColor} is not defined`);
        }
    });

    it('Should return 200 and points to get yellow belt', async () => {

        // Given
        const beltColor = 'yellow';

        // When
        const { data: points, status } = (await axios.get(`http://localhost:3000/dev/belts/${beltColor}/points`));

        // Then
        expect(status).toBe(200);
        expect(points).toBe(100);
    });

});