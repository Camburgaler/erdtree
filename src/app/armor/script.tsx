import { CHESTPIECES, GAUNTLETS, HELMETS, LEGGINGS } from "../util/constants";
import Armor from "../util/types/armor";
import ArmorSet from "../util/types/armorSet";
import DefensesMap from "../util/types/defensesMap";
import ResistancesMap from "../util/types/resistancesMap";
import { SortByGeneric } from "../util/types/sortBy";

enum SortByKeys {
    average = "average",
    total = "total",
    "average-absorption" = "average-absorption",
    "total-absorption" = "total-absorption",
    standard = "standard",
    physical = "physical",
    strike = "strike",
    slash = "slash",
    pierce = "pierce",
    "average-elemental" = "average-elemental",
    "total-elemental" = "total-elemental",
    magic = "magic",
    fire = "fire",
    lightning = "lightning",
    holy = "holy",
    "average-resistance" = "average-resistance",
    "total-resistance" = "total-resistance",
    poison = "poison",
    "scarlet-rot" = "scarlet-rot",
    hemorrhage = "hemorrhage",
    frostbite = "frostbite",
    sleep = "sleep",
    madness = "madness",
    "death-blight" = "death-blight",
    poise = "poise",
    custom = "custom",
}

type SortBy = SortByGeneric &
    DefensesMap<boolean> &
    ResistancesMap<boolean> & {
        poise: boolean;
    };

const DEFENSES_COUNT = 8;
const RESISTANCES_COUNT = 7;
const DEFAULT_SORTBY: SortBy = {
    children: [],
    average: false,
    sum: false,
    coefficient: 1,
    addend: 0,
    physical: false,
    strike: false,
    slash: false,
    pierce: false,
    magic: false,
    fire: false,
    lightning: false,
    holy: false,
    poison: false,
    "scarlet-rot": false,
    hemorrhage: false,
    frostbite: false,
    sleep: false,
    madness: false,
    "death-blight": false,
    poise: false,
};
export const SORTBY_MODES: { [K in SortByKeys]: SortBy } = {
    average: {
        ...DEFAULT_SORTBY,
        average: true,
        physical: true,
        strike: true,
        slash: true,
        pierce: true,
        magic: true,
        fire: true,
        lightning: true,
        holy: true,
        poison: true,
        "scarlet-rot": true,
        hemorrhage: true,
        frostbite: true,
        sleep: true,
        madness: true,
        "death-blight": true,
    },
    total: {
        ...DEFAULT_SORTBY,
        sum: true,
        physical: true,
        strike: true,
        slash: true,
        pierce: true,
        magic: true,
        fire: true,
        lightning: true,
        holy: true,
        poison: true,
        "scarlet-rot": true,
        hemorrhage: true,
        frostbite: true,
        sleep: true,
        madness: true,
        "death-blight": true,
    },
    "average-absorption": {
        ...DEFAULT_SORTBY,
        average: true,
        physical: true,
        strike: true,
        slash: true,
        pierce: true,
        magic: true,
        fire: true,
        lightning: true,
        holy: true,
    },
    "total-absorption": {
        ...DEFAULT_SORTBY,
        sum: true,
        physical: true,
        strike: true,
        slash: true,
        pierce: true,
        magic: true,
        fire: true,
        lightning: true,
        holy: true,
    },
    standard: {
        ...DEFAULT_SORTBY,
        sum: true,
        physical: true,
        strike: true,
        slash: true,
        pierce: true,
    },
    physical: {
        ...DEFAULT_SORTBY,
        physical: true,
    },
    strike: {
        ...DEFAULT_SORTBY,
        strike: true,
    },
    slash: {
        ...DEFAULT_SORTBY,
        slash: true,
    },
    pierce: {
        ...DEFAULT_SORTBY,
        pierce: true,
    },
    "average-elemental": {
        ...DEFAULT_SORTBY,
        average: true,
        magic: true,
        fire: true,
        lightning: true,
        holy: true,
    },
    "total-elemental": {
        ...DEFAULT_SORTBY,
        sum: true,
        magic: true,
        fire: true,
        lightning: true,
        holy: true,
    },
    magic: {
        ...DEFAULT_SORTBY,
        magic: true,
    },
    fire: {
        ...DEFAULT_SORTBY,
        fire: true,
    },
    lightning: {
        ...DEFAULT_SORTBY,
        lightning: true,
    },
    holy: {
        ...DEFAULT_SORTBY,
        holy: true,
    },
    "average-resistance": {
        ...DEFAULT_SORTBY,
        average: true,
        poison: true,
        "scarlet-rot": true,
        hemorrhage: true,
        frostbite: true,
        sleep: true,
        madness: true,
        "death-blight": true,
    },
    "total-resistance": {
        ...DEFAULT_SORTBY,
        sum: true,
        poison: true,
        "scarlet-rot": true,
        hemorrhage: true,
        frostbite: true,
        sleep: true,
        madness: true,
        "death-blight": true,
    },
    poison: {
        ...DEFAULT_SORTBY,
        poison: true,
    },
    "scarlet-rot": {
        ...DEFAULT_SORTBY,
        "scarlet-rot": true,
    },
    hemorrhage: {
        ...DEFAULT_SORTBY,
        hemorrhage: true,
    },
    frostbite: {
        ...DEFAULT_SORTBY,
        frostbite: true,
    },
    sleep: {
        ...DEFAULT_SORTBY,
        sleep: true,
    },
    madness: {
        ...DEFAULT_SORTBY,
        madness: true,
    },
    "death-blight": {
        ...DEFAULT_SORTBY,
        "death-blight": true,
    },
    poise: {
        ...DEFAULT_SORTBY,
        poise: true,
    },
    custom: {
        ...DEFAULT_SORTBY,
    },
};

export function resetAll(): void {
    [
        ...(document.getElementsByName(
            "locked-items"
        ) as NodeListOf<HTMLSelectElement>),
    ].forEach((select) => (select.selectedIndex = 0));
}

export function itemStatsToString(item: Armor): string[] {
    let weight = item.weight.toFixed(1);
    let poise = item.poise.toString();
    let standard =
        [
            item.defenses.physical,
            item.defenses.strike,
            item.defenses.slash,
            item.defenses.pierce,
        ]
            .reduce((total, defense) => total + defense, 0.0)
            .toFixed(1) + " Standard, ";
    let physical = item.defenses.physical.toFixed(1) + " Physical, ";
    let strike = item.defenses.strike.toFixed(1) + " Strike, ";
    let slash = item.defenses.slash.toFixed(1) + " Slash, ";
    let pierce = item.defenses.pierce.toFixed(1) + " Pierce, ";
    let elemental =
        [
            item.defenses.magic,
            item.defenses.fire,
            item.defenses.lightning,
            item.defenses.holy,
        ]
            .reduce((total, defense) => total + defense, 0.0)
            .toFixed(1) + " Elemental, ";
    let magic = item.defenses.magic.toFixed(1) + " Magic, ";
    let fire = item.defenses.fire.toFixed(1) + " Fire, ";
    let lightning = item.defenses.lightning.toFixed(1) + " Lightning, ";
    let holy = item.defenses.holy.toFixed(1) + " Holy, ";
    let resistances = Object.values(item.resistances).reduce(
        (total: any, res: any, i: number) =>
            total +
            res +
            " " +
            [
                "Scarlet Rot",
                "Poison",
                "Hemorrhage",
                "Frostbite",
                "Sleep",
                "Madness",
                "Death",
            ][i] +
            ", ",
        ""
    );

    return [
        weight,
        poise,
        standard + physical + strike + slash + pierce,
        elemental + magic + fire + lightning + holy,
        resistances,
    ];
}

export function setStatsToString(set: ArmorSet): string[] {
    let imaginary: Armor = {
        id: "IMAGINARY",
        name: "IMAGINARY",
        weight:
            set.helmet?.weight! +
            set.chestpiece?.weight! +
            set.gauntlets?.weight! +
            set.leggings?.weight!,
        poise:
            set.helmet?.poise! +
            set.chestpiece?.poise! +
            set.gauntlets?.poise! +
            set.leggings?.poise!,
        defenses: {
            physical:
                set.helmet?.defenses.physical! +
                set.chestpiece?.defenses.physical! +
                set.gauntlets?.defenses.physical! +
                set.leggings?.defenses.physical!,
            strike:
                set.helmet?.defenses.strike! +
                set.chestpiece?.defenses.strike! +
                set.gauntlets?.defenses.strike! +
                set.leggings?.defenses.strike!,
            slash:
                set.helmet?.defenses.slash! +
                set.chestpiece?.defenses.slash! +
                set.gauntlets?.defenses.slash! +
                set.leggings?.defenses.slash!,
            pierce:
                set.helmet?.defenses.pierce! +
                set.chestpiece?.defenses.pierce! +
                set.gauntlets?.defenses.pierce! +
                set.leggings?.defenses.pierce!,
            magic:
                set.helmet?.defenses.magic! +
                set.chestpiece?.defenses.magic! +
                set.gauntlets?.defenses.magic! +
                set.leggings?.defenses.magic!,
            fire:
                set.helmet?.defenses.fire! +
                set.chestpiece?.defenses.fire! +
                set.gauntlets?.defenses.fire! +
                set.leggings?.defenses.fire!,
            lightning:
                set.helmet?.defenses.lightning! +
                set.chestpiece?.defenses.lightning! +
                set.gauntlets?.defenses.lightning! +
                set.leggings?.defenses.lightning!,
            holy:
                set.helmet?.defenses.holy! +
                set.chestpiece?.defenses.holy! +
                set.gauntlets?.defenses.holy! +
                set.leggings?.defenses.holy!,
        },
        resistances: {
            "scarlet-rot":
                set.helmet?.resistances["scarlet-rot"]! +
                set.chestpiece?.resistances["scarlet-rot"]! +
                set.gauntlets?.resistances["scarlet-rot"]! +
                set.leggings?.resistances["scarlet-rot"]!,
            poison:
                set.helmet?.resistances.poison! +
                set.chestpiece?.resistances.poison! +
                set.gauntlets?.resistances.poison! +
                set.leggings?.resistances.poison!,
            hemorrhage:
                set.helmet?.resistances.hemorrhage! +
                set.chestpiece?.resistances.hemorrhage! +
                set.gauntlets?.resistances.hemorrhage! +
                set.leggings?.resistances.hemorrhage!,
            frostbite:
                set.helmet?.resistances.frostbite! +
                set.chestpiece?.resistances.frostbite! +
                set.gauntlets?.resistances.frostbite! +
                set.leggings?.resistances.frostbite!,
            sleep:
                set.helmet?.resistances.sleep! +
                set.chestpiece?.resistances.sleep! +
                set.gauntlets?.resistances.sleep! +
                set.leggings?.resistances.sleep!,
            madness:
                set.helmet?.resistances.madness! +
                set.chestpiece?.resistances.madness! +
                set.gauntlets?.resistances.madness! +
                set.leggings?.resistances.madness!,
            "death-blight":
                set.helmet?.resistances["death-blight"]! +
                set.chestpiece?.resistances["death-blight"]! +
                set.gauntlets?.resistances["death-blight"]! +
                set.leggings?.resistances["death-blight"]!,
        },
    };

    return itemStatsToString(imaginary);
}

function fitness(item: Armor, sortBy: string): number {
    switch (sortBy) {
        case "average-absorption":
            return (
                Object.values(item.defenses).reduce(
                    (total: any, n) => total + n,
                    0
                ) / DEFENSES_COUNT
            );
        case "total-absorption":
            return (
                Object.values(item.defenses).reduce(
                    (total: any, n) => total + n,
                    0
                ) ?? 0
            );
        case "standard":
            return (
                [
                    item.defenses.physical,
                    item.defenses.strike,
                    item.defenses.slash,
                    item.defenses.pierce,
                ].reduce((total, n) => total + n, 0) ?? 0
            );
        case "sort-physical":
            return item.defenses.physical ?? 0;
        case "sort-strike":
            return item.defenses.strike ?? 0;
        case "sort-slash":
            return item.defenses.slash ?? 0;
        case "sort-pierce":
            return item.defenses.pierce ?? 0;
        case "sort-elemental":
            return (
                [
                    item.defenses.magic,
                    item.defenses.fire,
                    item.defenses.lightning,
                    item.defenses.holy,
                ].reduce((total, n) => total + n, 0) ?? 0
            );
        case "sort-magic":
            return item.defenses.magic ?? 0;
        case "sort-fire":
            return item.defenses.fire ?? 0;
        case "sort-lightning":
            return item.defenses.lightning ?? 0;
        case "sort-holy":
            return item.defenses.holy ?? 0;
        case "sort-resistances":
            return (
                Object.values(item.resistances).reduce(
                    (total, n) => total + n,
                    0
                ) ?? 0
            );
        case "sort-scarlet-rot":
            return item.resistances["scarlet-rot"] ?? 0;
        case "sort-poison":
            return item.resistances.poison ?? 0;
        case "sort-hemorrhage":
            return item.resistances.hemorrhage ?? 0;
        case "sort-frostbite":
            return item.resistances.frostbite ?? 0;
        case "sort-sleep":
            return item.resistances.sleep ?? 0;
        case "sort-madness":
            return item.resistances.madness ?? 0;
        case "sort-death":
            return item.resistances["death-blight"] ?? 0;
        case "sort-poise":
            return item.poise ?? 0;
        // case "sort-custom":
        //     return (
        //         [item.defenses.physical * 0.5, item.defenses.holy].reduce(
        //             (total, n) => total + n,
        //             0
        //         ) ?? 0
        //     );
        default:
            return -1;
    }
}

function armorSetContains(set: ArmorSet, item: Armor): boolean {
    return (
        set.helmet?.id === item.id ||
        set.chestpiece?.id === item.id ||
        set.gauntlets?.id === item.id ||
        set.leggings?.id === item.id
    );
}

export function dominated(
    itemList: Armor[],
    lockedItems: ArmorSet,
    ignoredItems: Armor[],
    sortBy: string
): Armor[] {
    if (itemList.some((item: Armor) => armorSetContains(lockedItems, item))) {
        return [
            itemList.find((item: any) => armorSetContains(lockedItems, item))!,
        ];
    }

    // remove ignored items from itemList
    itemList = itemList.filter(
        (item: Armor) => !ignoredItems.some((i) => i.id === item.id)
    );

    let sorted = [...itemList];
    sorted.sort((a, b) => a.weight - b.weight);

    let approved: Armor[] = [];
    sorted.forEach((item) => {
        if (
            !approved.some(
                (other) => fitness(item, sortBy) <= fitness(other, sortBy)
            )
        ) {
            approved.push(item);
        }
    });

    return approved;
}

export function knapSack(
    equipLoadBudget: number,
    helmets: Armor[],
    chestpieces: Armor[],
    gauntlets: Armor[],
    leggings: Armor[],
    sortBy: string
): ArmorSet[] {
    // Convert max equip load to integer by multiplying by 10
    const equipLoadBudgetInt = Math.floor(equipLoadBudget * 10);

    // Initialize Dynamic Programming table
    const dp: ArmorSet[][] = Array(5)
        .fill(0)
        .map(() =>
            Array(equipLoadBudgetInt + 1)
                .fill(null)
                .map(() => {
                    let set: ArmorSet = {};
                    set.weight = 0;
                    set.fitness = 0;
                    return set;
                })
        );

    const equipment = [helmets, chestpieces, gauntlets, leggings];
    // Fill DP table
    for (let i = 0; i < 4; i++) {
        const armorArr = equipment[i];

        for (const armor of armorArr) {
            // Convert piece weight to integer
            const armorWeight = armor.weight;
            const armorWeightInt = Math.round(armorWeight * 10);
            const armorStat = fitness(armor, sortBy);

            for (
                let wInt = equipLoadBudgetInt;
                wInt >= armorWeightInt;
                wInt--
            ) {
                if (
                    dp[i][wInt - armorWeightInt].weight! + armorWeight <=
                    equipLoadBudgetInt
                ) {
                    const newFitness =
                        dp[i][wInt - armorWeightInt].fitness! + armorStat;
                    if (newFitness > dp[i + 1][wInt].fitness!) {
                        // helmet
                        dp[i + 1][wInt].helmet =
                            i === 0
                                ? armor
                                : dp[i][wInt - armorWeightInt].helmet ??
                                  HELMETS[0];
                        // chestpiece
                        dp[i + 1][wInt].chestpiece =
                            i === 1
                                ? armor
                                : dp[i][wInt - armorWeightInt].chestpiece ??
                                  CHESTPIECES[0];
                        // gauntlets
                        dp[i + 1][wInt].gauntlets =
                            i === 2
                                ? armor
                                : dp[i][wInt - armorWeightInt].gauntlets ??
                                  GAUNTLETS[0];
                        // leggings
                        dp[i + 1][wInt].leggings =
                            i === 3
                                ? armor
                                : dp[i][wInt - armorWeightInt].leggings ??
                                  LEGGINGS[0];
                        // fitness
                        dp[i + 1][wInt].fitness = newFitness;
                        // weight
                        dp[i + 1][wInt].weight =
                            dp[i][wInt - armorWeightInt].weight! + armorWeight;
                    }
                }
            }
        }

        // Carry forward the best set from the previous category without adding a new piece
        for (let w = 0; w <= equipLoadBudgetInt; w++) {
            if (dp[i + 1][w].fitness! < dp[i][w].fitness!) {
                dp[i + 1][w] = dp[i][w];
            }
        }
    }

    // Extract top 3 sets
    const topSets: ArmorSet[] = [];
    for (let wInt = equipLoadBudgetInt; wInt >= 0; wInt--) {
        if (dp[4][wInt].fitness! > 0) {
            let duplicate = false;
            for (const set of topSets) {
                if (
                    dp[4][wInt].helmet === set.helmet &&
                    dp[4][wInt].chestpiece === set.chestpiece &&
                    dp[4][wInt].gauntlets === set.gauntlets &&
                    dp[4][wInt].leggings === set.leggings
                ) {
                    duplicate = true;
                    break;
                }
            }
            if (duplicate) continue;
            topSets.push(dp[4][wInt]);
            if (topSets.length === 3) break;
        }
    }

    return topSets;
}
