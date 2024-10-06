export default interface InfusionMap<T> {
    [key: string]: T | undefined;
    standard?: T;
    heavy?: T;
    keen?: T;
    quality?: T;
    magic?: T;
    fire?: T;
    "flame-art"?: T;
    lightning?: T;
    sacred?: T;
    poison?: T;
    blood?: T;
    cold?: T;
    occult?: T;
}
