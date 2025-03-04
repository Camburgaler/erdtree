// This type is used to represent a map of attack power types to values.

type RequiredAttackPowerTypes =
    | "physical"
    | "magic"
    | "fire"
    | "lightning"
    | "holy";
type OptionalAttackPowerTypes =
    | "bleed"
    | "poison"
    | "frost"
    | "scarlet-rot"
    | "madness"
    | "sleep";
export type AttackPowerTypeMapKey =
    | RequiredAttackPowerTypes
    | OptionalAttackPowerTypes;

type AttackPowerTypeMap<T> = {
    [RK in RequiredAttackPowerTypes]: T;
} & {
    [OK in OptionalAttackPowerTypes]?: T;
};

export default AttackPowerTypeMap;
