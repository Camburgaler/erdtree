// This type is used to represent a map of armor defenses to values.

export type DefensesMapKey =
    | "physical"
    | "strike"
    | "slash"
    | "pierce"
    | "magic"
    | "fire"
    | "lightning"
    | "holy";

type DefensesMap<T> = {
    [K in DefensesMapKey]: T;
};

export default DefensesMap;
