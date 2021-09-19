import { retrieveBeltPointsWith } from "../../../src/belts/application/retrieveBeltPoints";

describe('BeltPointsRetriever use case', () => {

    it('Should throw exception when given color is not defined', async () => {

        // Given
        const beltPointsRetrieverStub = {
            retrievePointsOf: jest.fn()
        };
        const beltColor = 'someColor';
        const retrieveBeltPointsFor = retrieveBeltPointsWith(beltPointsRetrieverStub);

        // When + Then
        await expect(retrieveBeltPointsFor(beltColor)).rejects.toThrow();
    });

    it('Should call to points retriever and return points for defined color', async () => {

        // Given
        const expectedPoints = 100;
        const beltPointsRetrieverStub = {
            retrievePointsOf: jest.fn(() => expectedPoints)
        };
        const beltColor = 'yellow';
        const retrieveBeltPointsFor = retrieveBeltPointsWith(beltPointsRetrieverStub);

        // When
        const points = await retrieveBeltPointsFor(beltColor);

        // Then
        expect(points).toBe(expectedPoints);
        expect(beltPointsRetrieverStub.retrievePointsOf).toBeCalledTimes(1);
        expect(beltPointsRetrieverStub.retrievePointsOf).toBeCalledWith(beltColor);
    });
});