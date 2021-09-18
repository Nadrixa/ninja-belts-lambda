import { retrieveBeltPointsWith } from "../../../src/belts/application/retrieveBeltPoints";

describe('BeltPointsRetriever use case', () => {

    it('Should throw exception when given color is not defined', () => {

        // Given
        const beltPointsRetrieverStub = jest.fn();
        const beltColor = 'someColor';
        const retrieveBeltPointsFor = retrieveBeltPointsWith(beltPointsRetrieverStub);

        // When + Then
        expect(() => retrieveBeltPointsFor(beltColor)).toThrow();
    });

    it('Should call to points retriever and return points for defined color', () => {

        // Given
        const expectedPoints = 100;
        const beltPointsRetrieverStub = jest.fn(() => expectedPoints);
        const beltColor = 'yellow';
        const retrieveBeltPointsFor = retrieveBeltPointsWith(beltPointsRetrieverStub);

        // When
        const points = retrieveBeltPointsFor(beltColor);

        // Then
        expect(points).toBe(expectedPoints);
        expect(beltPointsRetrieverStub).toBeCalledTimes(1);
        expect(beltPointsRetrieverStub).toBeCalledWith(beltColor);
    });
});