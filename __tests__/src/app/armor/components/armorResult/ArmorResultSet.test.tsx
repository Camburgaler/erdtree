import "core-js/actual/structured-clone";

import ArmorResultSet from "@/app/armor/components/armorResult/ArmorResultSet";
import { render, screen } from "@testing-library/react";

describe("ArmorResultSet", () => {
    test("Renders", () => {
        render(
            <table>
                <ArmorResultSet
                    id="test"
                    armorIds={["1", "2", "3", "4"]}
                    armorNames={["1", "2", "3", "4"]}
                    itemStats={[
                        ["1", "2", "3", "4", "5"],
                        ["6", "7", "8", "9", "10"],
                        ["11", "12", "13", "14", "15"],
                        ["16", "17", "18", "19", "20"],
                    ]}
                    setStats={["21", "22", "23", "24", "25"]}
                    addIgnoredItem={[
                        () => null,
                        () => null,
                        () => null,
                        () => null,
                    ]}
                    hotkeys={["1", "2", "3", "4"]}
                />
            </table>
        );

        expect(screen.getByText("Total")).toBeInTheDocument();
    });
});
