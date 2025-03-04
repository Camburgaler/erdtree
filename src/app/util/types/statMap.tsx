// This type is used to represent a map of character stats to values.

type RequiredStats = "STR" | "DEX" | "INT" | "FTH" | "ARC";
type OptionalStats = "VIG" | "MND" | "END";
export type StatMapKey = RequiredStats | OptionalStats;

type StatMap<T> = {
    [RK in RequiredStats]: T;
} & {
    [OK in OptionalStats]?: T;
};

export default StatMap;
