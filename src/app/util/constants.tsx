import Armor from "./types/armor";
import Correction from "./types/correction";
import Infusion from "./types/infusion";
import Weapon from "./types/weapon";

export const WEAPONS: Weapon[] = Object.values(require("../data/weapons.json"));
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

export const ARMOR_RESULTS_SET_IDS = [
    "first",
    "second",
    "third",
    "fourth",
    "fifth",
];
export const ATTACK_POWER_TYPE_MODE_ANY: string = "any";
export const ATTACK_POWER_TYPE_MODE_All: string = "all";
export const ATTACK_POWER_TYPE_MODE_EXACTLY: string = "exactly";

export const DAMAGE_IDS: string[] = [
    "physical",
    "magic",
    "fire",
    "lightning",
    "holy",
];
export const STATUS_IDS: string[] = [
    "blood",
    "poison",
    "frost",
    "scarlet-rot",
    "madness",
    "sleep",
];
export const ATTACK_POWER_TYPE_IDS: string[] = [...DAMAGE_IDS, ...STATUS_IDS];

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

export const INFUSION_IDS: string[] = Object.keys(INFUSIONS);

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

export const ATTACK_POWER_STAT_IDS = ["STR", "DEX", "INT", "FTH", "ARC"];
export const STAT_IDS = ["VIG", "MND", "END", ...ATTACK_POWER_STAT_IDS];
