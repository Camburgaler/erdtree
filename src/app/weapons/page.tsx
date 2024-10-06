"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
    ATTACK_POWER_TYPE_MODE_All,
    ATTACK_POWER_TYPE_MODE_ANY,
    ATTACK_POWER_TYPE_MODE_EXACTLY,
    ATTACK_POWER_TYPE_NAMES,
    CATEGORY_NAMES,
    INFUSION_NAMES,
    INFUSIONS,
} from "../util/constants";
import AttackPowerTypeMap from "../util/interfaces/attackPowerTypeMap";
import CategoryMap from "../util/interfaces/categoryMap";
import InfusionMap from "../util/interfaces/infusionMap";
import StatMap from "../util/interfaces/statMap";
import { mapResults, mapWeapons, SortBy, WeaponResult } from "./script";

export default function Weapons() {
    // STATES
    const [results, setResults] = useState<WeaponResult[]>([]);
    const [stats, setStats] = useState<StatMap<number>>({
        STR: 10,
        DEX: 10,
        INT: 10,
        FTH: 10,
        ARC: 10,
    });
    const [reinforced, setReinforced] = useState(true);
    const [requireStats, setRequireStats] = useState(true);
    const [buffableOnly, setBuffableOnly] = useState(false);
    const [splitDamage, setSplitDamage] = useState(true);
    const [statusEffects, setStatusEffects] = useState<boolean>(false);
    const [twoHanded, setTwoHanded] = useState(false);
    const [infusions, setInfusions] = useState<InfusionMap<boolean>>({
        standard: true,
        heavy: true,
        keen: true,
        quality: true,
        magic: true,
        fire: true,
        "flame-art": true,
        lightning: true,
        sacred: true,
        poison: true,
        blood: true,
        cold: true,
        occult: true,
    });
    const [attackPowerTypeMode, setAttackPowerTypeMode] = useState<string>(
        ATTACK_POWER_TYPE_MODE_ANY
    );
    const [attackPowerTypesInclude, setAttackPowerTypesInclude] =
        useState<boolean>(true);
    const [attackPowerTypes, setAttackPowerTypes] = useState<
        AttackPowerTypeMap<boolean>
    >({
        physical: true,
        magic: true,
        fire: true,
        lightning: true,
        holy: true,
        blood: true,
        poison: true,
        frost: true,
        "scarlet-rot": true,
        madness: true,
        sleep: true,
    });
    const [sortBy, setSortBy] = useState<SortBy>({
        dmgType: "max",
        desc: true,
    });
    const [categories, setCategories] = useState<CategoryMap<boolean>>({
        dagger: true,
        "straight-sword": true,
        greatsword: true,
        "colossal-sword": true,
        "thrusting-sword": true,
        "heavy-thrusting-sword": true,
        "curved-sword": true,
        "curved-greatsword": true,
        katana: true,
        twinblade: true,
        hammer: true,
        "great-hammer": true,
        flail: true,
        axe: true,
        greataxe: true,
        spear: true,
        "great-spear": true,
        halberd: true,
        scythe: true,
        whip: true,
        fist: true,
        claw: true,
        "colossal-weapon": true,
        torch: true,
        "thrusting-shield": true,
        "hand-to-hand-art": true,
        "throwing-blade": true,
        "backhand-blade": true,
        "perfume-bottle": true,
        "beast-claw": true,
        "light-greatsword": true,
        "great-katana": true,
        "light-bow": false,
        bow: false,
        greatbow: false,
        crossbow: false,
        ballista: false,
        "small-shield": false,
        "medium-shield": false,
        greatshield: false,
        "glintstone-staff": false,
        "sacred-seal": false,
    });

    // FUNCTIONS
    function updateStats(id: string, value: number) {
        setStats({
            ...stats,
            [id]: value < 0 ? 0 : value > 99 ? 99 : value,
        });
    }

    function updateCategories(id: string, state: boolean): void {
        setCategories({
            ...categories,
            [id]: state,
        });
    }

    function updateInfusions(id: string, state: boolean): void {
        setInfusions({
            ...infusions,
            [id]: state,
        });
    }

    function updateAttackPowerTypes(id: string, state: boolean): void {
        setAttackPowerTypes({
            ...attackPowerTypes,
            [id]: state,
        });
    }

    function setAllInfusions(state: boolean): void {
        setInfusions({
            standard: state,
            heavy: state,
            keen: state,
            quality: state,
            magic: state,
            fire: state,
            "flame-art": state,
            lightning: state,
            sacred: state,
            poison: state,
            blood: state,
            cold: state,
            occult: state,
        });
    }

    function setAllAttackPowerTypes(state: boolean): void {
        setAttackPowerTypes({
            physical: state,
            magic: state,
            fire: state,
            lightning: state,
            holy: state,
            blood: state,
            poison: state,
            frost: state,
            "scarlet-rot": state,
            madness: state,
            sleep: state,
        });
    }

    function setAllCategories(state: boolean): void {
        setCategories({
            dagger: state,
            "straight-sword": state,
            greatsword: state,
            "colossal-sword": state,
            "thrusting-sword": state,
            "heavy-thrusting-sword": state,
            "curved-sword": state,
            "curved-greatsword": state,
            katana: state,
            twinblade: state,
            hammer: state,
            "great-hammer": state,
            flail: state,
            axe: state,
            greataxe: state,
            spear: state,
            "great-spear": state,
            halberd: state,
            scythe: state,
            whip: state,
            fist: state,
            claw: state,
            "colossal-weapon": state,
            torch: state,
            "thrusting-shield": state,
            "hand-to-hand-art": state,
            "throwing-blade": state,
            "backhand-blade": state,
            "perfume-bottle": state,
            "beast-claw": state,
            "light-greatsword": state,
            "great-katana": state,
            "light-bow": state,
            bow: state,
            greatbow: state,
            crossbow: state,
            ballista: state,
            "small-shield": state,
            "medium-shield": state,
            greatshield: state,
            "glintstone-staff": state,
            "sacred-seal": state,
        });
    }

    function setAllWeaponCategories(state: boolean): void {
        setCategories({
            ...categories,
            dagger: state,
            "straight-sword": state,
            greatsword: state,
            "colossal-sword": state,
            "thrusting-sword": state,
            "heavy-thrusting-sword": state,
            "curved-sword": state,
            "curved-greatsword": state,
            katana: state,
            twinblade: state,
            hammer: state,
            "great-hammer": state,
            flail: state,
            axe: state,
            greataxe: state,
            spear: state,
            "great-spear": state,
            halberd: state,
            scythe: state,
            whip: state,
            fist: state,
            claw: state,
            "colossal-weapon": state,
            torch: state,
            "thrusting-shield": state,
            "hand-to-hand-art": state,
            "throwing-blade": state,
            "backhand-blade": state,
            "perfume-bottle": state,
            "beast-claw": state,
            "light-greatsword": state,
            "great-katana": state,
        });
    }

    function resetAll(): void {
        setStats({
            STR: 10,
            DEX: 10,
            INT: 10,
            FTH: 10,
            ARC: 10,
        });
        setReinforced(true);
        setRequireStats(true);
        setBuffableOnly(false);
        setSplitDamage(true);
        setTwoHanded(false);
        setAllInfusions(true);
        setAttackPowerTypeMode(ATTACK_POWER_TYPE_MODE_ANY);
        setAllAttackPowerTypes(true);
        setAttackPowerTypesInclude(true);
    }

    function createCategoryCheckbox(
        categoryId: string,
        i: number
    ): JSX.Element {
        return (
            <div key={categoryId}>
                <span>
                    <input
                        type="checkbox"
                        id={categoryId}
                        name="category"
                        className={
                            i < CATEGORY_NAMES[0].length
                                ? "weapon"
                                : i <
                                  CATEGORY_NAMES[0].length +
                                      CATEGORY_NAMES[1].length
                                ? "ranged"
                                : i <
                                  CATEGORY_NAMES[0].length +
                                      CATEGORY_NAMES[1].length +
                                      CATEGORY_NAMES[2].length
                                ? "shield"
                                : "catalyst"
                        }
                        onChange={(event) =>
                            updateCategories(categoryId, event.target.checked)
                        }
                        checked={categories[categoryId]}
                    />
                    <label htmlFor={categoryId}>
                        {i < CATEGORY_NAMES[0].length
                            ? CATEGORY_NAMES[0][i]
                            : i <
                              CATEGORY_NAMES[0].length +
                                  CATEGORY_NAMES[1].length
                            ? CATEGORY_NAMES[1][i - CATEGORY_NAMES[0].length]
                            : i <
                              CATEGORY_NAMES[0].length +
                                  CATEGORY_NAMES[1].length +
                                  CATEGORY_NAMES[2].length
                            ? CATEGORY_NAMES[2][
                                  i -
                                      CATEGORY_NAMES[0].length -
                                      CATEGORY_NAMES[1].length
                              ]
                            : CATEGORY_NAMES[3][
                                  i -
                                      CATEGORY_NAMES[0].length -
                                      CATEGORY_NAMES[1].length -
                                      CATEGORY_NAMES[2].length
                              ]}
                    </label>
                </span>
            </div>
        );
    }

    // EFFECTS
    useEffect(() => {
        let filtered = mapWeapons(
            stats,
            twoHanded,
            requireStats,
            categories,
            infusions,
            buffableOnly,
            splitDamage,
            attackPowerTypesInclude,
            attackPowerTypeMode,
            attackPowerTypes,
            reinforced,
            statusEffects
        );
        filtered.forEach((weapon) => {
            if (weapon.max == 0) {
                filtered = filtered.filter((w) => w != weapon);
            }
        });
        setResults(filtered);
    }, [
        stats,
        reinforced,
        requireStats,
        buffableOnly,
        twoHanded,
        infusions,
        categories,
        sortBy,
        splitDamage,
        attackPowerTypesInclude,
        attackPowerTypeMode,
        attackPowerTypes,
        statusEffects,
    ]);

    // RENDER
    return (
        <div>
            <header>
                <h1>Weapon Finder</h1>
            </header>
            <main>
                <div className="app">
                    {/* <!-- parameters --> */}
                    <article style={{ flexBasis: "15%" }}>
                        <div>
                            <b>Parameters</b>
                            <button
                                onClick={resetAll}
                                style={{ marginBottom: "0px" }}
                            >
                                Reset All
                            </button>
                        </div>
                        <hr />
                        {Object.keys(stats).map((statId: string) => (
                            <div key={statId}>
                                <label htmlFor="str">{statId}</label>
                                <input
                                    id={statId.toLowerCase()}
                                    type="number"
                                    name="stat"
                                    value={stats[statId]}
                                    min={0}
                                    max={99}
                                    onChange={(event) => {
                                        updateStats(
                                            statId,
                                            +event.target.value
                                        );
                                    }}
                                />
                            </div>
                        ))}
                        <hr />
                        <b>Reinforcement</b>
                        <div>
                            <span>
                                <input
                                    type="radio"
                                    id="max-upgrade"
                                    name="upgrade-level"
                                    onChange={() => {
                                        setReinforced(true);
                                    }}
                                    checked={reinforced}
                                />
                                <label htmlFor="max-upgrade">
                                    Reinforced (+10 or +25)
                                </label>
                            </span>
                        </div>
                        <div>
                            <span>
                                <input
                                    type="radio"
                                    id="min-upgrade"
                                    name="upgrade-level"
                                    onChange={() => {
                                        setReinforced(false);
                                    }}
                                    checked={!reinforced}
                                />
                                <label htmlFor="min-upgrade">
                                    Not Reinforced (+0)
                                </label>
                            </span>
                        </div>
                        <hr />
                        <div>
                            <span>
                                <input
                                    id="requirements"
                                    type="checkbox"
                                    onChange={(event) => {
                                        setRequireStats(event.target.checked);
                                    }}
                                    checked={requireStats}
                                />
                                <label htmlFor="requirements">
                                    Requirements Met
                                </label>
                            </span>
                        </div>
                        <div>
                            <span>
                                <input
                                    type="checkbox"
                                    id="buffable"
                                    onChange={(event) => {
                                        setBuffableOnly(event.target.checked);
                                    }}
                                    checked={buffableOnly}
                                />
                                <label htmlFor="buffable">Buffable Only</label>
                            </span>
                        </div>
                        <div>
                            <span>
                                <input
                                    type="checkbox"
                                    id="split-damage"
                                    onChange={(event) => {
                                        setSplitDamage(event.target.checked);
                                    }}
                                    checked={splitDamage}
                                />
                                <label htmlFor="split-damage">
                                    Allow Split Damage
                                </label>
                            </span>
                        </div>
                        <div>
                            <span>
                                <input
                                    type="checkbox"
                                    id="status-effects"
                                    onChange={(event) => {
                                        setStatusEffects(event.target.checked);
                                    }}
                                    checked={statusEffects}
                                />
                                <label htmlFor="status-effects">
                                    Consider Status Effects
                                </label>
                            </span>
                        </div>
                        <hr />
                        <b>Handedness</b>
                        <div>
                            <span>
                                <input
                                    type="radio"
                                    id="2h-never"
                                    name="handedness"
                                    onChange={(event) => {
                                        setTwoHanded(!event.target.checked);
                                    }}
                                    checked={!twoHanded}
                                />
                                <label htmlFor="2h-never">One-handing</label>
                            </span>
                        </div>
                        <div>
                            <span>
                                <input
                                    id="2h-always"
                                    type="radio"
                                    name="handedness"
                                    onChange={(event) => {
                                        setTwoHanded(event.target.checked);
                                    }}
                                    checked={twoHanded}
                                />
                                <label htmlFor="2h-always">Two-handing</label>
                            </span>
                        </div>
                        <hr />
                        <div>
                            <b>Infusions</b>
                            <span>
                                <button onClick={() => setAllInfusions(true)}>
                                    Any
                                </button>
                                <button onClick={() => setAllInfusions(false)}>
                                    None
                                </button>
                            </span>
                        </div>
                        {Object.keys(infusions).map((key: string, i) => (
                            <div key={key}>
                                <span>
                                    <input
                                        id={key + "-infusion"}
                                        value={key}
                                        type="checkbox"
                                        name="infusion"
                                        onChange={(event) => {
                                            updateInfusions(
                                                key,
                                                event.target.checked
                                            );
                                        }}
                                        checked={infusions[key]}
                                    />
                                    <label htmlFor={key}>
                                        {INFUSION_NAMES[i]}
                                    </label>
                                </span>
                            </div>
                        ))}
                        <hr />
                        <div>
                            <b>Attack Power Types</b>
                            <span>
                                <button
                                    onClick={() => {
                                        setAllAttackPowerTypes(true);
                                    }}
                                >
                                    Any
                                </button>
                                <button
                                    onClick={() =>
                                        setAllAttackPowerTypes(false)
                                    }
                                >
                                    None
                                </button>
                            </span>
                        </div>
                        <div>
                            <span style={{ width: "100%" }}>
                                <button
                                    style={{ width: "100%" }}
                                    onClick={() =>
                                        setAttackPowerTypesInclude(
                                            !attackPowerTypesInclude
                                        )
                                    }
                                >
                                    {attackPowerTypesInclude
                                        ? "ONLY INCLUDE results that contain..."
                                        : "EXCLUDE results that contain..."}
                                </button>
                            </span>
                        </div>
                        <div>
                            <span>
                                <input
                                    type="radio"
                                    id="attack-power-type-any"
                                    name="attack-power-type-mode"
                                    onChange={() => {
                                        setAttackPowerTypeMode(
                                            ATTACK_POWER_TYPE_MODE_ANY
                                        );
                                    }}
                                    checked={
                                        attackPowerTypeMode ===
                                        ATTACK_POWER_TYPE_MODE_ANY
                                    }
                                />
                                <label htmlFor="attack-power-type-any">
                                    ANY of the following
                                </label>
                            </span>
                        </div>
                        <div>
                            <span>
                                <input
                                    type="radio"
                                    id="attack-power-type-all"
                                    name="attack-power-type-mode"
                                    onChange={() => {
                                        setAttackPowerTypeMode(
                                            ATTACK_POWER_TYPE_MODE_All
                                        );
                                    }}
                                    checked={
                                        attackPowerTypeMode ===
                                        ATTACK_POWER_TYPE_MODE_All
                                    }
                                />
                                <label htmlFor="attack-power-type-all">
                                    ALL of the following
                                </label>
                            </span>
                        </div>
                        <div>
                            <span>
                                <input
                                    type="radio"
                                    id="attack-power-type-exactly"
                                    name="attack-power-type-mode"
                                    onChange={() => {
                                        setAttackPowerTypeMode(
                                            ATTACK_POWER_TYPE_MODE_EXACTLY
                                        );
                                    }}
                                    checked={
                                        attackPowerTypeMode ===
                                        ATTACK_POWER_TYPE_MODE_EXACTLY
                                    }
                                />
                                <label htmlFor="attack-power-type-exactly">
                                    EXACTLY the following
                                </label>
                            </span>
                        </div>
                        {Object.keys(attackPowerTypes).map((key: string, i) => (
                            <div key={key}>
                                <span>
                                    <input
                                        id={key + "-attack-power-type"}
                                        value={key}
                                        type="checkbox"
                                        name="attack-power-type"
                                        onChange={(event) => {
                                            updateAttackPowerTypes(
                                                key,
                                                event.target.checked
                                            );
                                        }}
                                        checked={attackPowerTypes[key]}
                                    />
                                    <label htmlFor={key}>
                                        {ATTACK_POWER_TYPE_NAMES[i]}
                                    </label>
                                </span>
                            </div>
                        ))}
                    </article>
                    {/* <!-- results --> */}
                    <article style={{ flexBasis: "55%" }}>
                        <b>Attack Power</b>
                        <div style={{ overflow: "auto" }}>
                            <table>
                                <thead>
                                    <tr>
                                        <th style={{ minWidth: "2rem" }}>
                                            <b style={{ userSelect: "none" }}>
                                                Weapon
                                            </b>
                                        </th>
                                        <th>
                                            <b
                                                onClick={() => {
                                                    sortBy.dmgType == "max"
                                                        ? setSortBy({
                                                              ...sortBy,
                                                              desc: !sortBy.desc,
                                                          })
                                                        : setSortBy({
                                                              dmgType: "max",
                                                              desc: true,
                                                          });
                                                }}
                                                onMouseOver={(event) =>
                                                    (event.currentTarget.style.cursor =
                                                        "pointer")
                                                }
                                                style={{ userSelect: "none" }}
                                            >
                                                {" "}
                                                Max{" "}
                                            </b>
                                        </th>
                                        {Object.entries(INFUSIONS).map(
                                            ([key, value]) => (
                                                <th key={key} id={key}>
                                                    <Image
                                                        src={
                                                            "/icons/" +
                                                            key +
                                                            ".jpg"
                                                        }
                                                        style={{
                                                            maxWidth: "20px",
                                                        }}
                                                        width={20}
                                                        height={20}
                                                        title={value.name}
                                                        alt={value.name}
                                                        onClick={() => {
                                                            sortBy.dmgType ==
                                                            key
                                                                ? setSortBy({
                                                                      ...sortBy,
                                                                      desc: !sortBy.desc,
                                                                  })
                                                                : setSortBy({
                                                                      dmgType:
                                                                          key,
                                                                      desc: true,
                                                                  });
                                                        }}
                                                    />
                                                </th>
                                            )
                                        )}
                                    </tr>
                                </thead>
                                <tbody id="weapons">
                                    {mapResults(results, sortBy)}
                                </tbody>
                            </table>
                        </div>
                    </article>
                    {/* <!-- categories --> */}
                    <article style={{ flexBasis: "15%" }}>
                        <div>
                            <b>Categories</b>
                            <span>
                                <button onClick={() => setAllCategories(true)}>
                                    Any
                                </button>
                                <button onClick={() => setAllCategories(false)}>
                                    None
                                </button>
                            </span>
                        </div>
                        <hr />
                        <div>
                            <b>Weapons</b>
                            <span>
                                <button
                                    onClick={() => setAllWeaponCategories(true)}
                                >
                                    Any
                                </button>
                                <button
                                    onClick={() =>
                                        setAllWeaponCategories(false)
                                    }
                                >
                                    None
                                </button>
                            </span>
                        </div>
                        {Object.keys(categories).map(
                            (categoryId: string, i: number) =>
                                i == CATEGORY_NAMES[0].length
                                    ? [
                                          <hr key={"hr_" + categoryId} />,
                                          <div key={"div_" + categoryId}>
                                              <b>Ranged</b>
                                          </div>,
                                          createCategoryCheckbox(categoryId, i),
                                      ].map((c: JSX.Element) => c)
                                    : i ==
                                      CATEGORY_NAMES[0].length +
                                          CATEGORY_NAMES[1].length
                                    ? [
                                          <hr key={"hr_" + categoryId} />,
                                          <div key={"div_" + categoryId}>
                                              <b>Shields</b>
                                          </div>,
                                          createCategoryCheckbox(categoryId, i),
                                      ].map((c: JSX.Element) => c)
                                    : i ==
                                      CATEGORY_NAMES[0].length +
                                          CATEGORY_NAMES[1].length +
                                          CATEGORY_NAMES[2].length
                                    ? [
                                          <hr key={"hr_" + categoryId} />,
                                          <div key={"div_" + categoryId}>
                                              <b>Catalysts</b>
                                          </div>,
                                          createCategoryCheckbox(categoryId, i),
                                      ].map((c: JSX.Element) => c)
                                    : createCategoryCheckbox(categoryId, i)
                        )}
                    </article>
                </div>
                <div>
                    <h2 style={{ textAlign: "center" }}>Notes</h2>
                    <p>
                        Click the headers in the table to sort the table based
                        that column.
                    </p>
                    <p>
                        You can choose between six modes of attack power types:
                    </p>
                    <ul>
                        <li>
                            INCLUDE:
                            <ul>
                                <li>
                                    ANY: Will display an attack rating as long
                                    as it includes any one of the selected
                                    attack power types.
                                </li>
                                <li>
                                    ALL: Will display an attack rating as long
                                    as it includes all of the selected attack
                                    power types.
                                </li>
                                <li>
                                    EXACTLY: Will display an attack rating only
                                    if it consists of exactly the combination of
                                    attack power types selected.
                                </li>
                            </ul>
                        </li>
                        <li>
                            EXCLUDE:
                            <ul>
                                <li>
                                    ANY: Will not display an attack rating as
                                    long as it includes any one of the selected
                                    attack power types.
                                </li>
                                <li>
                                    ALL: Will not display an attack rating as
                                    long as it includes all of the selected
                                    attack power types.
                                </li>
                                <li>
                                    EXACTLY: Will not display an attack rating
                                    only if it consists of exactly the
                                    combination of attack power types selected.
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <p>
                        Glintstone Staves and Sacred Seals will show their{" "}
                        <em>attack rating</em>, not their <em>spell scaling</em>
                        .
                    </p>
                    <p>
                        The same holds true for shields, which are also sorted
                        based on <em>attack rating</em>.
                    </p>
                </div>
            </main>
        </div>
    );
}
