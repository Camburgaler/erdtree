// This type is used to represent a map of armor resistances to values.

export type ResistancesMapKey =
    | "poison"
    | "scarlet-rot"
    | "hemorrhage"
    | "frostbite"
    | "sleep"
    | "madness"
    | "death-blight";

type ResistancesMap<T> = {
    [K in ResistancesMapKey]: T;
};

export default ResistancesMap;
