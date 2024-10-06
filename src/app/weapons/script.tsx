import {
    ATTACK_POWER_STAT_IDS,
    ATTACK_POWER_TYPE_IDS,
    ATTACK_POWER_TYPE_MODE_All,
    ATTACK_POWER_TYPE_MODE_ANY,
    CATEGORY_NAMES,
    CORRECTIONS,
    DAMAGE_IDS,
    INEFFECTIVE_STAT_PENALTY,
    INFUSIONS,
    WEAPONS,
} from "../util/constants";
import AttackPowerTypeMap from "../util/interfaces/attackPowerTypeMap";
import CategoryMap from "../util/interfaces/categoryMap";
import InfusionMap from "../util/interfaces/infusionMap";
import StatMap from "../util/interfaces/statMap";
import { CalcCorrectGraph } from "../util/types/correction";
import Infusion from "../util/types/infusion";
import Weapon from "../util/types/weapon";
import WeaponInfusion from "../util/types/weaponInfusion";
import { WeaponResultRow } from "./components/WeaponResultRow";

// TYPES
export type WeaponResult = {
    weaponName: string;
    attackRatings: InfusionMap<number>;
    max: number;
    arBreakdown: InfusionMap<{
        baseDmg: AttackPowerTypeMap<number>;
        scalingDmg: AttackPowerTypeMap<number>;
    }>;
    spellScaling: number;
};
export type SortBy = {
    dmgType: string;
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
        ([key, value]) => attackPowerTypes[key] && value
    );
    return attackPowerTypesInclude ? result : !result;
};

const allAttackPowerTypes = (
    dmg: AttackPowerTypeMap<number>,
    attackPowerTypes: AttackPowerTypeMap<boolean>,
    attackPowerTypesInclude: boolean
): boolean => {
    let result: boolean = true;
    if (!(Object.values(attackPowerTypes) as boolean[]).includes(true)) {
        result = false;
    } else {
        result = Object.entries(dmg).every(([key, value]) =>
            attackPowerTypes[key] ? value! > 0 : true
        ) as boolean;
    }
    return attackPowerTypesInclude ? result : !result;
};

const exactlyAttackPowerTypes = (
    dmg: AttackPowerTypeMap<number>,
    attackPowerTypes: AttackPowerTypeMap<boolean>,
    attackPowerTypesInclude: boolean
): boolean => {
    let result: boolean = Object.entries(attackPowerTypes).every(
        ([key, value]) =>
            value ? dmg[key]! > 0 : dmg[key]! == 0 || dmg[key]! == undefined
    ) as boolean;
    return attackPowerTypesInclude ? result : !result;
};

// FUNCTIONS
function corrections(
    calc: CalcCorrectGraph[] = CORRECTIONS[0],
    stats: StatMap<number>,
    masks: StatMap<boolean>
): StatMap<number> {
    const result: StatMap<number> = {
        STR: 0,
        DEX: 0,
        INT: 0,
        FTH: 0,
        ARC: 0,
    };

    Object.entries(stats).forEach(
        ([statId, statVal]: [string, number | undefined]) => {
            if (masks[statId]) {
                const stage: CalcCorrectGraph = calc.find(
                    (stage) => stage.softcap > statVal!
                )!;
                const prevStage: CalcCorrectGraph =
                    calc[calc.indexOf(stage) - 1];

                let ratio: number = Math.max(
                    0,
                    Math.min(
                        1,
                        (statVal! - prevStage.softcap) /
                            (stage.softcap - prevStage.softcap)
                    )
                );

                if (prevStage.adjustment > 0) {
                    ratio = ratio ** prevStage.adjustment;
                } else if (prevStage.adjustment < 0) {
                    ratio = 1 - (1 - ratio) ** -prevStage.adjustment;
                }

                result[statId] =
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
    if (CATEGORY_NAMES[1].includes(weapon.category)) {
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

function attackPower(
    weapon: Weapon,
    infusion: Infusion,
    upgraded: boolean,
    stats: StatMap<number>,
    twoHanded: boolean,
    splitDamage: boolean,
    attackPowerTypesInclude: boolean,
    attackPowerTypeMode: string,
    attackPowerTypes: AttackPowerTypeMap<boolean>,
    statusEffects: boolean
): WeaponResult {
    let infId: string = Object.keys(infusion)[0];
    let inf = Object.values(infusion)[0];
    let result: WeaponResult = {
        weaponName: weapon.name,
        attackRatings: {},
        max: 0,
        arBreakdown: {
            [infId]: {
                baseDmg: {
                    physical: 0,
                    magic: 0,
                    fire: 0,
                    lightning: 0,
                    holy: 0,
                },
                scalingDmg: {
                    physical: 0,
                    magic: 0,
                    fire: 0,
                    lightning: 0,
                    holy: 0,
                },
            },
        },
        spellScaling: 0,
    };

    // initialize weapon infusion
    let weaponInfusion: WeaponInfusion = weapon.infusions[infId]!;
    weaponInfusion.masks = {
        ...weaponInfusion.masks,
        blood: {
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

    // initialize upgrade level
    let upgLevel: number = upgraded ? (weapon.unique ? 10 : 25) : 0;

    const adjustedStats: StatMap<number> = adjustStatsForTwoHanding(
        twoHanded,
        weapon,
        stats
    );
    const ineffectiveStats: StatMap<boolean> = {
        STR: false,
        DEX: false,
        INT: false,
        FTH: false,
        ARC: false,
    };
    Object.entries(weapon.requirements)
        .filter(([statId, requirement]) => {
            adjustedStats[statId]! < (requirement as number)!;
        })
        .forEach(([statId, _]) => {
            ineffectiveStats[statId] = true;
        });

    const ineffectiveAttackPowerTypes: AttackPowerTypeMap<boolean> = {
        physical: false,
        magic: false,
        fire: false,
        lightning: false,
        holy: false,
    };

    let baseAttackRating: AttackPowerTypeMap<number> = {
        physical: 0,
        magic: 0,
        fire: 0,
        lightning: 0,
        holy: 0,
    };
    let scalingAttackRating: AttackPowerTypeMap<number> = {
        physical: 0,
        magic: 0,
        fire: 0,
        lightning: 0,
        holy: 0,
    };
    const spellScaling: AttackPowerTypeMap<number> = {
        physical: 0,
        magic: 0,
        fire: 0,
        lightning: 0,
        holy: 0,
    };

    for (const attackPowerType of ATTACK_POWER_TYPE_IDS) {
        const isDamageType: boolean = DAMAGE_IDS.includes(attackPowerType);

        if (isDamageType) {
            baseAttackRating[attackPowerType] =
                (weaponInfusion.damage[attackPowerType] ?? 0) *
                slopeInterceptGivenX(
                    inf.damageUpgradeRate[attackPowerType]?.slope!,
                    inf.damageUpgradeRate[attackPowerType]?.intercept!,
                    upgLevel
                );
        } else if (weaponInfusion.aux?.[attackPowerType]) {
            baseAttackRating[attackPowerType] =
                weaponInfusion.aux?.[attackPowerType][upgraded ? 1 : 0] ?? 0;
        }

        if (
            baseAttackRating[attackPowerType] ||
            weapon["glintstone-staff"] ||
            weapon["sacred-seal"]
        ) {
            // This weapon's AttackElementCorrectParam determines what attributes each damage type scales with
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
                    const statCorrect: boolean = scalingStats[statId] ?? false;
                    if (statCorrect) {
                        let scaling: number =
                            (weaponInfusion.scaling[statId]! ?? 0) *
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
        baseAttackRating = {
            physical: 0,
            magic: 0,
            fire: 0,
            lightning: 0,
            holy: 0,
        };
    }

    let matchesDamageTypes: boolean =
        attackPowerTypeMode == ATTACK_POWER_TYPE_MODE_ANY
            ? anyAttackPowerTypes(
                  baseAttackRating,
                  attackPowerTypes,
                  attackPowerTypesInclude
              )
            : attackPowerTypeMode == ATTACK_POWER_TYPE_MODE_All
            ? allAttackPowerTypes(
                  baseAttackRating,
                  attackPowerTypes,
                  attackPowerTypesInclude
              )
            : exactlyAttackPowerTypes(
                  baseAttackRating,
                  attackPowerTypes,
                  attackPowerTypesInclude
              );

    // if weapon does not match damage types, set base damage to 0
    if (!matchesDamageTypes) {
        baseAttackRating = {
            physical: 0,
            magic: 0,
            fire: 0,
            lightning: 0,
            holy: 0,
        };
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
    result.spellScaling =
        Object.values(spellScaling).reduce(
            (sum: number | undefined, n: number | undefined) => sum! + n!,
            0
        ) ?? 0;

    return result;
}

function filterWeapons(
    stats: StatMap<number>,
    twoHanded: boolean,
    requireStats: boolean,
    categories: CategoryMap<boolean>,
    infusions: InfusionMap<boolean>,
    buffableOnly: boolean,
    splitDamage: boolean,
    attackPowerTypesInclude: boolean,
    attackPowerTypeMode: string,
    attackPowerTypes: AttackPowerTypeMap<boolean>
): Weapon[] {
    return WEAPONS.filter((weapon) => {
        // filter out weapons that don't fit the current parameters
        return (
            // check all stats except for STR
            ((Object.keys(weapon.requirements).every((statName: string) =>
                statName == "STR"
                    ? true
                    : stats[statName]! >= weapon.requirements[statName]!
            ) &&
                // and if the weapon is using two handed damage
                (twoHanded
                    ? // then use the two handing formula for STR
                      stats["STR"] * 1.5 >= weapon.requirements["STR"]
                    : // else use the one handed formula for STR
                      stats["STR"] >= weapon.requirements["STR"])) ||
                // or ignore stats if not required
                !requireStats) &&
            // and if the weapon's category is allowed
            categories[weapon.category] &&
            // and if the weapon's infusion is allowed
            Object.entries(weapon.infusions).some(
                ([infId, infusion]) =>
                    infusions[infId] &&
                    Object.values(infusion?.damage!).some((d) => d! > 0)
            ) &&
            // and if the weapon is buffable or buffable is not required
            (!buffableOnly ||
                Object.values(weapon.infusions).some((inf) => inf?.buffable)) &&
            // and if the weapon is split damage (prefer for check to be done with Heavy infusion to catch cases where the Standard infusion is split but the physical infusions are not)
            (isSplitDamage(
                weapon.infusions.heavy?.damage ??
                    weapon.infusions.standard!.damage
            )
                ? // then defer to whether split damage is allowed
                  splitDamage
                : true) &&
            // and if the weapon has only Standard infusion and contains selected damage type
            (weapon.infusions.heavy ??
                (attackPowerTypeMode == ATTACK_POWER_TYPE_MODE_ANY
                    ? anyAttackPowerTypes(
                          weapon.infusions.standard!.damage,
                          attackPowerTypes,
                          attackPowerTypesInclude
                      )
                    : attackPowerTypeMode == ATTACK_POWER_TYPE_MODE_All
                    ? allAttackPowerTypes(
                          weapon.infusions.standard!.damage,
                          attackPowerTypes,
                          attackPowerTypesInclude
                      )
                    : exactlyAttackPowerTypes(
                          weapon.infusions.standard!.damage,
                          attackPowerTypes,
                          attackPowerTypesInclude
                      )))
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
    splitDamage: boolean,
    attackPowerTypesInclude: boolean,
    attackPowerTypeMode: string,
    attackPowerTypes: AttackPowerTypeMap<boolean>,
    reinforced: boolean,
    statusEffects: boolean
): WeaponResult[] {
    return filterWeapons(
        stats,
        twoHanded,
        requireStats,
        categories,
        infusions,
        buffableOnly,
        splitDamage,
        attackPowerTypesInclude,
        attackPowerTypeMode,
        attackPowerTypes
    ).map((weapon) => {
        // calculate attack ratings for every allowed infusion as well as the maximum damage of any infusion
        let result: WeaponResult = {
            weaponName: weapon.name,
            attackRatings: {},
            max: 0,
            arBreakdown: {},
            spellScaling: 0,
        };
        Object.entries(INFUSIONS)
            .filter(([infId, inf]) => infusions[infId])
            .forEach(([infId, inf]) => {
                let temp: WeaponResult = {
                    weaponName: weapon.name,
                    attackRatings: {
                        [infId]: 0,
                    },
                    max: 0,
                    arBreakdown: {
                        [infId]: {
                            baseDmg: {
                                physical: 0,
                                magic: 0,
                                fire: 0,
                                lightning: 0,
                                holy: 0,
                            },
                            scalingDmg: {
                                physical: 0,
                                magic: 0,
                                fire: 0,
                                lightning: 0,
                                holy: 0,
                            },
                        },
                    },
                    spellScaling: 0,
                };

                if (
                    (!buffableOnly || weapon.infusions[infId]?.buffable) &&
                    weapon.infusions[infId] &&
                    Object.values(weapon.infusions[infId]?.damage!).some(
                        (d) => d! > 0
                    )
                ) {
                    temp = attackPower(
                        weapon,
                        { [infId]: inf },
                        reinforced,
                        stats,
                        twoHanded,
                        splitDamage,
                        attackPowerTypesInclude,
                        attackPowerTypeMode,
                        attackPowerTypes,
                        statusEffects
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
                                Object.keys(weapon.infusions).find(
                                    (weaponInfId) => weaponInfId == infId
                                )!
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

        return result;
    });
}

function sortResults(results: WeaponResult[], sortBy: SortBy): WeaponResult[] {
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
    sortBy: SortBy
): JSX.Element[] {
    return sortResults(results, sortBy).map((weaponResult) => (
        <WeaponResultRow
            key={weaponResult.weaponName.replaceAll(" ", "-")}
            weaponName={weaponResult.weaponName}
            attackRatings={weaponResult.attackRatings}
            max={weaponResult.max}
            arBreakdown={weaponResult.arBreakdown}
        />
    ));
}
