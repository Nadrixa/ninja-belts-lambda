import { dynamoDBBeltPointsRepository } from "../../../src/belts/infraestructure/DynamoDBBeltPointsRepository";

describe('DynamoDBBeltPointsRepository', () => {

    it('Should retrieve points of defined given color', async () => {
        const color = 'yellow';
        const expectedPoints = 100;
        const dynamoDBRepository = dynamoDBBeltPointsRepository({table: 'BeltPoints', endpoint: 'http://localhost:8000', region: 'localhost'}, {accessKeyId: 'DEFAULT', secretAccessKey: 'DEFAULT'});

        const points = await dynamoDBRepository.retrievePointsOf(color);

        expect(points).toBe(expectedPoints);
    });

    it('Should retrieve NaN when given color is not in the table', async () => {
        const color = 'someColor';
        const expectedPoints = NaN;
        const dynamoDBRepository = dynamoDBBeltPointsRepository({table: 'BeltPoints', endpoint: 'http://localhost:8000', region: 'localhost'}, {accessKeyId: 'DEFAULT', secretAccessKey: 'DEFAULT'});

        const points = await dynamoDBRepository.retrievePointsOf(color);

        expect(points).toBe(expectedPoints);
    });
});