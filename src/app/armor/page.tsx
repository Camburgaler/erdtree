"use client";

import ArmorResultSet from "@/app/armor/components/armorResult/ArmorResultSet";
import {
    DEFAULT_SORTBYARMOR,
    marshallSortByToString,
    SortByArmor,
    unmarshallSortBy,
} from "@/app/armor/components/customSortBy/sorting";
import {
    dominated,
    itemStatsToString,
    knapSack,
    setStatsToString,
} from "@/app/armor/script";
import InputNumber from "@/app/util/components/input/InputNumber";
import InputRadio from "@/app/util/components/input/InputRadio";
import InputSelect from "@/app/util/components/input/InputSelect";
import {
    ARMOR_RESULTS_SET_IDS,
    CHESTPIECES,
    GAUNTLETS,
    HELMETS,
    LEGGINGS,
    LOCKED_ARMOR_SELECT_NAME,
} from "@/app/util/constants";
import Armor from "@/app/util/types/armor";
import ArmorSet from "@/app/util/types/armorSet";
import { useCallback, useEffect, useMemo, useState } from "react";
import { deepCloneAndMap } from "../util/script";
import { CustomizeSortBy } from "./components/customSortBy/CustomizeSortBy";
import {
    SORTBYARMOR_MODES,
    SORTBYBOSS_KEYS,
    SORTBYBOSS_MODES,
    SortByBossKey,
} from "./components/customSortBy/sortingPresets";

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
    const [customizeSortBy, setCustomizeSortBy] = useState(false);
    const [customSortBy, setCustomSortBy] = useState<SortByArmor>(
        deepCloneAndMap(DEFAULT_SORTBYARMOR, [{ label: "Custom" }])
    );
    const [bossSortBy, setBossSortBy] =
        useState<SortByBossKey>("abductor-virgins");

    const hotkeyGroups = useMemo(
        () => [
            ["`", "1", "2", "3"],
            ["4", "5", "6", "7"],
            ["8", "9", "0", "-"],
        ],
        []
    );

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
    const handleKeyDown = useCallback(
        (event: KeyboardEvent): void => {
            setPressedKeys((prevKeys) => new Set(prevKeys).add(event.key));

            if (pressedKeys.has("Control") && pressedKeys.has("i")) {
                event.preventDefault();
                switch (event.key) {
                    case hotkeyGroups[0][0]:
                        setIgnoredItems([...ignoredItems, best[0].helmet!]);
                        break;
                    case hotkeyGroups[0][1]:
                        setIgnoredItems([...ignoredItems, best[0].chestpiece!]);
                        break;
                    case hotkeyGroups[0][2]:
                        setIgnoredItems([...ignoredItems, best[0].gauntlets!]);
                        break;
                    case hotkeyGroups[0][3]:
                        setIgnoredItems([...ignoredItems, best[0].leggings!]);
                        break;
                    case hotkeyGroups[1][0]:
                        setIgnoredItems([...ignoredItems, best[1].helmet!]);
                        break;
                    case hotkeyGroups[1][1]:
                        setIgnoredItems([...ignoredItems, best[1].chestpiece!]);
                        break;
                    case hotkeyGroups[1][2]:
                        setIgnoredItems([...ignoredItems, best[1].gauntlets!]);
                        break;
                    case hotkeyGroups[1][3]:
                        setIgnoredItems([...ignoredItems, best[1].leggings!]);
                        break;
                    case hotkeyGroups[2][0]:
                        setIgnoredItems([...ignoredItems, best[2].helmet!]);
                        break;
                    case hotkeyGroups[2][1]:
                        setIgnoredItems([...ignoredItems, best[2].chestpiece!]);
                        break;
                    case hotkeyGroups[2][2]:
                        setIgnoredItems([...ignoredItems, best[2].gauntlets!]);
                        break;
                    case hotkeyGroups[2][3]:
                        setIgnoredItems([...ignoredItems, best[2].leggings!]);
                        break;
                    default:
                        break;
                }
            }
        },
        [ignoredItems, best, pressedKeys, hotkeyGroups]
    );

    const handleKeyUp = useCallback((event: KeyboardEvent): void => {
        setPressedKeys((prevKeys) => {
            const newKeys = new Set(prevKeys);
            newKeys.delete(event.key);
            return newKeys;
        });
    }, []);

    const getSortByArmor = useCallback((): SortByArmor => {
        return sortBy == "custom"
            ? customSortBy
            : sortBy == "boss"
            ? SORTBYBOSS_MODES[bossSortBy as SortByBossKey]
            : SORTBYARMOR_MODES[sortBy as keyof typeof SORTBYARMOR_MODES];
    }, [sortBy, customSortBy, bossSortBy]);

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

        const localCustomSortBy = localStorage.getItem("localCustomSortBy");
        if (localCustomSortBy) {
            setCustomSortBy(
                deepCloneAndMap(unmarshallSortBy(localCustomSortBy), [
                    { label: "Custom" },
                ])
            );
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
        localStorage.setItem(
            "localCustomSortBy",
            marshallSortByToString(customSortBy)
        );
    }, [customSortBy]);

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
                getSortByArmor()
            )
        );
    }, [
        equipLoadBudget,
        helmets,
        chestpieces,
        gauntlets,
        leggings,
        getSortByArmor,
    ]);

    useEffect(() => {
        setHelmets(
            dominated(HELMETS, lockedItems, ignoredItems, getSortByArmor())
        );
        setChestpieces(
            dominated(CHESTPIECES, lockedItems, ignoredItems, getSortByArmor())
        );
        setGauntlets(
            dominated(GAUNTLETS, lockedItems, ignoredItems, getSortByArmor())
        );
        setLeggings(
            dominated(LEGGINGS, lockedItems, ignoredItems, getSortByArmor())
        );
    }, [lockedItems, ignoredItems, getSortByArmor]);

    useEffect(() => {
        setEquipLoadBudget(
            Math.max(maxEquipLoad * breakpoint - currentEquipLoad, 0.0)
        );
    }, [maxEquipLoad, currentEquipLoad, breakpoint]);

    // RENDER
    return (
        <div>
            {customizeSortBy && (
                <CustomizeSortBy
                    closePopUp={() => {
                        setCustomizeSortBy(false);
                    }}
                    setCustomSortBy={setCustomSortBy}
                    sortBy={getSortByArmor()}
                />
            )}
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
                                setMaxEquipLoad(parseFloat(event.target.value));
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
                                setCurrentEquipLoad(
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
                            onClick={() => setBreakpoint(0.3)}
                            name="roll-type"
                            checked={breakpoint === 0.3}
                        />
                        <InputRadio
                            label="Normal Roll (up to 70% equip load)"
                            id="normal-roll"
                            onClick={() => setBreakpoint(0.7)}
                            name="roll-type"
                            checked={breakpoint === 0.7}
                        />
                        <InputRadio
                            label="Fat Roll (up to 100% equip load)"
                            id="fat-roll"
                            onClick={() => setBreakpoint(1.0)}
                            name="roll-type"
                            checked={breakpoint === 1.0}
                        />
                        <hr />
                        <b>Sort by</b>
                        {Object.entries(SORTBYARMOR_MODES).map(
                            ([key, value]) => {
                                return (
                                    <InputRadio
                                        key={key}
                                        label={value.label}
                                        id={key}
                                        onClick={() => setSortBy(key)}
                                        name="sorting-order"
                                        checked={sortBy === key}
                                    />
                                );
                            }
                        )}
                        <div>
                            <div>
                                <input
                                    type="radio"
                                    id="boss"
                                    onChange={() => setSortBy("boss")}
                                    name={"sorting-order"}
                                    value={"boss"}
                                    checked={sortBy === "boss"}
                                />
                                <label
                                    htmlFor={"boss"}
                                    style={{
                                        color:
                                            sortBy === "boss"
                                                ? "var(--accent)"
                                                : "var(--contrast)",
                                    }}
                                >
                                    Boss
                                </label>{" "}
                                <select
                                    id="boss-select"
                                    itemType="text"
                                    onChange={(e) =>
                                        setBossSortBy(e.target.value)
                                    }
                                >
                                    {SORTBYBOSS_KEYS.map((item: string) => {
                                        return (
                                            <option key={item} value={item}>
                                                {SORTBYBOSS_MODES[item].label}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                        <div>
                            <div>
                                <input
                                    type="radio"
                                    id="custom"
                                    onChange={() => setSortBy("custom")}
                                    name={"sorting-order"}
                                    value={"custom"}
                                    checked={sortBy === "custom"}
                                />
                                <label
                                    htmlFor={"custom"}
                                    style={{
                                        color:
                                            sortBy === "custom"
                                                ? "var(--accent)"
                                                : "var(--contrast)",
                                    }}
                                >
                                    Custom
                                </label>{" "}
                                <button
                                    onClick={() => setCustomizeSortBy(true)}
                                >
                                    Customize
                                </button>
                            </div>
                        </div>
                        <hr />
                        <div>
                            <b>Locked Armor</b>
                            <button
                                id="clear-equipment"
                                onClick={() =>
                                    setLockedItems({
                                        helmet: undefined,
                                        chestpiece: undefined,
                                        gauntlets: undefined,
                                        leggings: undefined,
                                    })
                                }
                            >
                                Reset All
                            </button>
                        </div>
                        <InputSelect
                            label="Helmet"
                            id="locked-helmet"
                            name={LOCKED_ARMOR_SELECT_NAME}
                            onChange={(event) => {
                                setLockedItems({
                                    ...lockedItems,
                                    helmet: HELMETS.find(
                                        (item) => item.id === event.target.value
                                    )!,
                                });
                            }}
                            options={HELMETS}
                            value={lockedItems.helmet?.id}
                        />
                        <InputSelect
                            label="Chestpiece"
                            id="locked-chestpiece"
                            name={LOCKED_ARMOR_SELECT_NAME}
                            onChange={(event) => {
                                setLockedItems({
                                    ...lockedItems,
                                    chestpiece: CHESTPIECES.find(
                                        (item) => item.id === event.target.value
                                    )!,
                                });
                            }}
                            options={CHESTPIECES}
                            value={lockedItems.chestpiece?.id}
                        />
                        <InputSelect
                            label="Gauntlets"
                            id="locked-gauntlets"
                            name={LOCKED_ARMOR_SELECT_NAME}
                            onChange={(event) => {
                                setLockedItems({
                                    ...lockedItems,
                                    gauntlets: GAUNTLETS.find(
                                        (item) => item.id === event.target.value
                                    )!,
                                });
                            }}
                            options={GAUNTLETS}
                            value={lockedItems.gauntlets?.id}
                        />
                        <InputSelect
                            label="Leggings"
                            id="locked-leggings"
                            name={LOCKED_ARMOR_SELECT_NAME}
                            onChange={(event) => {
                                setLockedItems({
                                    ...lockedItems,
                                    leggings: LEGGINGS.find(
                                        (item) => item.id === event.target.value
                                    )!,
                                });
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
                                                setIgnoredItems([
                                                    ...ignoredItems.filter(
                                                        (ignoredItem) =>
                                                            ignoredItem !==
                                                            ignoredItems.find(
                                                                (oldItem) =>
                                                                    oldItem ==
                                                                    item
                                                            )!
                                                    ),
                                                ])
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
                                                    setIgnoredItems([
                                                        ...ignoredItems,
                                                        set.helmet!,
                                                    ]),
                                                () =>
                                                    setIgnoredItems([
                                                        ...ignoredItems,
                                                        set.chestpiece!,
                                                    ]),
                                                () =>
                                                    setIgnoredItems([
                                                        ...ignoredItems,
                                                        set.gauntlets!,
                                                    ]),
                                                () =>
                                                    setIgnoredItems([
                                                        ...ignoredItems,
                                                        set.leggings!,
                                                    ]),
                                            ]}
                                            hotkeys={hotkeyGroups[i]}
                                        />
                                    );
                                })}
                            </table>
                        </div>
                    </article>
                    <div>
                        <h2 style={{ textAlign: "center" }}>Boss Sorting</h2>
                        <p>
                            You can sort the armor pieces based on what is most
                            optimal against a particular boss. This can be done
                            by selecting the &quot;Boss&quot; sorting mode and
                            using the dropdown to select a boss.
                        </p>
                        <p>
                            Notably, each of those boss sorting modes is simple.
                            It&apos;s just a summation based on all damage types
                            and status effects dealt by that boss. If you want
                            something more nuanced or complex, you can create a
                            custom sorting algorithm!
                        </p>
                        <h2 style={{ textAlign: "center" }}>Custom Sorting</h2>
                        <p>
                            By clicking the &quot;Customize&quot; button to the
                            right of the &quot;Custom&quot; sorting mode, you
                            will see the sorting algorithm for the currently
                            selected sorting mode.
                        </p>
                        <p>
                            From here, you can customize the sorting algorithm.
                            When you&apos;re done, click the &quot;Submit&quot;
                            button to save your new custom sorting algorithm to
                            the &quot;Custom&quot; sorting mode.
                        </p>
                        <h2 style={{ textAlign: "center" }}>Ignoring Armor</h2>
                        <p>
                            Click the &quot;❌&quot; next to any armor piece to
                            remove it from the pool of armor being considered
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
                            red &quot;❌&quot;s to see what its hotkey is.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
