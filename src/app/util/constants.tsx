import { WeaponResult } from "../weapons/script";
import Armor from "./types/armor";
import AttackPowerTypeMap, {
    AttackPowerTypeMapKey,
} from "./types/attackPowerTypeMap";
import Correction from "./types/correction";
import Infusion from "./types/infusion";
import { InfusionMapKey } from "./types/infusionMap";
import StatMap, { StatMapKey } from "./types/statMap";
import Weapon from "./types/weapon";

export const WEAPONS: Weapon[] = Object.values(require("../data/weapons.json"));
WEAPONS.forEach((weapon) => {
    (Object.keys(weapon.infusions) as InfusionMapKey[]).forEach(
        (weaponInfusion) => {
            const masks: AttackPowerTypeMap<StatMap<boolean>> =
                WEAPONS[WEAPONS.indexOf(weapon)].infusions[weaponInfusion]!
                    .masks;
            WEAPONS[WEAPONS.indexOf(weapon)].infusions[weaponInfusion]!.masks =
                {
                    ...masks,
                    bleed: {
                        STR: false,
                        DEX: false,
                        INT: false,
                        FTH: false,
                        ARC: true,
                    },
                    poison: {
                        STR: false,
                        DEX: false,
                        INT: false,
                        FTH: false,
                        ARC: true,
                    },
                    sleep: {
                        STR: false,
                        DEX: false,
                        INT: false,
                        FTH: false,
                        ARC: true,
                    },
                    madness: {
                        STR: false,
                        DEX: false,
                        INT: false,
                        FTH: false,
                        ARC: true,
                    },
                    frost: {
                        STR: false,
                        DEX: false,
                        INT: false,
                        FTH: false,
                        ARC: false,
                    },
                    "scarlet-rot": {
                        STR: false,
                        DEX: false,
                        INT: false,
                        FTH: false,
                        ARC: false,
                    },
                };
        }
    );
});

export const INFUSIONS: Infusion = require("../data/infusions.json");
export const CORRECTIONS: Correction = require("../data/damage.json");
export const HELMETS: Armor[] = Object.values(require("../data/helmets.json"));
export const CHESTPIECES: Armor[] = Object.values(
    require("../data/chestpieces.json")
);
export const GAUNTLETS: Armor[] = Object.values(
    require("../data/gauntlets.json")
);
export const LEGGINGS: Armor[] = Object.values(
    require("../data/leggings.json")
);

export const ARMOR_RESULTS_SET_IDS = ["first", "second", "third"];
export const ATTACK_POWER_TYPE_MODE_ANY: string = "any";
export const ATTACK_POWER_TYPE_MODE_ALL: string = "all";
export const ATTACK_POWER_TYPE_MODE_EXACTLY: string = "exactly";

export const DAMAGE_IDS: AttackPowerTypeMapKey[] = [
    "physical",
    "magic",
    "fire",
    "lightning",
    "holy",
];
export const STATUS_IDS: AttackPowerTypeMapKey[] = [
    "bleed",
    "poison",
    "frost",
    "scarlet-rot",
    "madness",
    "sleep",
];
export const ATTACK_POWER_TYPE_IDS: AttackPowerTypeMapKey[] = [
    ...DAMAGE_IDS,
    ...STATUS_IDS,
];

export const ATTACK_POWER_TYPE_NAMES: string[] = [
    "Physical",
    "Magic",
    "Fire",
    "Lightning",
    "Holy",
    "Blood Loss",
    "Poison",
    "Frost",
    "Scarlet Rot",
    "Madness",
    "Sleep",
];

export const ATTACK_POWER_TYPE_ID_TO_NAME: { [key: string]: string } = {
    [ATTACK_POWER_TYPE_IDS[0]]: ATTACK_POWER_TYPE_NAMES[0],
    [ATTACK_POWER_TYPE_IDS[1]]: ATTACK_POWER_TYPE_NAMES[1],
    [ATTACK_POWER_TYPE_IDS[2]]: ATTACK_POWER_TYPE_NAMES[2],
    [ATTACK_POWER_TYPE_IDS[3]]: ATTACK_POWER_TYPE_NAMES[3],
    [ATTACK_POWER_TYPE_IDS[4]]: ATTACK_POWER_TYPE_NAMES[4],
    [ATTACK_POWER_TYPE_IDS[5]]: ATTACK_POWER_TYPE_NAMES[5],
    [ATTACK_POWER_TYPE_IDS[6]]: ATTACK_POWER_TYPE_NAMES[6],
    [ATTACK_POWER_TYPE_IDS[7]]: ATTACK_POWER_TYPE_NAMES[7],
    [ATTACK_POWER_TYPE_IDS[8]]: ATTACK_POWER_TYPE_NAMES[8],
    [ATTACK_POWER_TYPE_IDS[9]]: ATTACK_POWER_TYPE_NAMES[9],
    [ATTACK_POWER_TYPE_IDS[10]]: ATTACK_POWER_TYPE_NAMES[10],
};

export const INFUSION_IDS: InfusionMapKey[] = Object.keys(
    INFUSIONS
) as InfusionMapKey[];

export const INFUSION_NAMES: string[] = [
    "Standard",
    "Heavy",
    "Keen",
    "Quality",
    "Magic",
    "Fire",
    "Flame Art",
    "Lightning",
    "Sacred",
    "Poison",
    "Blood",
    "Cold",
    "Occult",
    "Unique",
];

export const INFUSION_ID_TO_NAME: { [key: string]: string } = {
    [INFUSION_IDS[0]]: INFUSION_NAMES[0],
    [INFUSION_IDS[1]]: INFUSION_NAMES[1],
    [INFUSION_IDS[2]]: INFUSION_NAMES[2],
    [INFUSION_IDS[3]]: INFUSION_NAMES[3],
    [INFUSION_IDS[4]]: INFUSION_NAMES[4],
    [INFUSION_IDS[5]]: INFUSION_NAMES[5],
    [INFUSION_IDS[6]]: INFUSION_NAMES[6],
    [INFUSION_IDS[7]]: INFUSION_NAMES[7],
    [INFUSION_IDS[8]]: INFUSION_NAMES[8],
    [INFUSION_IDS[9]]: INFUSION_NAMES[9],
    [INFUSION_IDS[10]]: INFUSION_NAMES[10],
    [INFUSION_IDS[11]]: INFUSION_NAMES[11],
    [INFUSION_IDS[12]]: INFUSION_NAMES[12],
    [INFUSION_IDS[13]]: INFUSION_NAMES[13],
};

export const CATEGORY_NAMES: string[][] = [
    [
        "Daggers",
        "Straight Swords",
        "Greatswords",
        "Colossal Swords",
        "Thrusting Swords",
        "Heavy Thrusting Swords",
        "Curved Swords",
        "Curved Greatswords",
        "Katanas",
        "Twinblades",
        "Hammers",
        "Great Hammers",
        "Flails",
        "Axes",
        "Greataxes",
        "Spears",
        "Great Spears",
        "Halberds",
        "Scythes",
        "Whips",
        "Fists",
        "Claws",
        "Colossal Weapons",
        "Torches",
        "Thrusting Shield",
        "Hand-to-Hand Arts",
        "Throwing Blades",
        "Backhand Blades",
        "Perfume Bottles",
        "Beast Claws",
        "Light Greatsword",
        "Great Katana",
    ],
    ["Light Bows", "Bows", "Greatbows", "Crossbows", "Ballistae"],
    ["Small Shields", "Medium Shields", "Greatshields"],
    ["Glintstone Staves", "Sacred Seals"],
];

export const INEFFECTIVE_STAT_PENALTY = 0.4;

export const ATTACK_POWER_STAT_IDS: StatMapKey[] = [
    "STR",
    "DEX",
    "INT",
    "FTH",
    "ARC",
];
export const STAT_IDS: StatMapKey[] = [
    "VIG",
    "MND",
    "END",
    ...ATTACK_POWER_STAT_IDS,
];

export const DEFAULT_ATTACK_POWER_TYPE_MAP_BOOLEAN: AttackPowerTypeMap<boolean> =
    {
        physical: false,
        magic: false,
        fire: false,
        lightning: false,
        holy: false,
    };
export const DEFAULT_ATTACK_POWER_TYPE_MAP_NUMBER: AttackPowerTypeMap<number> =
    {
        physical: 0,
        magic: 0,
        fire: 0,
        lightning: 0,
        holy: 0,
    };

export const DEFAULT_ATTACK_RATING_BREAKDOWN: {
    baseDmg: AttackPowerTypeMap<number>;
    scalingDmg: AttackPowerTypeMap<number>;
} = {
    baseDmg: { ...DEFAULT_ATTACK_POWER_TYPE_MAP_NUMBER },
    scalingDmg: { ...DEFAULT_ATTACK_POWER_TYPE_MAP_NUMBER },
};

export const DEFAULT_WEAPON_RESULT: WeaponResult = {
    weaponName: "",
    attackRatings: {},
    max: 0,
    arBreakdown: {},
    spellScaling: 0,
};

export const DEFAULT_STAT_MAP_BOOLEAN: StatMap<boolean> = {
    STR: false,
    DEX: false,
    INT: false,
    FTH: false,
    ARC: false,
};
export const DEFAULT_STAT_MAP_NUMBER: StatMap<number> = {
    STR: 0,
    DEX: 0,
    INT: 0,
    FTH: 0,
    ARC: 0,
};

export const SCALING_MULTIPLIERS = {
    S: 1.5,
    A: 1.2,
    B: 1.0,
    C: 0.8,
    D: 0.5,
    E: 0.3,
};

export const LOCKED_ARMOR_SELECT_NAME = "locked-items";
