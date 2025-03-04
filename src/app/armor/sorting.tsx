import Armor from "../util/types/armor";
import DefensesMap, { DefensesMapKey } from "../util/types/defensesMap";
import ResistancesMap, {
    ResistancesMapKey,
} from "../util/types/resistancesMap";
import { SortByGeneric } from "../util/types/sortBy";

type SortByModeKey =
    | "total"
    | "total-absorption"
    | "total-standard"
    | "total-elemental"
    | DefensesMapKey
    | "total-resistance"
    | ResistancesMapKey
    | "poise"
    | "custom";
type SortByKey =
    | "children"
    | "average"
    | "sum"
    | "coefficient"
    | "addend"
    | DefensesMapKey
    | ResistancesMapKey
    | "poise";
type SortBy = SortByGeneric &
    DefensesMap<boolean> &
    ResistancesMap<boolean> & {
        poise: boolean;
        label: string;
    };

const DEFAULT_SORTBY: SortBy = {
    label: "Default",
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
const SELECTABLE_SORTING_FIELDS_ARRAY: string[] = [
    "physical",
    "strike",
    "slash",
    "pierce",
    "magic",
    "fire",
    "lightning",
    "holy",
    "poison",
    "scarlet-rot",
    "hemorrhage",
    "frostbite",
    "sleep",
    "madness",
    "death-blight",
    "poise",
] as const;
const SELECTABLE_SORTING_FIELDS_SET = new Set(SELECTABLE_SORTING_FIELDS_ARRAY);
export const SORTBY_MODES: { [K in SortByModeKey]: SortBy } = {
    total: {
        ...DEFAULT_SORTBY,
        label: "Total of All Absorptions and Resistances",
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
    "total-absorption": {
        ...DEFAULT_SORTBY,
        label: "Total of All Absorptions",
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
    "total-standard": {
        ...DEFAULT_SORTBY,
        label: "Total of All Standard Absorptions",
        sum: true,
        physical: true,
        strike: true,
        slash: true,
        pierce: true,
    },
    physical: {
        ...DEFAULT_SORTBY,
        label: "Physical Absorption",
        physical: true,
    },
    strike: {
        ...DEFAULT_SORTBY,
        label: "Strike Absorption",
        strike: true,
    },
    slash: {
        ...DEFAULT_SORTBY,
        label: "Slash Absorption",
        slash: true,
    },
    pierce: {
        ...DEFAULT_SORTBY,
        label: "Pierce Absorption",
        pierce: true,
    },
    "total-elemental": {
        ...DEFAULT_SORTBY,
        label: "Total of All Elemental Absorptions",
        sum: true,
        magic: true,
        fire: true,
        lightning: true,
        holy: true,
    },
    magic: {
        ...DEFAULT_SORTBY,
        label: "Magic Absorption",
        magic: true,
    },
    fire: {
        ...DEFAULT_SORTBY,
        label: "Fire Absorption",
        fire: true,
    },
    lightning: {
        ...DEFAULT_SORTBY,
        label: "Lightning Absorption",
        lightning: true,
    },
    holy: {
        ...DEFAULT_SORTBY,
        label: "Holy Absorption",
        holy: true,
    },
    "total-resistance": {
        ...DEFAULT_SORTBY,
        label: "Total of All Resistances",
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
        label: "Poison Resistance",
        poison: true,
    },
    "scarlet-rot": {
        ...DEFAULT_SORTBY,
        label: "Scarlet Rot Resistance",
        "scarlet-rot": true,
    },
    hemorrhage: {
        ...DEFAULT_SORTBY,
        label: "Hemorrhage Resistance",
        hemorrhage: true,
    },
    frostbite: {
        ...DEFAULT_SORTBY,
        label: "Frostbite Resistance",
        frostbite: true,
    },
    sleep: {
        ...DEFAULT_SORTBY,
        label: "Sleep Resistance",
        sleep: true,
    },
    madness: {
        ...DEFAULT_SORTBY,
        label: "Madness Resistance",
        madness: true,
    },
    "death-blight": {
        ...DEFAULT_SORTBY,
        label: "Death Blight Resistance",
        "death-blight": true,
    },
    poise: {
        ...DEFAULT_SORTBY,
        label: "Poise",
        poise: true,
    },
    custom: {
        ...DEFAULT_SORTBY,
        label: "Custom",
    },
};

function isSelectableSortingField(field: string): boolean {
    return SELECTABLE_SORTING_FIELDS_SET.has(field);
}

function countSelectedSortingFields(sortBy: SortBy): number {
    let count = 0;
    for (const key in sortBy) {
        if (isSelectableSortingField(key) && sortBy[key as SortByKey])
            count += 1;
    }
    return count;
}

export function evaluateSortBy(sortBy: SortBy, armor: Armor): number {
    // errors
    const LOGGING: boolean = false;

    // assert average and sum cannot be true at the same time
    if (LOGGING)
        console.log("average: ", sortBy.average, "\nsum: ", sortBy.sum);
    if (sortBy.average && sortBy.sum) {
        throw new Error("Cannot have both average and sum");
    }

    const SELECTED_FIELDS_COUNT = countSelectedSortingFields(sortBy);
    const CHILDREN_COUNT = sortBy.children.length;
    if (LOGGING)
        console.log(
            "selected fields: ",
            SELECTED_FIELDS_COUNT,
            "\nchildren: ",
            CHILDREN_COUNT
        );

    // if average or sum is true, assert at least 2 values
    if (SELECTED_FIELDS_COUNT + CHILDREN_COUNT < 2) {
        if (sortBy.average) {
            throw new Error("Cannot have average without at least 2 values");
        }
        if (sortBy.sum) {
            throw new Error("Cannot have sum without at least 2 values");
        }
    }

    // if average and sum are false, assert at most 1 value
    if (!sortBy.average && !sortBy.sum) {
        if (SELECTED_FIELDS_COUNT + CHILDREN_COUNT > 1) {
            throw new Error(
                "Cannot have more than 1 value without average or sum"
            );
        }
    }

    if (LOGGING) console.log("no errors!");

    // evaluate children
    if (LOGGING) console.log("children: ", sortBy.children);
    let childrenValues: number[] = [];
    for (const child of sortBy.children as SortBy[]) {
        childrenValues.push(evaluateSortBy(child, armor));
    }

    // if average is selected
    // average the children and every selected field
    let result: number = 0;
    if (sortBy.average) {
        let denominator = SELECTED_FIELDS_COUNT + CHILDREN_COUNT;
        let numerator = 0;

        // add children values to the numerator
        for (const value of childrenValues) {
            numerator += value;
        }

        // add selected field values to the numerator
        for (const key in sortBy) {
            if (LOGGING)
                console.log(
                    "key: ",
                    key,
                    "\nis selectable: ",
                    isSelectableSortingField(key),
                    "\nis defense: ",
                    armor.defenses[key as DefensesMapKey],
                    "\nis resistance: ",
                    armor.resistances[key as ResistancesMapKey],
                    "\nvalue: ",
                    sortBy[key as SortByKey]
                );
            if (isSelectableSortingField(key) && sortBy[key as SortByKey]) {
                // if defense
                if (armor.defenses[key as DefensesMapKey]) {
                    numerator += armor.defenses[key as DefensesMapKey]!;
                }
                // if resistance
                if (armor.resistances[key as ResistancesMapKey]) {
                    numerator += armor.resistances[key as ResistancesMapKey]!;
                }
                // if poise
                if (key === "poise") {
                    numerator += armor.poise!;
                }
            }
        }

        result += numerator / denominator;
        if (LOGGING) console.log("average: ", result);
    }

    // else if sum is selected
    // sum the children and every selected field
    else if (sortBy.sum) {
        // add children values
        for (const value of childrenValues) {
            result += value;
        }

        // add selected field values
        for (const key in sortBy) {
            if (LOGGING)
                console.log(
                    "key: ",
                    key,
                    "\nis selectable: ",
                    isSelectableSortingField(key),
                    "\nis defense: ",
                    armor.defenses[key as DefensesMapKey],
                    "\nis resistance: ",
                    armor.resistances[key as ResistancesMapKey],
                    "\nvalue: ",
                    sortBy[key as SortByKey]
                );
            if (isSelectableSortingField(key) && sortBy[key as SortByKey]) {
                // if defense
                if (armor.defenses[key as DefensesMapKey]) {
                    result += armor.defenses[key as DefensesMapKey]!;
                }
                // if resistance
                if (armor.resistances[key as ResistancesMapKey]) {
                    result += armor.resistances[key as ResistancesMapKey]!;
                }
                // if poise
                if (key === "poise") {
                    result += armor.poise!;
                }
            }
        }

        if (LOGGING) console.log("sum: ", result);
    }

    // if neither average nor sum is selected
    // get the value of the selected field or child
    else {
        for (const key in sortBy) {
            if (isSelectableSortingField(key) && sortBy[key as SortByKey]) {
                // if defense
                if (armor.defenses[key as DefensesMapKey]) {
                    result += armor.defenses[key as DefensesMapKey]!;
                }
                // if resistance
                if (armor.resistances[key as ResistancesMapKey]) {
                    result += armor.resistances[key as ResistancesMapKey]!;
                }
                // if poise
                if (key === "poise") {
                    result += armor.poise!;
                }
            }
        }

        if (LOGGING) console.log("value: ", result);
    }

    // multiply coefficient
    if (LOGGING) console.log("coefficient: ", sortBy.coefficient);
    result *= sortBy.coefficient;
    if (LOGGING) console.log("result: ", result);

    // add addend
    if (LOGGING) console.log("addend: ", sortBy.addend);
    result += sortBy.addend;
    if (LOGGING) console.log("result: ", result);

    return result;
}

export function testSortBy(armor: Armor): void {
    for (const key in SORTBY_MODES) {
        console.log(key);
        const sortBy = SORTBY_MODES[key as keyof typeof SORTBY_MODES];
        evaluateSortBy(sortBy, armor);
    }
}
