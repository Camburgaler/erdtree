/**
 * @jest-environment node
 */

import {
    analyzeTokens,
    DEFAULT_SORTBYARMOR,
    evaluateSortBy,
    getChildTokenGroups,
    marshallSortByToString,
    marshallSortByToTokenGroups,
    marshallSortByToTokens,
    SortByArmor,
    unmarshallSortBy,
} from "@/app/armor/components/customSortBy/sorting";
import { deepCloneAndMap } from "@/app/util/script";
import Armor from "@/app/util/types/armor";

describe("Armor Sorting Script", () => {
    // dummy armor
    const armor: Armor = {
        id: "alberichs-robe",
        name: "Alberich's Robe",
        defenses: {
            physical: 5.3,
            slash: 5.3,
            strike: 4.2,
            pierce: 5.3,
            magic: 12.8,
            fire: 11.9,
            lightning: 12.4,
            holy: 12.8,
        },
        resistances: {
            "scarlet-rot": 38,
            poison: 38,
            hemorrhage: 23,
            frostbite: 23,
            sleep: 67,
            madness: 67,
            "death-blight": 71,
        },
        poise: 7,
        weight: 4.1,
    };

    // evaluateSortBy
    // errors
    test("evaluateSortBy with a sum error", () => {
        const sortBy: SortByArmor = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
            { operation: "sum" },
        ]);

        expect(() => evaluateSortBy(sortBy, armor!)).toThrow(
            "Cannot have sum without at least 2 values"
        );
    });

    test("evaluateSortBy with an average error", () => {
        const sortBy: SortByArmor = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
            { operation: "average" },
        ]);

        expect(() => evaluateSortBy(sortBy, armor!)).toThrow(
            "Cannot have average without at least 2 values"
        );
    });

    test("evaluateSortBy with a multiply error", () => {
        const sortBy: SortByArmor = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
            { operation: "multiply" },
        ]);

        expect(() => evaluateSortBy(sortBy, armor!)).toThrow(
            "Cannot multiply without at least 2 values"
        );
    });

    test("evaluateSortBy with a value error", () => {
        const sortBy: SortByArmor = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
            { physical: true },
            { strike: true },
        ]);

        expect(() => evaluateSortBy(sortBy, armor!)).toThrow(
            "Cannot have more than 1 value without average, sum, or multiply"
        );
    });

    // average
    test("evaluateSortBy with average", () => {
        const sortBy: SortByArmor = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
            { operation: "average" },
            { physical: true },
            { strike: true },
        ]);

        const result = evaluateSortBy(sortBy, armor!);

        expect(result).toBe(4.75);
    });

    test("evaluateSortBy with average with children", () => {
        const sortBy: SortByArmor = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
            { operation: "average" },
            { children: [5, 4.5] },
        ]);

        const result = evaluateSortBy(sortBy, armor!);

        expect(result).toBe(4.75);
    });

    test("evaluateSortBy with average with resistance", () => {
        const sortBy: SortByArmor = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
            { operation: "average" },
            { "scarlet-rot": true },
            { poison: true },
        ]);

        const result = evaluateSortBy(sortBy, armor!);

        expect(result).toBe(38);
    });

    test("evaluateSortBy with average with poise", () => {
        const sortBy: SortByArmor = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
            { operation: "average" },
            { "scarlet-rot": true },
            { poise: true },
        ]);

        const result = evaluateSortBy(sortBy, armor!);

        expect(result).toBe(22.5);
    });

    // sum
    test("evaluateSortBy with sum", () => {
        const sortBy: SortByArmor = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
            { operation: "sum" },
            { physical: true },
            { strike: true },
        ]);

        const result = evaluateSortBy(sortBy, armor!);

        expect(result).toBe(9.5);
    });

    test("evaluateSortBy with sum with children", () => {
        const sortBy: SortByArmor = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
            { operation: "sum" },
            { children: [5, 4.5] },
        ]);

        const result = evaluateSortBy(sortBy, armor!);

        expect(result).toBe(9.5);
    });

    test("evaluateSortBy with sum with resistance", () => {
        const sortBy: SortByArmor = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
            { operation: "sum" },
            { "scarlet-rot": true },
            { poison: true },
        ]);

        const result = evaluateSortBy(sortBy, armor!);

        expect(result).toBe(76);
    });

    test("evaluateSortBy with sum with poise", () => {
        const sortBy: SortByArmor = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
            { operation: "sum" },
            { "scarlet-rot": true },
            { poise: true },
        ]);

        const result = evaluateSortBy(sortBy, armor!);

        expect(result).toBe(45);
    });

    // multiply
    test("evaluateSortBy with multiply", () => {
        const sortBy: SortByArmor = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
            { operation: "multiply" },
            { physical: true },
            { strike: true },
        ]);

        const result = evaluateSortBy(sortBy, armor!);

        expect(result).toBe(22.26);
    });

    test("evaluateSortBy with multiply with children", () => {
        const sortBy: SortByArmor = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
            { operation: "multiply" },
            { children: [5, 4.5] },
        ]);

        const result = evaluateSortBy(sortBy, armor!);

        expect(result).toBe(22.5);
    });

    test("evaluateSortBy with multiply with resistance", () => {
        const sortBy: SortByArmor = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
            { operation: "multiply" },
            { "scarlet-rot": true },
            { poison: true },
        ]);

        const result = evaluateSortBy(sortBy, armor!);

        expect(result).toBe(1444);
    });

    test("evaluateSortBy with multiply with poise", () => {
        const sortBy: SortByArmor = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
            { operation: "multiply" },
            { "scarlet-rot": true },
            { poise: true },
        ]);

        const result = evaluateSortBy(sortBy, armor!);

        expect(result).toBe(266);
    });

    // value
    test("evaluateSortBy with value", () => {
        const sortBy: SortByArmor = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
            { physical: true },
        ]);

        const result = evaluateSortBy(sortBy, armor!);

        expect(result).toBe(5.3);
    });

    test("evaluateSortBy with value with children", () => {
        const sortBy: SortByArmor = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
            { children: [5] },
        ]);

        const result = evaluateSortBy(sortBy, armor!);

        expect(result).toBe(5);
    });

    test("evaluateSortBy with value with resistance", () => {
        const sortBy: SortByArmor = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
            { "scarlet-rot": true },
        ]);

        const result = evaluateSortBy(sortBy, armor!);

        expect(result).toBe(38);
    });

    test("evaluateSortBy with value with poise", () => {
        const sortBy: SortByArmor = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
            { poise: true },
        ]);

        const result = evaluateSortBy(sortBy, armor!);

        expect(result).toBe(7);
    });

    // getChildTokenGroups
    test("getChildTokenGroups", () => {
        const tokens: string[] = ["(", "PHYSICAL", ")"];

        const result = getChildTokenGroups(tokens);

        expect(result).toEqual([["("], ["PHYSICAL"], [")"]]);
    });

    // marshallSortByToTokens
    // value
    test("marshallSortByToTokens with value", () => {
        const sortBy: SortByArmor = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
            { physical: true },
        ]);

        const result = marshallSortByToTokens(sortBy);

        expect(result).toEqual(["(", "PHYSICAL", ")"]);
    });

    // average
    test("marshallSortByToTokens with average", () => {
        const sortBy: SortByArmor = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
            { operation: "average" },
            { physical: true },
        ]);

        const result = marshallSortByToTokens(sortBy);

        expect(result).toEqual(["AVG(", "PHYSICAL", ")"]);
    });

    // sum
    test("marshallSortByToTokens with sum", () => {
        const sortBy: SortByArmor = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
            { operation: "sum" },
            { physical: true },
        ]);

        const result = marshallSortByToTokens(sortBy);

        expect(result).toEqual(["SUM(", "PHYSICAL", ")"]);
    });

    // multiply
    test("marshallSortByToTokens with multiply", () => {
        const sortBy: SortByArmor = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
            { operation: "multiply" },
            { physical: true },
        ]);

        const result = marshallSortByToTokens(sortBy);

        expect(result).toEqual(["MULT(", "PHYSICAL", ")"]);
    });

    // number child
    test("marshallSortByToTokens with number child", () => {
        const sortBy: SortByArmor = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
            { children: [5] },
        ]);

        const result = marshallSortByToTokens(sortBy);

        expect(result).toEqual(["(", "5", ")"]);
    });

    // SortByArmor child
    test("marshallSortByToTokens with number child", () => {
        const sortBy: SortByArmor = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
            {
                children: [
                    deepCloneAndMap(DEFAULT_SORTBYARMOR, [{ children: [5] }]),
                ],
            },
        ]);

        const result = marshallSortByToTokens(sortBy);

        expect(result).toEqual(["(", "(", "5", ")", ")"]);
    });

    // marshallSortByToTokenGroups
    test("marshallSortByToTokenGroups", () => {
        const sortBy: SortByArmor = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
            { physical: true },
        ]);

        const result = marshallSortByToTokenGroups(sortBy);

        expect(result).toEqual([["("], ["PHYSICAL"], [")"]]);
    });

    // marshallSortByToString
    test("marshallSortByToString", () => {
        const sortBy: SortByArmor = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
            { physical: true },
        ]);

        const result = marshallSortByToString(sortBy);

        expect(result).toEqual("( PHYSICAL )");
    });

    // analyzeTokens
    test("analyzeTokens", () => {
        const tokens: string[] = [
            "SUM(",
            "5",
            "MULT(",
            "STRIKE",
            "0.5",
            ")",
            ")",
        ];

        const result = analyzeTokens(tokens);

        expect(result).toEqual({
            tempTokenTypes: [
                "string",
                "number",
                "SortByArmor",
                "SortByArmor",
                "SortByArmor",
                "SortByArmor",
                "string",
            ],
            tempChildrenTokenGroups: [
                ["SUM("],
                ["5"],
                ["MULT(", "STRIKE", "0.5", ")"],
                [")"],
            ],
        });
    });

    // unmarshallSortBy
    // happy path
    test("unmarshallSortBy", () => {
        const result = unmarshallSortBy("( PHYSICAL )");

        const expected: SortByArmor = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
            { physical: true },
        ]);

        expect(result).toEqual(expected);
    });

    // average
    test("unmarshallSortBy with average", () => {
        const result = unmarshallSortBy("AVG( PHYSICAL STRIKE )");

        const expected: SortByArmor = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
            { operation: "average" },
            { physical: true },
            { strike: true },
        ]);

        expect(result).toEqual(expected);
    });

    // sum
    test("unmarshallSortBy with sum", () => {
        const result = unmarshallSortBy("SUM( PHYSICAL STRIKE )");

        const expected: SortByArmor = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
            { operation: "sum" },
            { physical: true },
            { strike: true },
        ]);

        expect(result).toEqual(expected);
    });

    // multiply
    test("unmarshallSortBy with multiply", () => {
        const result = unmarshallSortBy("MULT( PHYSICAL STRIKE )");

        const expected: SortByArmor = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
            { operation: "multiply" },
            { physical: true },
            { strike: true },
        ]);

        expect(result).toEqual(expected);
    });

    // number
    test("unmarshallSortBy with number", () => {
        const result = unmarshallSortBy("( 5 )");

        const expected: SortByArmor = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
            { children: [5] },
        ]);

        expect(result).toEqual(expected);
    });

    // child
    test("unmarshallSortBy with child", () => {
        const result = unmarshallSortBy("MULT( 0.5 SUM( PHYSICAL STRIKE ) )");

        const expected: SortByArmor = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
            { operation: "multiply" },
            {
                children: [
                    0.5,
                    deepCloneAndMap(DEFAULT_SORTBYARMOR, [
                        { operation: "sum" },
                        { physical: true },
                        { strike: true },
                    ]),
                ],
            },
        ]);

        expect(result).toEqual(expected);
    });

    // invalid token
    test("unmarshallSortBy with invalid token", () => {
        expect(() => unmarshallSortBy("( INVALID )")).toThrow(
            "Invalid token: INVALID"
        );
    });

    // invalid opening parenthesis
    test("unmarshallSortBy with invalid opening parenthesis", () => {
        expect(() => unmarshallSortBy("INVALID )")).toThrow(
            "Missing opening and/or closing parenthesis"
        );
    });

    // invalid closing parenthesis
    test("unmarshallSortBy with invalid closing parenthesis", () => {
        expect(() => unmarshallSortBy("( INVALID")).toThrow(
            "Missing opening and/or closing parenthesis"
        );
    });

    // unmatched parentheses
    test("unmarshallSortBy with invalid closing parenthesis", () => {
        expect(() => unmarshallSortBy("( INVALID ) )")).toThrow(
            "Parentheses do not match"
        );
    });

    // sum error
    test("unmarshallSortBy with sum error", () => {
        expect(() => unmarshallSortBy("SUM( )")).toThrow(
            "Cannot have sum without at least 2 values"
        );
    });

    // average error
    test("unmarshallSortBy with average error", () => {
        expect(() => unmarshallSortBy("AVG( )")).toThrow(
            "Cannot have average without at least 2 values"
        );
    });

    // multiply error
    test("unmarshallSortBy with multiply error", () => {
        expect(() => unmarshallSortBy("MULT( )")).toThrow(
            "Cannot multiply without at least 2 values"
        );
    });

    // value error
    test("unmarshallSortBy with value error", () => {
        expect(() => unmarshallSortBy("( PHYSICAL STRIKE )")).toThrow(
            "Cannot have more than 1 value without average or sum"
        );
    });
});
