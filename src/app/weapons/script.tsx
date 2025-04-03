import { JSX } from "react/jsx-runtime";
import {
    ATTACK_POWER_STAT_IDS,
    ATTACK_POWER_TYPE_IDS,
    ATTACK_POWER_TYPE_MODE_ALL,
    ATTACK_POWER_TYPE_MODE_ANY,
    ATTACK_POWER_TYPE_MODE_EXACTLY,
    BOW_CATEGORY_IDS,
    CORRECTIONS,
    DAMAGE_IDS,
    DEFAULT_ATTACK_POWER_TYPE_MAP_BOOLEAN,
    DEFAULT_ATTACK_POWER_TYPE_MAP_NUMBER,
    DEFAULT_ATTACK_RATING_BREAKDOWN,
    DEFAULT_STAT_MAP_BOOLEAN,
    DEFAULT_STAT_MAP_NUMBER,
    DEFAULT_WEAPON_RESULT,
    INEFFECTIVE_STAT_PENALTY,
    INFUSIONS,
    WEAPONS,
} from "../util/constants";
import AttackPowerTypeMap, {
    AttackPowerTypeMapKey,
} from "../util/types/attackPowerTypeMap";
import CategoryMap from "../util/types/categoryMap";
import { CalcCorrectGraph } from "../util/types/correction";
import InfusionMap, { InfusionMapKey } from "../util/types/infusionMap";
import StatMap, { StatMapKey } from "../util/types/statMap";
import Weapon from "../util/types/weapon";
import WeaponInfusion from "../util/types/weaponInfusion";
import { WeaponResultRow } from "./components/WeaponResultRow";

// TYPES
export type AttackRatingBreakdown = {
    baseDmg: AttackPowerTypeMap<number>;
    scalingDmg: AttackPowerTypeMap<number>;
};
export type InfusionMapAttackRatingBreakdown =
    InfusionMap<AttackRatingBreakdown>;
export type WeaponResult = {
    weaponName: string;
    attackRatings: InfusionMap<number>;
    max: number;
    arBreakdown: InfusionMapAttackRatingBreakdown;
    spellScaling: number;
};
export type SortByWeapon = {
    dmgType: InfusionMapKey | "max";
    desc: boolean;
};

// HELPER FUNCTIONS
const isSplitDamage = (dmg: AttackPowerTypeMap<number>): boolean => {
    let temp: AttackPowerTypeMap<number> = {
        physical: dmg.physical,
        magic: dmg.magic,
        fire: dmg.fire,
        lightning: dmg.lightning,
        holy: dmg.holy,
    };
    return (
        Object.values(temp).reduce(
            (dmgTypes: number, dmg: number | undefined) => {
                return dmg! > 0 ? dmgTypes + 1 : dmgTypes;
            },
            0
        )! > 1
    );
};

const anyAttackPowerTypes = (
    dmg: AttackPowerTypeMap<number>,
    attackPowerTypes: AttackPowerTypeMap<boolean>,
    attackPowerTypesInclude: boolean
): boolean => {
    let result: boolean = Object.entries(dmg).some(
        ([key, value]: [string, number]) =>
            attackPowerTypes[key as AttackPowerTypeMapKey] && value
    );
    return attackPowerTypesInclude ? result : !result;
};

/**
 * Returns true if all attack power types in `attackPowerTypes` are included in `dmg`
 * and have a value greater than 0, and false otherwise. If
 * `attackPowerTypesInclude` is false, the result is inverted.
 * @param {AttackPowerTypeMap<number>} dmg - a weapon's attack ratings
 * @param {AttackPowerTypeMap<boolean>} attackPowerTypes - the user's selected attack power types
 * @param {boolean} attackPowerTypesInclude - whether to return true or false if
 * all attack power types are included
 * @returns {boolean} true if all attack power types are included, false otherwise
 */
const allAttackPowerTypes = (
    dmg: AttackPowerTypeMap<number>,
    attackPowerTypes: AttackPowerTypeMap<boolean>,
    attackPowerTypesInclude: boolean
): boolean => {
    let result: boolean = true;

    // if there are no selected attack power types, return false
    if (!(Object.values(attackPowerTypes) as boolean[]).includes(true)) {
        result = false;
    } else {
        // else, return true if all selected attack power types have a value greater than 0
        result = Object.entries(dmg).every(([key, value]: [string, number]) =>
            attackPowerTypes[key as AttackPowerTypeMapKey] ? value! > 0 : true
        ) as boolean;
    }
    return attackPowerTypesInclude ? result : !result;
};

/**
 * Determines if the attack power types in `dmg` exactly match the selected
 * `attackPowerTypes` and have the corresponding values. If `attackPowerTypesInclude`
 * is false, the result is inverted.
 *
 * @param {AttackPowerTypeMap<number>} dmg - A map of attack power types and their values.
 * @param {AttackPowerTypeMap<boolean>} attackPowerTypes - The user's selected attack power types.
 * @param {boolean} attackPowerTypesInclude - Whether to return true if the match is exact.
 * @returns {boolean} - True if the attack power types match exactly, false otherwise.
 */

const exactlyAttackPowerTypes = (
    dmg: AttackPowerTypeMap<number>,
    attackPowerTypes: AttackPowerTypeMap<boolean>,
    attackPowerTypesInclude: boolean
): boolean => {
    let result: boolean = Object.entries(attackPowerTypes).every(
        ([key, value]: [string, boolean]) =>
            value
                ? dmg[key as AttackPowerTypeMapKey]! > 0
                : dmg[key as AttackPowerTypeMapKey]! == 0 ||
                  dmg[key as AttackPowerTypeMapKey]! == undefined
    ) as boolean;
    return attackPowerTypesInclude ? result : !result;
};

// FUNCTIONS

/**
 * Applies corrections to a set of stats based on the given calc graph.
 * The corrections are applied by linearly interpolating between the
 * growth values of the graph stages, using the stat value as the
 * interpolation parameter. The interpolation is adjusted by the
 * adjustment value of each stage, which is interpreted as a power
 * to which the interpolation ratio is raised.
 *
 * @param calc The correction graph to use. Defaults to the first
 * graph in CORRECTIONS.
 * @param stats The stats to apply the corrections to.
 * @param masks A map of stat IDs to booleans, indicating whether
 * the correction should be applied to the stat. If the value is
 * false, the stat will not be corrected.
 * @returns The corrected stats.
 */
function corrections(
    calc: CalcCorrectGraph[] = CORRECTIONS[0],
    stats: StatMap<number>,
    masks: StatMap<boolean>
): StatMap<number> {
    // initialize result
    const result: StatMap<number> = { ...DEFAULT_STAT_MAP_NUMBER };

    // for each stat
    Object.entries(stats).forEach(
        ([statId, statVal]: [string, number | undefined]) => {
            // if the stat should be corrected
            if (masks[statId as StatMapKey]) {
                // find the stage that the stat is in
                let index = calc.findIndex((stage) => stage.softcap > statVal!);
                // if the stat is outside of the graph, use the last stage
                index == -1 ? (index = calc.length - 1) : index;

                // identify the stage
                const stage: CalcCorrectGraph = calc[index];
                // identify the previous stage
                const prevStage: CalcCorrectGraph = calc[index - 1];

                // calculate the interpolation ratio
                // this is the ratio of the distance between the stat value
                // and the previous stage's softcap and the distance between
                // the previous stage's softcap and the current stage's softcap
                let ratio: number = Math.max(
                    0,
                    Math.min(
                        1,
                        (statVal! - prevStage.softcap) /
                            (stage.softcap - prevStage.softcap)
                    )
                );

                // apply the adjustment
                if (prevStage.adjustment > 0) {
                    ratio = ratio ** prevStage.adjustment;
                } else if (prevStage.adjustment < 0) {
                    ratio = 1 - (1 - ratio) ** -prevStage.adjustment;
                }

                // apply the correction
                result[statId as StatMapKey] =
                    prevStage.growth +
                    (stage.growth - prevStage.growth) * ratio;
            }
        }
    );

    return result;
}

function adjustStatsForTwoHanding(
    twoHanded: boolean,
    weapon: Weapon,
    stats: StatMap<number>
): StatMap<number> {
    let twoHandingBonus = twoHanded;

    // Paired weapons do not get the two handing bonus
    if (weapon.paired) {
        twoHandingBonus = false;
    }

    // Bows and ballistae can only be two handed
    if (BOW_CATEGORY_IDS.includes(weapon.category)) {
        twoHandingBonus = true;
    }

    if (twoHandingBonus) {
        return {
            ...stats,
            STR: Math.floor(stats.STR * 1.5),
        };
    }

    return stats;
}

function slopeInterceptGivenX(
    slope: number,
    intercept: number,
    x: number
): number {
    return slope * x + intercept;
}

function calculateIneffectiveStats(
    stats: StatMap<number>,
    requirements: StatMap<number>
): StatMap<boolean> {
    let results: StatMap<boolean> = { ...DEFAULT_STAT_MAP_BOOLEAN };
    Object.entries(stats).forEach(([statId, statVal]: [string, number]) => {
        if (requirements[statId as StatMapKey]! > statVal!) {
            results[statId as StatMapKey] = true;
        }
    });

    return results;
}

function calculateBaseAttackPowerRating(
    isDamageType: boolean,
    attackPowerType: AttackPowerTypeMapKey,
    weaponInfusion: WeaponInfusion,
    weapon: Weapon,
    infId: string,
    upgLevel: number,
    upgraded: boolean
): number {
    if (isDamageType) {
        return (
            weaponInfusion.damage[attackPowerType]! *
            (weapon.id === "unarmed"
                ? 1
                : // calculate upgrade rate based on upgrade level
                  slopeInterceptGivenX(
                      INFUSIONS[infId].damageUpgradeRate[attackPowerType]
                          ?.slope!,
                      INFUSIONS[infId].damageUpgradeRate[attackPowerType]
                          ?.intercept!,
                      upgLevel
                  ))
        );
    } else {
        return weaponInfusion.aux?.[attackPowerType][upgraded ? 1 : 0];
    }
}

function attackPower(
    weapon: Weapon,
    infId: InfusionMapKey,
    upgraded: boolean,
    stats: StatMap<number>,
    twoHanded: boolean,
    splitDamage: boolean,
    attackPowerTypesInclude: boolean,
    attackPowerTypeMode: string,
    attackPowerTypes: AttackPowerTypeMap<boolean>,
    statusEffects: boolean
): WeaponResult {
    let inf = INFUSIONS[infId];
    let result: WeaponResult = { ...DEFAULT_WEAPON_RESULT };
    result.weaponName = weapon.name;
    result.arBreakdown[infId] = { ...DEFAULT_ATTACK_RATING_BREAKDOWN };

    // initialize weapon infusion
    let weaponInfusion: WeaponInfusion = weapon.infusions[infId]!;

    // initialize upgrade level
    let upgLevel: number = upgraded ? (weapon.infusions.unique ? 10 : 25) : 0;

    // adjust stats for two handing
    const adjustedStats: StatMap<number> = adjustStatsForTwoHanding(
        twoHanded,
        weapon,
        stats
    );

    // calculate ineffective stats
    const ineffectiveStats: StatMap<boolean> = calculateIneffectiveStats(
        adjustedStats,
        weapon.requirements
    );

    // initialize ineffective attack power types
    let ineffectiveAttackPowerTypes: AttackPowerTypeMap<boolean> = {
        ...DEFAULT_ATTACK_POWER_TYPE_MAP_BOOLEAN,
    };

    // initialize base attack rating
    let baseAttackRating: AttackPowerTypeMap<number> = {
        ...DEFAULT_ATTACK_POWER_TYPE_MAP_NUMBER,
    };

    // initialize scaling attack rating
    let scalingAttackRating: AttackPowerTypeMap<number> = {
        ...DEFAULT_ATTACK_POWER_TYPE_MAP_NUMBER,
    };

    // initialize spell scaling
    let spellScaling: AttackPowerTypeMap<number> = {
        ...DEFAULT_ATTACK_POWER_TYPE_MAP_NUMBER,
    };

    // for each attack power type
    for (const attackPowerType of ATTACK_POWER_TYPE_IDS) {
        // determine if this attack power type is damage
        const isDamageType: boolean = DAMAGE_IDS.includes(attackPowerType);

        // calculate base attack rating
        // all damage types get calculated
        // but only applicable auxiliaries get calculated
        if (isDamageType || weaponInfusion.aux?.[attackPowerType]) {
            baseAttackRating[attackPowerType] = calculateBaseAttackPowerRating(
                isDamageType,
                attackPowerType,
                weaponInfusion,
                weapon,
                infId,
                upgLevel,
                upgraded
            );
        }

        if (
            baseAttackRating[attackPowerType] ||
            weapon["glintstone-staff"] ||
            weapon["sacred-seal"]
        ) {
            // determine scaling stats
            const scalingStats: StatMap<boolean> =
                weaponInfusion.masks[attackPowerType]!;

            let totalScaling: number = 1;

            if (Object.values(ineffectiveStats).includes(true)) {
                // If the requirements for this damage type are not met, a penalty is subtracted instead of a scaling bonus being added
                totalScaling = 1 - INEFFECTIVE_STAT_PENALTY;
                ineffectiveAttackPowerTypes[attackPowerType] = true;
            } else {
                // Otherwise, the scaling multiplier is equal to the sum of the corrected attribute values multiplied by the scaling for that attribute
                const effectiveStats: StatMap<number> = isDamageType
                    ? adjustedStats
                    : stats;
                let correctionIndex: number = parseInt(
                    weaponInfusion.corrections[attackPowerType] as string
                );
                let statScaling: StatMap<number> = corrections(
                    CORRECTIONS[correctionIndex],
                    effectiveStats,
                    scalingStats
                );
                for (const statId of ATTACK_POWER_STAT_IDS) {
                    const statCorrect: boolean = scalingStats[statId]!;
                    if (statCorrect) {
                        let scaling: number =
                            weaponInfusion.scaling[statId]! *
                            inf.statScalingRate[statId]![upgLevel]!;

                        totalScaling += statScaling[statId]! * scaling;
                    }
                }
            }

            // The final scaling multiplier modifies the attack power for this damage type as a percentage boost, e.g. 0.5 adds +50% of the base attack power
            if (baseAttackRating[attackPowerType]) {
                scalingAttackRating[attackPowerType] =
                    baseAttackRating[attackPowerType] * totalScaling -
                    baseAttackRating[attackPowerType];
            }

            if (
                isDamageType &&
                (weapon["glintstone-staff"] || weapon["sacred-seal"])
            ) {
                spellScaling[attackPowerType] = 100 * totalScaling;
            }
        }
    }

    // if weapon is split damage and split damage is disallowed, set base damage to 0
    if (isSplitDamage(baseAttackRating) && !splitDamage) {
        baseAttackRating = { ...DEFAULT_ATTACK_POWER_TYPE_MAP_NUMBER };
        scalingAttackRating = { ...DEFAULT_ATTACK_POWER_TYPE_MAP_NUMBER };
    }

    let matchesDamageTypes: boolean = checkDamageTypesAreAllowed(
        weapon,
        attackPowerTypeMode,
        attackPowerTypes,
        attackPowerTypesInclude
    );

    // if weapon does not match damage types, set base damage to 0
    if (!matchesDamageTypes) {
        baseAttackRating = { ...DEFAULT_ATTACK_POWER_TYPE_MAP_NUMBER };
        scalingAttackRating = { ...DEFAULT_ATTACK_POWER_TYPE_MAP_NUMBER };
    }

    result.attackRatings = {
        [infId]: Math.floor(
            (Object.entries(baseAttackRating) as [string, number][]).reduce(
                (sum: [string, number], n: [string, number]) =>
                    statusEffects ||
                    (n[0] != "blood" &&
                        n[0] != "poison" &&
                        n[0] != "frost" &&
                        n[0] != "scarlet-rot" &&
                        n[0] != "madness" &&
                        n[0] != "sleep")
                        ? ["", sum[1] + n[1]]
                        : sum
            )[1] +
                (
                    Object.entries(scalingAttackRating) as [string, number][]
                ).reduce((sum: [string, number], n: [string, number]) =>
                    statusEffects ||
                    (n[0] != "blood" &&
                        n[0] != "poison" &&
                        n[0] != "frost" &&
                        n[0] != "scarlet-rot" &&
                        n[0] != "madness" &&
                        n[0] != "sleep")
                        ? ["", sum[1] + n[1]]
                        : sum
                )[1]
        ),
    };
    result.arBreakdown[infId]!.baseDmg = baseAttackRating;
    result.arBreakdown[infId]!.scalingDmg = scalingAttackRating;
    result.spellScaling = Object.values(spellScaling).reduce(
        (sum: number | undefined, n: number | undefined) => sum! + n!,
        0
    );

    return result;
}

function checkStatRequirementsMet(
    weapon: Weapon,
    stats: StatMap<number>,
    twoHanded: boolean,
    requireStats: boolean
): boolean {
    // check all stats except for STR
    return (
        (Object.keys(weapon.requirements) as StatMapKey[]).every(
            (statName: StatMapKey) =>
                // if the stat is STR
                statName == "STR"
                    ? // and if the weapon is using two handed damage
                      twoHanded || BOW_CATEGORY_IDS.includes(weapon.category)
                        ? // then use the two handing formula for STR
                          stats["STR"] * 1.5 >= weapon.requirements["STR"]
                        : // else use the one handed formula for STR
                          stats["STR"] >= weapon.requirements["STR"]
                    : stats[statName]! >= weapon.requirements[statName]!
        ) ||
        // or ignore stats if not required
        !requireStats
    );
}

function checkInfusionIsAllowed(
    weapon: Weapon,
    allowedInfusions: InfusionMap<boolean>
): boolean {
    // if the weapon has an infusion that is allowed
    return Object.entries(weapon.infusions).some(
        ([infId, infusion]: [string, WeaponInfusion]) =>
            allowedInfusions[infId as InfusionMapKey] &&
            Object.values(infusion?.damage!).some((d) => d! > 0)
    );
}

function getDefaultDamage(weapon: Weapon): AttackPowerTypeMap<number> {
    // if the weapon is unique, return the unique damage
    // otherwise return the standard damage
    return weapon.infusions.unique
        ? weapon.infusions.unique!.damage
        : weapon.infusions.standard!.damage;
}

function checkSplitDamageIsAllowed(
    weapon: Weapon,
    allowSplitDamage: boolean
): boolean {
    var result: boolean = true;
    // if the weapon is split damage (a way to filter out some split damage weapons early is to check if the weapon's default infusion is split)
    if (isSplitDamage(getDefaultDamage(weapon))) {
        // then defer to whether split damage is allowed
        result = allowSplitDamage;
    }

    return result;
}

function checkDamageTypesAreAllowed(
    weapon: Weapon,
    attackPowerTypeMode: string,
    attackPowerTypes: AttackPowerTypeMap<boolean>,
    attackPowerTypesInclude: boolean
): boolean {
    var damage: AttackPowerTypeMap<number> = getDefaultDamage(weapon);
    var result: boolean = true;

    switch (attackPowerTypeMode) {
        case ATTACK_POWER_TYPE_MODE_ANY:
            result = anyAttackPowerTypes(
                damage,
                attackPowerTypes,
                attackPowerTypesInclude
            );
            break;
        case ATTACK_POWER_TYPE_MODE_ALL:
            result = allAttackPowerTypes(
                damage,
                attackPowerTypes,
                attackPowerTypesInclude
            );
            break;
        case ATTACK_POWER_TYPE_MODE_EXACTLY:
            result = exactlyAttackPowerTypes(
                damage,
                attackPowerTypes,
                attackPowerTypesInclude
            );
    }

    return result;
}

function filterWeapons(
    stats: StatMap<number>,
    twoHanded: boolean,
    requireStats: boolean,
    categories: CategoryMap<boolean>,
    allowedInfusions: InfusionMap<boolean>,
    buffableOnly: boolean,
    allowSplitDamage: boolean,
    attackPowerTypesInclude: boolean,
    attackPowerTypeMode: string,
    attackPowerTypes: AttackPowerTypeMap<boolean>
): Weapon[] {
    return WEAPONS.filter((weapon) => {
        // filter out weapons that don't fit the current parameters
        return (
            checkStatRequirementsMet(weapon, stats, twoHanded, requireStats) &&
            // and if the weapon's category is allowed
            categories[weapon.category] &&
            // and if the weapon's infusion is allowed
            checkInfusionIsAllowed(weapon, allowedInfusions) &&
            // and if the weapon is buffable or buffable is not required
            (!buffableOnly ||
                Object.values(weapon.infusions).some((inf) => inf?.buffable)) &&
            // and if the weapon is split damage (a way to filter out some split damage weapons early is to check if the weapon's default infusion is split)
            checkSplitDamageIsAllowed(weapon, allowSplitDamage) &&
            // and if the weapon's default damage contains selected damage types
            (weapon.infusions.unique
                ? checkDamageTypesAreAllowed(
                      weapon,
                      attackPowerTypeMode,
                      attackPowerTypes,
                      attackPowerTypesInclude
                  )
                : true)
        );
    });
}

export function mapWeapons(
    stats: StatMap<number>,
    twoHanded: boolean,
    requireStats: boolean,
    categories: CategoryMap<boolean>,
    infusions: InfusionMap<boolean>,
    buffableOnly: boolean,
    allowSplitDamage: boolean,
    attackPowerTypesInclude: boolean,
    attackPowerTypeMode: string,
    attackPowerTypes: AttackPowerTypeMap<boolean>,
    reinforced: boolean,
    considerStatusEffects: boolean
): WeaponResult[] {
    return filterWeapons(
        stats,
        twoHanded,
        requireStats,
        categories,
        infusions,
        buffableOnly,
        allowSplitDamage,
        attackPowerTypesInclude,
        attackPowerTypeMode,
        attackPowerTypes
    ).map((weapon) => {
        // calculate attack ratings for every allowed infusion as well as the maximum damage of any infusion
        let result: WeaponResult = { ...DEFAULT_WEAPON_RESULT };

        // map weapon name
        result.weaponName = weapon.name;

        // for each infusion within the selected infusions
        (Object.keys(INFUSIONS) as InfusionMapKey[])
            .filter((infId) => infusions[infId])
            .forEach((infId) => {
                let temp: WeaponResult = {
                    weaponName: weapon.name,
                    attackRatings: {
                        [infId]: 0,
                    },
                    max: 0,
                    arBreakdown: {
                        [infId]: { ...DEFAULT_ATTACK_RATING_BREAKDOWN },
                    },
                    spellScaling: 0,
                };

                // if buffable is not a requirement or the weapon can be buffed
                // and the weapon has the infusion
                // and the weapon's infusion has a damage type greater than 0
                // then calculate the attack rating
                if (
                    (!buffableOnly || weapon.infusions[infId]?.buffable) &&
                    weapon.infusions[infId] &&
                    Object.values(weapon.infusions[infId]?.damage!).some(
                        (d) => d! > 0
                    )
                ) {
                    temp = attackPower(
                        weapon,
                        infId,
                        reinforced,
                        stats,
                        twoHanded,
                        allowSplitDamage,
                        attackPowerTypesInclude,
                        attackPowerTypeMode,
                        attackPowerTypes,
                        considerStatusEffects
                    );
                }
                result = {
                    ...result,
                    arBreakdown: {
                        ...result.arBreakdown,
                        ...temp.arBreakdown,
                    },
                    attackRatings: {
                        ...result.attackRatings,
                        [infId]:
                            (Object.keys(weapon.infusions).find(
                                (weaponInfId) => weaponInfId == infId
                            ) &&
                                !buffableOnly) ||
                            weapon.infusions[
                                (
                                    Object.keys(
                                        weapon.infusions
                                    ) as InfusionMapKey[]
                                ).find((weaponInfId) => weaponInfId == infId)!
                            ]?.buffable
                                ? temp.attackRatings[infId]
                                : 0,
                    },
                    spellScaling: temp.spellScaling,
                };
            });

        result.max = Math.max(
            0,
            ...(Object.values(result.attackRatings) as number[])
        );

        if (result.attackRatings.unique) {
            result.attackRatings = {
                standard: result.attackRatings.unique,
            };
            result.arBreakdown = {
                standard: result.arBreakdown.unique,
            };
        }

        return result;
    });
}

function sortResults(
    results: WeaponResult[],
    sortBy: SortByWeapon
): WeaponResult[] {
    return results.sort((a, b) => {
        // sort based on current sort order
        if (sortBy.dmgType == "max") {
            // sort by max
            return sortBy.desc ? b.max - a.max : a.max - b.max;
        } else {
            return sortBy.desc
                ? b.attackRatings[sortBy.dmgType]! -
                      a.attackRatings[sortBy.dmgType]!
                : a.attackRatings[sortBy.dmgType]! -
                      b.attackRatings[sortBy.dmgType]!;
        }
    });
}

export function mapResults(
    results: WeaponResult[],
    sortBy: SortByWeapon
): JSX.Element[] {
    return sortResults(results, sortBy).map((weaponResult, i) => (
        <WeaponResultRow
            key={weaponResult.weaponName.replaceAll(" ", "-")}
            weaponName={weaponResult.weaponName}
            attackRatings={weaponResult.attackRatings}
            max={weaponResult.max}
            arBreakdown={weaponResult.arBreakdown}
            rank={i + 1}
        />
    ));
}
