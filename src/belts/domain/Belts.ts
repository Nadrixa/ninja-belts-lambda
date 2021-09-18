enum Colors {
    yellow,
    orange,
    green,
    blue,
    brown,
    black
};

export function validateThis(color: string): void {

    if(!(color in Colors)) {
        throw new NotDefinedColorError(color);
    }
}

export class NotDefinedColorError extends Error {
    constructor(color: string) {
        super(`Color ${color} is not defined`);
    }
}