export default interface StatMap<T> {
    [key: string]: T | undefined;
    VIG?: T;
    MND?: T;
    END?: T;
    STR: T;
    DEX: T;
    INT: T;
    FTH: T;
    ARC: T;
}
