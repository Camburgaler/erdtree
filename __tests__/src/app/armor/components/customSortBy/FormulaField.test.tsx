import "core-js/actual/structured-clone";

import FormulaField from "@/app/armor/components/customSortBy/FormulaField";
import {
    DEFAULT_SORTBYARMOR,
    SortByArmor,
} from "@/app/armor/components/customSortBy/sorting";
import { deepCloneAndMap } from "@/app/util/script";
import { render, screen } from "@testing-library/react";

describe("FormulaField", () => {
    const TAB = "    ";

    test("Renders", () => {
        const sortBy: SortByArmor = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
            { physical: true },
        ]);

        render(<FormulaField sortBy={sortBy} />);
        expect(screen.getByRole("textbox").innerHTML).toEqual(
            "(\n" + TAB + "PHYSICAL\n)\n"
        );
    });

    test("Renders with child", () => {
        const sortBy: SortByArmor = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
            { operation: "sum" },
            { magic: true },
            {
                children: [
                    deepCloneAndMap(DEFAULT_SORTBYARMOR, [
                        { operation: "average" },
                        { physical: true },
                        { strike: true },
                        { slash: true },
                        { pierce: true },
                    ]),
                ],
            },
        ]);

        render(<FormulaField sortBy={sortBy} />);
        expect(screen.getByRole("textbox").innerHTML).toEqual(
            "SUM(\n" +
                TAB +
                "AVG(\n" +
                TAB +
                TAB +
                "PHYSICAL\n" +
                TAB +
                TAB +
                "STRIKE\n" +
                TAB +
                TAB +
                "SLASH\n" +
                TAB +
                TAB +
                "PIERCE\n" +
                TAB +
                ")\n" +
                TAB +
                "MAGIC\n)\n"
        );
    });
});
