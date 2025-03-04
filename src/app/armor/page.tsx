"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
    ARMOR_RESULTS_SET_IDS,
    CHESTPIECES,
    GAUNTLETS,
    HELMETS,
    LEGGINGS,
} from "../util/constants";
import Armor from "../util/types/armor";
import ArmorSet from "../util/types/armorSet";
import ArmorResultSet from "./components/ArmorResultSet";
import InputNumber from "./components/InputNumber";
import InputRadio from "./components/InputRadio";
import InputSelect from "./components/InputSelect";
import {
    dominated,
    itemStatsToString,
    knapSack,
    resetAll,
    setStatsToString,
} from "./script";
import { SORTBY_MODES } from "./sorting";

export default function ArmorPage() {
    // STATES
    const [best, setBest] = useState(Array<ArmorSet>());
    const [maxEquipLoad, setMaxEquipLoad] = useState(30);
    const [currentEquipLoad, setCurrentEquipLoad] = useState(0);
    const [equipLoadBudget, setEquipLoadBudget] = useState(21);
    const [breakpoint, setBreakpoint] = useState(0.7);
    const [sortBy, setSortBy] = useState("total-standard");
    const [lockedItems, setLockedItems] = useState<ArmorSet>({
        helmet: undefined,
        chestpiece: undefined,
        gauntlets: undefined,
        leggings: undefined,
    });
    const [ignoredItems, setIgnoredItems] = useState(Array<Armor>());
    const [helmets, setHelmets] = useState(Array<Armor>());
    const [chestpieces, setChestpieces] = useState(Array<Armor>());
    const [gauntlets, setGauntlets] = useState(Array<Armor>());
    const [leggings, setLeggings] = useState(Array<Armor>());
    const [pressedKeys, setPressedKeys] = useState(new Set());

    const hotkeyGroups = useMemo(
        () => [
            ["`", "1", "2", "3"],
            ["4", "5", "6", "7"],
            ["8", "9", "0", "-"],
        ],
        []
    );

    // STATE UPDATE FUNCTIONS
    function updateLockedItems(itemType: string, newItem: Armor): void {
        if (
            itemType != "helmet" &&
            itemType != "chestpiece" &&
            itemType != "gauntlets" &&
            itemType != "leggings"
        ) {
            throw new Error("Invalid item type");
        }

        setLockedItems({ ...lockedItems, [itemType]: newItem });
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

    function removeIgnoredItem(oldItem: Armor): void {
        setIgnoredItems([...ignoredItems.filter((i) => i !== oldItem)]);
    }

    // HELPER FUNCTIONS
    const ignoreAll = (): void => {
        // filter out No Helmet, No Chestpiece, No Gauntlets, No Leggings
        var completeList = [
            ...HELMETS.slice(1),
            ...CHESTPIECES.slice(1),
            ...GAUNTLETS.slice(1),
            ...LEGGINGS.slice(1),
        ];
        setIgnoredItems(completeList);
    };

    const restoreAll = (): void => {
        setIgnoredItems([]);
    };

    // CALLBACKS
    const addIgnoredItem = useCallback(
        (newItem: Armor): void => {
            if (ignoredItems.includes(newItem)) return;
            setIgnoredItems([...ignoredItems, newItem]);
        },
        [ignoredItems]
    );

    const updateSortBy = useCallback((value: string): void => {
        setSortBy(value);
    }, []);

    const handleKeyDown = useCallback(
        (event: KeyboardEvent): void => {
            setPressedKeys((prevKeys) => new Set(prevKeys).add(event.key));

            if (pressedKeys.has("Control") && pressedKeys.has("i")) {
                event.preventDefault();
                switch (event.key) {
                    case hotkeyGroups[0][0]:
                        addIgnoredItem(best[0].helmet!);
                        break;
                    case hotkeyGroups[0][1]:
                        addIgnoredItem(best[0].chestpiece!);
                        break;
                    case hotkeyGroups[0][2]:
                        addIgnoredItem(best[0].gauntlets!);
                        break;
                    case hotkeyGroups[0][3]:
                        addIgnoredItem(best[0].leggings!);
                        break;
                    case hotkeyGroups[1][0]:
                        addIgnoredItem(best[1].helmet!);
                        break;
                    case hotkeyGroups[1][1]:
                        addIgnoredItem(best[1].chestpiece!);
                        break;
                    case hotkeyGroups[1][2]:
                        addIgnoredItem(best[1].gauntlets!);
                        break;
                    case hotkeyGroups[1][3]:
                        addIgnoredItem(best[1].leggings!);
                        break;
                    case hotkeyGroups[2][0]:
                        addIgnoredItem(best[2].helmet!);
                        break;
                    case hotkeyGroups[2][1]:
                        addIgnoredItem(best[2].chestpiece!);
                        break;
                    case hotkeyGroups[2][2]:
                        addIgnoredItem(best[2].gauntlets!);
                        break;
                    case hotkeyGroups[2][3]:
                        addIgnoredItem(best[2].leggings!);
                        break;
                    default:
                        break;
                }
            }
        },
        [addIgnoredItem, best, pressedKeys, hotkeyGroups]
    );

    const handleKeyUp = useCallback((event: KeyboardEvent): void => {
        setPressedKeys((prevKeys) => {
            const newKeys = new Set(prevKeys);
            newKeys.delete(event.key);
            return newKeys;
        });
    }, []);

    // EFFECTS
    useEffect(() => {
        // Load data from localStorage on component mount
        const localMaxEquipLoad = localStorage.getItem("localMaxEquipLoad");
        if (localMaxEquipLoad) {
            setMaxEquipLoad(JSON.parse(localMaxEquipLoad));
        }

        const localCurrentEquipLoad = localStorage.getItem(
            "localCurrentEquipLoad"
        );
        if (localCurrentEquipLoad) {
            setCurrentEquipLoad(JSON.parse(localCurrentEquipLoad));
        }

        const localBreakpoint = localStorage.getItem("localBreakpoint");
        if (localBreakpoint) {
            setBreakpoint(JSON.parse(localBreakpoint));
        }

        const localSortBy = localStorage.getItem("localSortBy");
        if (localSortBy) {
            setSortBy(JSON.parse(localSortBy));
        }

        const localLockedItems = localStorage.getItem("localLockedItems");
        if (localLockedItems) {
            setLockedItems(JSON.parse(localLockedItems));
        }

        const localIgnoredItems = localStorage.getItem("localIgnoredItems");
        if (localIgnoredItems) {
            setIgnoredItems(JSON.parse(localIgnoredItems));
        }
    }, []);

    useEffect(() => {
        // Add event listeners for hotkeys
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, [pressedKeys, handleKeyDown, handleKeyUp]);

    useEffect(() => {
        localStorage.setItem("localMaxEquipLoad", JSON.stringify(maxEquipLoad));
    }, [maxEquipLoad]);

    useEffect(() => {
        localStorage.setItem(
            "localCurrentEquipLoad",
            JSON.stringify(currentEquipLoad)
        );
    }, [currentEquipLoad]);

    useEffect(() => {
        localStorage.setItem("localBreakpoint", JSON.stringify(breakpoint));
    }, [breakpoint]);

    useEffect(() => {
        localStorage.setItem("localSortBy", JSON.stringify(sortBy));
    }, [sortBy]);

    useEffect(() => {
        localStorage.setItem("localLockedItems", JSON.stringify(lockedItems));
    }, [lockedItems]);

    useEffect(() => {
        localStorage.setItem("localIgnoredItems", JSON.stringify(ignoredItems));
    }, [ignoredItems]);

    useEffect(() => {
        setBest(
            knapSack(
                equipLoadBudget,
                helmets,
                chestpieces,
                gauntlets,
                leggings,
                sortBy
            )
        );
    }, [equipLoadBudget, helmets, chestpieces, gauntlets, leggings, sortBy]);

    useEffect(() => {
        setHelmets(dominated(HELMETS, lockedItems, ignoredItems, sortBy));
        setChestpieces(
            dominated(CHESTPIECES, lockedItems, ignoredItems, sortBy)
        );
        setGauntlets(dominated(GAUNTLETS, lockedItems, ignoredItems, sortBy));
        setLeggings(dominated(LEGGINGS, lockedItems, ignoredItems, sortBy));
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
                        {Object.entries(SORTBY_MODES).map(([key, value]) => (
                            <InputRadio
                                key={key}
                                label={value.label}
                                id={key}
                                onClick={() => updateSortBy(key)}
                                name="sorting-order"
                                checked={sortBy === key}
                            />
                        ))}
                        <hr />
                        <div>
                            <b>Locked Armor</b>
                            <button id="clear-equipment" onClick={resetAll}>
                                Reset All
                            </button>
                        </div>
                        <InputSelect
                            label="Helmet"
                            id="locked-helmet"
                            name="locked-items"
                            onChange={(event) => {
                                updateLockedItems(
                                    "helmet",
                                    HELMETS.find(
                                        (item) => item.id === event.target.value
                                    )!
                                );
                            }}
                            options={HELMETS}
                            value={lockedItems.helmet?.id}
                        />
                        <InputSelect
                            label="Chestpiece"
                            id="locked-chestpiece"
                            name="locked-items"
                            onChange={(event) => {
                                updateLockedItems(
                                    "chestpiece",
                                    CHESTPIECES.find(
                                        (item) => item.id === event.target.value
                                    )!
                                );
                            }}
                            options={CHESTPIECES}
                            value={lockedItems.chestpiece?.id}
                        />
                        <InputSelect
                            label="Gauntlets"
                            id="locked-gauntlets"
                            name="locked-items"
                            onChange={(event) => {
                                updateLockedItems(
                                    "gauntlets",
                                    GAUNTLETS.find(
                                        (item) => item.id === event.target.value
                                    )!
                                );
                            }}
                            options={GAUNTLETS}
                            value={lockedItems.gauntlets?.id}
                        />
                        <InputSelect
                            label="Leggings"
                            id="locked-leggings"
                            name="locked-items"
                            onChange={(event) => {
                                updateLockedItems(
                                    "leggings",
                                    LEGGINGS.find(
                                        (item) => item.id === event.target.value
                                    )!
                                );
                            }}
                            options={LEGGINGS}
                            value={lockedItems.leggings?.id}
                        />
                        <hr />
                        <div>
                            <b>Ignored Armor</b>
                            <button id="ignore-all" onClick={ignoreAll}>
                                Ignore All
                            </button>
                            <button id="restore-all" onClick={restoreAll}>
                                Restore All
                            </button>
                        </div>
                        <div>
                            <ul
                                id="ignored-items"
                                style={{ listStyle: "none" }}
                            >
                                {ignoredItems.map((item: Armor) => (
                                    <li
                                        key={item.id}
                                        style={{ display: "flex" }}
                                    >
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
                                {best.map((set: ArmorSet, i) => {
                                    return (
                                        <ArmorResultSet
                                            key={i}
                                            id={ARMOR_RESULTS_SET_IDS[i]}
                                            armorIds={[
                                                set.helmet?.id!,
                                                set.chestpiece?.id!,
                                                set.gauntlets?.id!,
                                                set.leggings?.id!,
                                            ]}
                                            armorNames={[
                                                set.helmet?.name!,
                                                set.chestpiece?.name!,
                                                set.gauntlets?.name!,
                                                set.leggings?.name!,
                                            ]}
                                            itemStats={[
                                                itemStatsToString(set.helmet!),
                                                itemStatsToString(
                                                    set.chestpiece!
                                                ),
                                                itemStatsToString(
                                                    set.gauntlets!
                                                ),
                                                itemStatsToString(
                                                    set.leggings!
                                                ),
                                            ]}
                                            setStats={setStatsToString(set)}
                                            addIgnoredItem={[
                                                () =>
                                                    addIgnoredItem(set.helmet!),
                                                () =>
                                                    addIgnoredItem(
                                                        set.chestpiece!
                                                    ),
                                                () =>
                                                    addIgnoredItem(
                                                        set.gauntlets!
                                                    ),
                                                () =>
                                                    addIgnoredItem(
                                                        set.leggings!
                                                    ),
                                            ]}
                                            hotkeys={hotkeyGroups[i]}
                                        />
                                    );
                                })}
                            </table>
                        </div>
                    </article>
                    <div>
                        <h2 style={{ textAlign: "center" }}>Ignoring Armor</h2>
                        <p>
                            Click the red &quot;X&quot; next to any armor piece
                            to remove it from the pool of armor being considered
                            for optimization. Some reasons you might do this
                            include:
                        </p>
                        <ul>
                            <li>You don&apos;t currently have the armor.</li>
                            <li>
                                You don&apos;t like the way the armor looks.
                            </li>
                            <li>You don&apos;t like the armor&apos;s stats.</li>
                        </ul>
                        <p>
                            Alternatively, each armor piece has a hotkey
                            associated with ignoring it. The hotkeys are the
                            keys on the top row of your QWERTY keyboard, from
                            backtick (`) to hyphen (-). Hover over any of the
                            red &quot;X&quot;s to see what its hotkey is.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
