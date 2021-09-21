export type NinjaNotifier = {
    notifyToAll(ninjaId: string, belt: string): Promise<void>
};
