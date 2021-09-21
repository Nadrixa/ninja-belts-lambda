export type NinjaBeltsRepository = {
    save(ninjaId: string, belt: string): Promise<void>
};
