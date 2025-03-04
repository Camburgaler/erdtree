// This type is used to represent a map of weapon infusions to values.

export type InfusionMapKey =
    | "standard"
    | "heavy"
    | "keen"
    | "quality"
    | "magic"
    | "fire"
    | "flame-art"
    | "lightning"
    | "sacred"
    | "poison"
    | "blood"
    | "cold"
    | "occult"
    | "unique";

type InfusionMap<T> = {
    [K in InfusionMapKey]?: T;
};

export default InfusionMap;
