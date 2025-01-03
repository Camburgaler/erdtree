"use client";

import { useEffect, useState } from "react";
import {
    ARMOR_RESULTS_SET_IDS,
    CHESTPIECES,
    GAUNTLETS,
    HELMETS,
    LEGGINGS,
} from "../util/constants";
import Armor from "../util/types/armor";
import Set from "../util/types/set";
import ArmorResultSet from "./components/ArmorResultSet";
import InputNumber from "./components/InputNumber";
import InputRadio from "./components/InputRadio";
import InputSelect from "./components/InputSelect";

export default function ArmorPage() {
    // STATES
    const [best, setBest] = useState(Array<Set>());
    const [maxEquipLoad, setMaxEquipLoad] = useState(30);
    const [currentEquipLoad, setCurrentEquipLoad] = useState(0);
    const [equipLoadBudget, setEquipLoadBudget] = useState(21);
    const [breakpoint, setBreakpoint] = useState(0.7);
    const [sortBy, setSortBy] = useState("sort-standard");
    const [lockedItems, setLockedItems] = useState(Array<Armor>());
    const [ignoredItems, setIgnoredItems] = useState(Array<Armor>());
    const [helmets, setHelmets] = useState(Array<Armor>());
    const [chestpieces, setChestpieces] = useState(Array<Armor>());
    const [gauntlets, setGauntlets] = useState(Array<Armor>());
    const [leggings, setLeggings] = useState(Array<Armor>());

    // STATE UPDATE FUNCTIONS
    function updateLockedItems(newItem: Armor, oldItem?: Armor): void {
        setLockedItems([...lockedItems.filter((i) => i !== oldItem), newItem]);
    }

    function updateMaxEquipLoad(value: number): void {
        setMaxEquipLoad(value);
    }

    function updateCurrentEquipLoad(value: number): void {
        setCurrentEquipLoad(value);
    }

    function updateBreakpoint(value: number): void {
        setBreakpoint(value);
    }

    function updateSortBy(value: string): void {
        setSortBy(value);
    }

    function addIgnoredItem(newItem: Armor): void {
        if (ignoredItems.includes(newItem)) return;
        setIgnoredItems([...ignoredItems, newItem]);
    }

    function removeIgnoredItem(oldItem: Armor): void {
        setIgnoredItems([...ignoredItems.filter((i) => i !== oldItem)]);
    }

    // FUNCTIONS
    function dominated(itemList: Armor[]): Armor[] {
        if (lockedItems.some((item: Armor) => itemList.includes(item))) {
            return [itemList.find((item: any) => lockedItems.includes(item))!];
        }

        // remove ignored items from itemList
        itemList = itemList.filter(
            (item: Armor) => !ignoredItems.includes(item)
        );

        let sorted = [...itemList];
        sorted.sort((a, b) => a.weight - b.weight);

        let approved: Armor[] = [];
        sorted.forEach((item) => {
            if (!approved.some((other) => fitness(item) <= fitness(other))) {
                approved.push(item);
            }
        });

        return approved;
    }

    function fitness(item: Armor): number {
        switch (sortBy) {
            case "sort-average":
                return (
                    Object.values(item.defenses).reduce(
                        (total: any, n) => total + n,
                        0
                    ) ?? 0
                );
            case "sort-standard":
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
                return item.resistances.scarletRot ?? 0;
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
                return item.resistances.deathBlight ?? 0;
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

    function knapSack(): Set[] {
        // Convert max equip load to integer by multiplying by 10
        const equipLoadBudgetInt = Math.round(equipLoadBudget * 10);

        // Initialize DP table
        const dp: Set[][] = Array(5)
            .fill(0)
            .map(() =>
                Array(equipLoadBudgetInt + 1)
                    .fill(null)
                    .map(() => {
                        let set: Set = [];
                        set.weight = 0;
                        set.fitness = 0;
                        return set;
                    })
            );

        const equipment = [helmets, chestpieces, gauntlets, leggings];
        // Fill DP table
        for (let i = 0; i < 4; i++) {
            const pieces = equipment[i];

            for (const piece of pieces) {
                // Convert piece weight to integer
                const pieceWeight = piece.weight;
                const pieceWeightInt = Math.round(pieceWeight * 10);
                const pieceStat = fitness(piece);

                for (
                    let wInt = equipLoadBudgetInt;
                    wInt >= pieceWeightInt;
                    wInt--
                ) {
                    if (
                        dp[i][wInt - pieceWeightInt].weight! + pieceWeight <=
                        equipLoadBudgetInt
                    ) {
                        const newFitness =
                            dp[i][wInt - pieceWeightInt].fitness! + pieceStat;
                        if (newFitness > dp[i + 1][wInt].fitness!) {
                            // helmet
                            dp[i + 1][wInt][0] =
                                i === 0
                                    ? piece
                                    : dp[i][wInt - pieceWeightInt][0] ??
                                      HELMETS[0];
                            // chestpiece
                            dp[i + 1][wInt][1] =
                                i === 1
                                    ? piece
                                    : dp[i][wInt - pieceWeightInt][1] ??
                                      CHESTPIECES[0];
                            // gauntlets
                            dp[i + 1][wInt][2] =
                                i === 2
                                    ? piece
                                    : dp[i][wInt - pieceWeightInt][2] ??
                                      GAUNTLETS[0];
                            // leggings
                            dp[i + 1][wInt][3] =
                                i === 3
                                    ? piece
                                    : dp[i][wInt - pieceWeightInt][3] ??
                                      LEGGINGS[0];
                            // fitness
                            dp[i + 1][wInt].fitness = newFitness;
                            // weight
                            dp[i + 1][wInt].weight =
                                dp[i][wInt - pieceWeightInt].weight! +
                                pieceWeight;
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
        const topSets: Set[] = [];
        for (let wInt = equipLoadBudgetInt; wInt >= 0; wInt--) {
            if (dp[4][wInt].fitness! > 0) {
                let duplicate = false;
                for (const set of topSets) {
                    if (
                        dp[4][wInt][0] === set[0] &&
                        dp[4][wInt][1] === set[1] &&
                        dp[4][wInt][2] === set[2] &&
                        dp[4][wInt][3] === set[3]
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

    function resetAll(): void {
        [
            ...(document.getElementsByName(
                "locked-items"
            ) as NodeListOf<HTMLSelectElement>),
        ].forEach((select) => (select.selectedIndex = 0));
    }

    function itemStatsToString(item: Armor): string[] {
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

    function setStatsToString(set: Set): string[] {
        let imaginary: Armor = {
            id: "IMAGINARY",
            name: "IMAGINARY",
            weight:
                set[0].weight + set[1].weight + set[2].weight + set[3].weight,
            poise: set[0].poise + set[1].poise + set[2].poise + set[3].poise,
            defenses: {
                physical:
                    set[0].defenses.physical +
                    set[1].defenses.physical +
                    set[2].defenses.physical +
                    set[3].defenses.physical,
                strike:
                    set[0].defenses.strike +
                    set[1].defenses.strike +
                    set[2].defenses.strike +
                    set[3].defenses.strike,
                slash:
                    set[0].defenses.slash +
                    set[1].defenses.slash +
                    set[2].defenses.slash +
                    set[3].defenses.slash,
                pierce:
                    set[0].defenses.pierce +
                    set[1].defenses.pierce +
                    set[2].defenses.pierce +
                    set[3].defenses.pierce,
                magic:
                    set[0].defenses.magic +
                    set[1].defenses.magic +
                    set[2].defenses.magic +
                    set[3].defenses.magic,
                fire:
                    set[0].defenses.fire +
                    set[1].defenses.fire +
                    set[2].defenses.fire +
                    set[3].defenses.fire,
                lightning:
                    set[0].defenses.lightning +
                    set[1].defenses.lightning +
                    set[2].defenses.lightning +
                    set[3].defenses.lightning,
                holy:
                    set[0].defenses.holy +
                    set[1].defenses.holy +
                    set[2].defenses.holy +
                    set[3].defenses.holy,
            },
            resistances: {
                scarletRot:
                    set[0].resistances.scarletRot +
                    set[1].resistances.scarletRot +
                    set[2].resistances.scarletRot +
                    set[3].resistances.scarletRot,
                poison:
                    set[0].resistances.poison +
                    set[1].resistances.poison +
                    set[2].resistances.poison +
                    set[3].resistances.poison,
                hemorrhage:
                    set[0].resistances.hemorrhage +
                    set[1].resistances.hemorrhage +
                    set[2].resistances.hemorrhage +
                    set[3].resistances.hemorrhage,
                frostbite:
                    set[0].resistances.frostbite +
                    set[1].resistances.frostbite +
                    set[2].resistances.frostbite +
                    set[3].resistances.frostbite,
                sleep:
                    set[0].resistances.sleep +
                    set[1].resistances.sleep +
                    set[2].resistances.sleep +
                    set[3].resistances.sleep,
                madness:
                    set[0].resistances.madness +
                    set[1].resistances.madness +
                    set[2].resistances.madness +
                    set[3].resistances.madness,
                deathBlight:
                    set[0].resistances.deathBlight +
                    set[1].resistances.deathBlight +
                    set[2].resistances.deathBlight +
                    set[3].resistances.deathBlight,
            },
        };

        return itemStatsToString(imaginary);
    }

    // EFFECTS
    useEffect(() => {
        setBest(knapSack());
    }, [helmets, chestpieces, gauntlets, leggings, equipLoadBudget]);

    useEffect(() => {
        setHelmets(dominated(HELMETS));
        setChestpieces(dominated(CHESTPIECES));
        setGauntlets(dominated(GAUNTLETS));
        setLeggings(dominated(LEGGINGS));
    }, [lockedItems, ignoredItems, sortBy]);

    useEffect(() => {
        setEquipLoadBudget(
            Math.max(maxEquipLoad * breakpoint - currentEquipLoad, 0.0)
        );
    }, [maxEquipLoad, currentEquipLoad, breakpoint]);

    // RENDER
    return (
        <div>
            <header>
                <h1>Armor Optimizer</h1>
            </header>
            <main>
                <div className="app">
                    {/* <!-- settings --> */}
                    <article style={{ flexBasis: "25%" }}>
                        <b>Settings</b>
                        <hr />
                        <InputNumber
                            label="Max. Equip Load"
                            className="stat"
                            id="max-equip-load"
                            onChange={(event) => {
                                if (event.target.value == "") {
                                    event.target.value = "0";
                                }
                                updateMaxEquipLoad(
                                    parseFloat(event.target.value)
                                );
                            }}
                            value={maxEquipLoad}
                            name="equip-load"
                        />
                        <InputNumber
                            label="Current Equip Load"
                            className="stat"
                            id="current-equip-load"
                            onChange={(event) => {
                                if (event.target.value == "") {
                                    event.target.value = "0";
                                }
                                updateCurrentEquipLoad(
                                    parseFloat(event.target.value)
                                );
                            }}
                            value={currentEquipLoad}
                            name="equip-load"
                        />
                        <InputNumber
                            label="Equip Load Budget"
                            className="stat"
                            id="equip-load-budget"
                            value={equipLoadBudget}
                            name="equip-load"
                            disabled
                        />
                        <hr />
                        <b>Breakpoints</b>
                        <InputRadio
                            label="Fast Roll (up to 30% equip load)"
                            id="fast-roll"
                            onClick={() => updateBreakpoint(0.3)}
                            name="roll-type"
                            checked={breakpoint === 0.3}
                        />
                        <InputRadio
                            label="Normal Roll (up to 70% equip load)"
                            id="normal-roll"
                            onClick={() => updateBreakpoint(0.7)}
                            name="roll-type"
                            checked={breakpoint === 0.7}
                        />
                        <InputRadio
                            label="Fat Roll (up to 100% equip load)"
                            id="fat-roll"
                            onClick={() => updateBreakpoint(1.0)}
                            name="roll-type"
                            checked={breakpoint === 1.0}
                        />
                        <hr />
                        <b>Sort by</b>
                        <InputRadio
                            label="Greatest Average Absorption"
                            id="sort-average"
                            onClick={() => updateSortBy("sort-average")}
                            name="sorting-order"
                            checked={sortBy === "sort-average"}
                        />
                        <InputRadio
                            label="Greatest Standard Absorption"
                            id="sort-standard"
                            onClick={() => updateSortBy("sort-standard")}
                            name="sorting-order"
                            checked={sortBy === "sort-standard"}
                        />
                        <InputRadio
                            label="Greatest Physical Absorption"
                            id="sort-physical"
                            onClick={() => updateSortBy("sort-physical")}
                            name="sorting-order"
                            checked={sortBy === "sort-physical"}
                        />
                        <InputRadio
                            label="Greatest Strike Absorption"
                            id="sort-strike"
                            onClick={() => updateSortBy("sort-strike")}
                            name="sorting-order"
                            checked={sortBy === "sort-strike"}
                        />
                        <InputRadio
                            label="Greatest Slash Absorption"
                            id="sort-slash"
                            onClick={() => updateSortBy("sort-slash")}
                            name="sorting-order"
                            checked={sortBy === "sort-slash"}
                        />
                        <InputRadio
                            label="Greatest Pierce Absorption"
                            id="sort-pierce"
                            onClick={() => updateSortBy("sort-pierce")}
                            name="sorting-order"
                            checked={sortBy === "sort-pierce"}
                        />
                        <InputRadio
                            label="Greatest Elemental Absorption"
                            id="sort-elemental"
                            onClick={() => updateSortBy("sort-elemental")}
                            name="sorting-order"
                            checked={sortBy === "sort-elemental"}
                        />
                        <InputRadio
                            label="Greatest Magic Absorption"
                            id="sort-magic"
                            onClick={() => updateSortBy("sort-magic")}
                            name="sorting-order"
                            checked={sortBy === "sort-magic"}
                        />
                        <InputRadio
                            label="Greatest Fire Absorption"
                            id="sort-fire"
                            onClick={() => updateSortBy("sort-fire")}
                            name="sorting-order"
                            checked={sortBy === "sort-fire"}
                        />
                        <InputRadio
                            label="Greatest Lightning Absorption"
                            id="sort-lightning"
                            onClick={() => updateSortBy("sort-lightning")}
                            name="sorting-order"
                            checked={sortBy === "sort-lightning"}
                        />
                        <InputRadio
                            label="Greatest Holy Absorption"
                            id="sort-holy"
                            onClick={() => updateSortBy("sort-holy")}
                            name="sorting-order"
                            checked={sortBy === "sort-holy"}
                        />
                        <InputRadio
                            label="Greatest Average Resistance"
                            id="sort-resistances"
                            onClick={() => updateSortBy("sort-resistances")}
                            name="sorting-order"
                            checked={sortBy === "sort-resistances"}
                        />
                        <InputRadio
                            label="Greatest Scarlet Rot Resistance"
                            id="sort-scarlet-rot"
                            onClick={() => updateSortBy("sort-scarlet-rot")}
                            name="sorting-order"
                            checked={sortBy === "sort-scarlet-rot"}
                        />
                        <InputRadio
                            label="Greatest Poison Resistance"
                            id="sort-poison"
                            onClick={() => updateSortBy("sort-poison")}
                            name="sorting-order"
                            checked={sortBy === "sort-poison"}
                        />
                        <InputRadio
                            label="Greatest Hemorrhage Resistance"
                            id="sort-hemorrhage"
                            onClick={() => updateSortBy("sort-hemorrhage")}
                            name="sorting-order"
                            checked={sortBy === "sort-hemorrhage"}
                        />
                        <InputRadio
                            label="Greatest Frostbite Resistance"
                            id="sort-frostbite"
                            onClick={() => updateSortBy("sort-frostbite")}
                            name="sorting-order"
                            checked={sortBy === "sort-frostbite"}
                        />
                        <InputRadio
                            label="Greatest Sleep Resistance"
                            id="sort-sleep"
                            onClick={() => updateSortBy("sort-sleep")}
                            name="sorting-order"
                            checked={sortBy === "sort-sleep"}
                        />
                        <InputRadio
                            label="Greatest Madness Resistance"
                            id="sort-madness"
                            onClick={() => updateSortBy("sort-madness")}
                            name="sorting-order"
                            checked={sortBy === "sort-madness"}
                        />
                        <InputRadio
                            label="Greatest Death Resistance"
                            id="sort-death"
                            onClick={() => updateSortBy("sort-death")}
                            name="sorting-order"
                            checked={sortBy === "sort-death"}
                        />
                        <InputRadio
                            label="Greatest Poise"
                            id="sort-poise"
                            onClick={() => updateSortBy("sort-poise")}
                            name="sorting-order"
                            checked={sortBy === "sort-poise"}
                        />
                        {/* <InputRadio
                            label="Custom"
                            id="sort-custom"
                            onClick={() => updateSortBy("sort-custom")}
                            name="sorting-order"
                            checked={sortBy === "sort-custom"}
                        /> */}
                        <hr />
                        <b>Locked Armor</b>
                        <InputSelect
                            label="Helmet"
                            id="locked-helmet"
                            name="locked-items"
                            onChange={(event) => {
                                updateLockedItems(
                                    HELMETS.find(
                                        (item) => item.id === event.target.value
                                    )!,
                                    lockedItems.find((item) =>
                                        HELMETS.includes(item)
                                    )
                                );
                            }}
                            options={HELMETS}
                        />
                        <InputSelect
                            label="Chestpiece"
                            id="locked-chestpiece"
                            name="locked-items"
                            onChange={(event) => {
                                updateLockedItems(
                                    CHESTPIECES.find(
                                        (item) => item.id === event.target.value
                                    )!,
                                    lockedItems.find((item) =>
                                        CHESTPIECES.includes(item)
                                    )
                                );
                            }}
                            options={CHESTPIECES}
                        />
                        <InputSelect
                            label="Gauntlets"
                            id="locked-gauntlets"
                            name="locked-items"
                            onChange={(event) => {
                                updateLockedItems(
                                    GAUNTLETS.find(
                                        (item) => item.id === event.target.value
                                    )!,
                                    lockedItems.find((item) =>
                                        GAUNTLETS.includes(item)
                                    )
                                );
                            }}
                            options={GAUNTLETS}
                        />
                        <InputSelect
                            label="Leggings"
                            id="locked-leggings"
                            name="locked-items"
                            onChange={(event) => {
                                updateLockedItems(
                                    LEGGINGS.find(
                                        (item) => item.id === event.target.value
                                    )!,
                                    lockedItems.find((item) =>
                                        LEGGINGS.includes(item)
                                    )
                                );
                            }}
                            options={LEGGINGS}
                        />
                        <div>
                            <button id="clear-equipment" onClick={resetAll}>
                                Reset All
                            </button>
                        </div>
                        <hr />
                        <b>Ignored Armor</b>
                        <div>
                            <ul id="ignored-items">
                                {ignoredItems.map((item: Armor) => (
                                    <li key={item.id}>
                                        {item.name}
                                        <button
                                            onClick={() =>
                                                removeIgnoredItem(
                                                    ignoredItems.find(
                                                        (i) => i == item
                                                    )!
                                                )
                                            }
                                            style={{ backgroundColor: "green" }}
                                        >
                                            {" 🗑"}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </article>
                    {/* <!-- sort --> */}
                    <article style={{ flexBasis: "60%", minWidth: "320px" }}>
                        <b>Results</b>
                        <div>
                            <table id="results">
                                {best.map((set: Set, i) => {
                                    return (
                                        <ArmorResultSet
                                            key={i}
                                            id={ARMOR_RESULTS_SET_IDS[i]}
                                            armorIds={set.map(
                                                (item: Armor) => item.id
                                            )}
                                            armorNames={set.map(
                                                (item: Armor) => item.name
                                            )}
                                            itemStats={set.map((item: Armor) =>
                                                itemStatsToString(item)
                                            )}
                                            setStats={setStatsToString(set)}
                                            addIgnoredItem={set.map((item) => {
                                                return () =>
                                                    addIgnoredItem(item);
                                            })}
                                        />
                                    );
                                })}
                            </table>
                        </div>
                    </article>
                </div>
            </main>
        </div>
    );
}
