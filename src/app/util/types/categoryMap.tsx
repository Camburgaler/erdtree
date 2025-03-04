// This type is used to represent a map of weapon categories to values.

export type CategoryMapKey =
    | "dagger"
    | "straight-sword"
    | "greatsword"
    | "colossal-sword"
    | "thrusting-sword"
    | "heavy-thrusting-sword"
    | "curved-sword"
    | "curved-greatsword"
    | "katana"
    | "twinblade"
    | "hammer"
    | "great-hammer"
    | "flail"
    | "axe"
    | "greataxe"
    | "spear"
    | "great-spear"
    | "halberd"
    | "scythe"
    | "whip"
    | "fist"
    | "claw"
    | "colossal-weapon"
    | "torch"
    | "thrusting-shield"
    | "hand-to-hand-art"
    | "throwing-blade"
    | "backhand-blade"
    | "perfume-bottle"
    | "beast-claw"
    | "light-greatsword"
    | "great-katana"
    | "light-bow"
    | "bow"
    | "greatbow"
    | "crossbow"
    | "ballista"
    | "small-shield"
    | "medium-shield"
    | "greatshield"
    | "glintstone-staff"
    | "sacred-seal";

type CategoryMap<T> = {
    [K in CategoryMapKey]: T;
};

export default CategoryMap;
