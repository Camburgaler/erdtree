import "core-js/actual/structured-clone";

import { CustomizeSortBy } from "@/app/armor/components/customSortBy/CustomizeSortBy";
import {
    DEFAULT_SORTBYARMOR,
    SortByArmor,
} from "@/app/armor/components/customSortBy/sorting";
import { deepCloneAndMap } from "@/app/util/script";
import { act, render, screen } from "@testing-library/react";

let calledFunctions: string[] = [];

function testClosePopUp(): void {
    calledFunctions.push("closePopUp");
}

function testSetCustomSortBy(newSortBy: SortByArmor): void {
    calledFunctions.push("setCustomSortBy");
}

describe("CustomizeSortBy", () => {
    test("Renders", () => {
        const sortBy: SortByArmor = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
            { physical: true },
        ]);

        render(
            <CustomizeSortBy
                closePopUp={() => {}}
                setCustomSortBy={() => {}}
                sortBy={sortBy}
            />
        );

        const headings = screen.getAllByRole("heading");

        expect(headings[0].innerHTML).toEqual("Custom Sort");
        expect(headings[1].innerHTML).toEqual("Instructions");
    });

    test("submits formula", () => {
        calledFunctions = [];
        const sortBy: SortByArmor = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
            { physical: true },
        ]);

        render(
            <CustomizeSortBy
                closePopUp={testClosePopUp}
                setCustomSortBy={testSetCustomSortBy}
                sortBy={sortBy}
            />
        );

        const submitButton = screen.getByRole("button", { name: "Submit" });
        submitButton.click();

        expect(calledFunctions).toEqual(["setCustomSortBy", "closePopUp"]);
    });

    test("submit logs error", () => {
        calledFunctions = [];
        const sortBy: SortByArmor = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
            { physical: true },
        ]);

        render(
            <CustomizeSortBy
                closePopUp={testClosePopUp}
                setCustomSortBy={testSetCustomSortBy}
                sortBy={sortBy}
            />
        );

        (document.getElementById("formula") as HTMLTextAreaElement).value =
            "invalid";

        const submitButton = screen.getByRole("button", { name: "Submit" });
        submitButton.click();

        expect(calledFunctions).toEqual([]);
    });

    test("cancels", () => {
        calledFunctions = [];
        const sortBy: SortByArmor = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
            { physical: true },
        ]);

        render(
            <CustomizeSortBy
                closePopUp={testClosePopUp}
                setCustomSortBy={testSetCustomSortBy}
                sortBy={sortBy}
            />
        );

        const cancelButton = screen.getByRole("button", { name: "Cancel" });
        cancelButton.click();

        expect(calledFunctions).toEqual(["closePopUp"]);
    });

    test("toggles description", () => {
        const sortBy: SortByArmor = deepCloneAndMap(DEFAULT_SORTBYARMOR, [
            { physical: true },
        ]);

        render(
            <CustomizeSortBy
                closePopUp={() => {}}
                setCustomSortBy={() => {}}
                sortBy={sortBy}
            />
        );

        let description = document.getElementById("description");
        expect(description).toBeVisible();

        const descriptionButton = screen.getByRole("button", {
            name: "Hide Description",
        });
        act(() => descriptionButton.click());
        description = document.getElementById("description");
        expect(description).not.toBeVisible();

        act(() => descriptionButton.click());
        description = document.getElementById("description");
        expect(description).toBeVisible();
    });
});
