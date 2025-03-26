import "core-js/actual/structured-clone";

import ArmorPage from "@/app/armor/page";
import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react";

describe("Armor Page", () => {
    test("Renders", () => {
        localStorage.clear();
        render(<ArmorPage />);

        expect(screen.getByText("Armor Optimizer")).toBeInTheDocument();
    });

    test("load local storage", () => {
        localStorage.clear();

        localStorage.setItem("localMaxEquipLoad", JSON.stringify(100));
        localStorage.setItem("localCurrentEquipLoad", JSON.stringify(10));
        localStorage.setItem("localBreakpoint", JSON.stringify(0.7));
        localStorage.setItem("localCustomSortBy", "( PHYSICAL )");
        localStorage.setItem("localSortBy", JSON.stringify("total-standard"));
        localStorage.setItem(
            "localLockedItems",
            `{"helmet":{"id":"no-helmet","name":"No helmet","defenses":{"physical":0,"strike":0,"slash":0,"pierce":0,"magic":0,"fire":0,"lightning":0,"holy":0},"resistances":{"poison":0,"scarlet-rot":0,"hemorrhage":0,"frostbite":0,"sleep":0,"madness":0,"death-blight":0},"poise":0,"weight":0},"chestpiece":{"id":"no-chestpiece","name":"No chestpiece","defenses":{"physical":0,"strike":0,"slash":0,"pierce":0,"magic":0,"fire":0,"lightning":0,"holy":0},"resistances":{"poison":0,"scarlet-rot":0,"hemorrhage":0,"frostbite":0,"sleep":0,"madness":0,"death-blight":0},"poise":0,"weight":0},"gauntlets":{"id":"no-gauntlets","name":"No gauntlets","defenses":{"physical":0,"strike":0,"slash":0,"pierce":0,"magic":0,"fire":0,"lightning":0,"holy":0},"resistances":{"poison":0,"scarlet-rot":0,"hemorrhage":0,"frostbite":0,"sleep":0,"madness":0,"death-blight":0},"poise":0,"weight":0},"leggings":{"id":"no-leggings","name":"No leggings","defenses":{"physical":0,"strike":0,"slash":0,"pierce":0,"magic":0,"fire":0,"lightning":0,"holy":0},"resistances":{"poison":0,"scarlet-rot":0,"hemorrhage":0,"frostbite":0,"sleep":0,"madness":0,"death-blight":0},"poise":0,"weight":0}}`
        );
        localStorage.setItem(
            "localIgnoredItems",
            `[{"id":"greatjar","name":"Greatjar","defenses":{"physical":8,"slash":7.7,"strike":6.9,"pierce":7.7,"magic":5.3,"fire":5.2,"lightning":5.5,"holy":5.1},"resistances":{"scarlet-rot":32,"poison":32,"hemorrhage":34,"frostbite":34,"sleep":22,"madness":22,"death-blight":21},"poise":14,"weight":12.3},{"id":"bull-goat-armor","name":"Bull-Goat Armor","defenses":{"physical":20.4,"slash":18.3,"strike":20.2,"pierce":18.3,"magic":13.3,"fire":13.5,"lightning":14.9,"holy":12.8},"resistances":{"scarlet-rot":71,"poison":71,"hemorrhage":83,"frostbite":83,"sleep":46,"madness":46,"death-blight":55},"poise":47,"weight":26.5},{"id":"bull-goat-gauntlets","name":"Bull-Goat Gauntlets","defenses":{"physical":5.2,"slash":4.6,"strike":5.2,"pierce":4.6,"magic":3.3,"fire":3.3,"lightning":3.7,"holy":3.2},"resistances":{"scarlet-rot":24,"poison":24,"hemorrhage":28,"frostbite":28,"sleep":15,"madness":15,"death-blight":18},"poise":10,"weight":8.8},{"id":"bull-goat-greaves","name":"Bull-Goat Greaves","defenses":{"physical":11.9,"slash":10.6,"strike":11.8,"pierce":10.6,"magic":7.6,"fire":7.7,"lightning":8.5,"holy":7.3},"resistances":{"scarlet-rot":44,"poison":44,"hemorrhage":51,"frostbite":51,"sleep":29,"madness":29,"death-blight":34},"poise":28,"weight":16.4}]`
        );

        render(<ArmorPage />);

        expect(document.getElementById("max-equip-load")).toHaveValue(100);
        expect(document.getElementById("current-equip-load")).toHaveValue(10);
        expect(document.getElementById("normal-roll")).toBeChecked();
        expect(document.getElementById("total-standard")).toBeChecked();

        expect(document.getElementById("locked-helmet")).toHaveValue(
            "no-helmet"
        );
        expect(document.getElementById("locked-chestpiece")).toHaveValue(
            "no-chestpiece"
        );
        expect(document.getElementById("locked-gauntlets")).toHaveValue(
            "no-gauntlets"
        );
        expect(document.getElementById("locked-leggings")).toHaveValue(
            "no-leggings"
        );

        expect(
            (document.getElementById("ignored-items") as HTMLUListElement)
                .childElementCount
        ).toBe(4);

        let customSortRadio = screen.getByRole("radio", {
            name: "Custom",
        }) as HTMLInputElement;

        act(() => {
            customSortRadio.click();
        });

        let customizeButton = screen.getByRole("button", {
            name: "Customize",
        });

        act(() => {
            customizeButton.click();
        });

        let formulaField = document.getElementById(
            "formula"
        ) as HTMLTextAreaElement;

        expect(formulaField).toHaveValue("(\n    PHYSICAL\n)\n");
    });

    test("updates equip load budget", () => {
        localStorage.clear();
        render(<ArmorPage />);

        let maxLoadInput = document.getElementById(
            "max-equip-load"
        ) as HTMLInputElement;

        act(() => {
            fireEvent.change(maxLoadInput, { target: { value: "" } });
        });

        expect(document.getElementById("equip-load-budget")).toHaveValue(0);

        act(() => {
            fireEvent.change(maxLoadInput, { target: { value: "100" } });
        });

        expect(document.getElementById("equip-load-budget")).toHaveValue(70);

        let currentEquipLoad = document.getElementById(
            "current-equip-load"
        ) as HTMLInputElement;

        act(() => {
            fireEvent.change(currentEquipLoad, { target: { value: "10" } });
        });

        expect(document.getElementById("equip-load-budget")).toHaveValue(60);

        act(() => {
            fireEvent.change(currentEquipLoad, { target: { value: "" } });
        });

        expect(document.getElementById("equip-load-budget")).toHaveValue(70);

        let fastRollRadio = screen.getByRole("radio", {
            name: "Fast Roll (up to 30% equip load)",
        });

        act(() => {
            fastRollRadio.click();
        });

        expect(document.getElementById("equip-load-budget")).toHaveValue(30);

        let normalRollRadio = screen.getByRole("radio", {
            name: "Normal Roll (up to 70% equip load)",
        });

        act(() => {
            normalRollRadio.click();
        });

        expect(document.getElementById("equip-load-budget")).toHaveValue(70);

        let fatRollRadio = screen.getByRole("radio", {
            name: "Fat Roll (up to 100% equip load)",
        });

        act(() => {
            fatRollRadio.click();
        });

        expect(document.getElementById("equip-load-budget")).toHaveValue(100);
    });

    test("gets SortByArmor", () => {
        localStorage.clear();
        render(<ArmorPage />);

        let customSortRadio = screen.getByRole("radio", {
            name: "Custom",
        }) as HTMLInputElement;

        act(() => {
            customSortRadio.click();
        });

        expect(customSortRadio.checked).toBe(true);

        let bossSortRadio = screen.getByRole("radio", {
            name: "Boss",
        }) as HTMLInputElement;

        act(() => {
            bossSortRadio.click();
        });

        expect(bossSortRadio.checked).toBe(true);
    });

    test("opens and closes the customize sort modal", () => {
        localStorage.clear();
        render(<ArmorPage />);

        let customSortButton = screen.getByRole("button", {
            name: "Customize",
        }) as HTMLButtonElement;

        act(() => {
            customSortButton.click();
        });

        expect(
            screen.getByRole("heading", { name: "Custom Sort" })
        ).toBeInTheDocument();

        let closeButton = screen.getByRole("button", {
            name: "Cancel",
        }) as HTMLButtonElement;

        act(() => {
            closeButton.click();
        });

        expect(
            screen.queryByRole("heading", { name: "Custom Sort" })
        ).toBeNull();
    });

    test("updates sorting mode", () => {
        localStorage.clear();
        render(<ArmorPage />);

        let sortingRadios = document.querySelectorAll(
            'input[name="sorting-order"]'
        ) as NodeListOf<HTMLInputElement>;

        for (const radio of sortingRadios) {
            act(() => {
                radio.click();
            });

            expect(radio.checked).toBe(true);
        }
    });

    test("updates boss sorting mode", () => {
        localStorage.clear();
        render(<ArmorPage />);

        let bossSelect = document.getElementById(
            "boss-select"
        ) as HTMLSelectElement;

        act(() => {
            fireEvent.change(bossSelect, {
                target: { value: "promised-consort-radahn" },
            });
        });

        expect(bossSelect.value).toBe("promised-consort-radahn");
    });

    test("updates locked armor", () => {
        localStorage.clear();
        render(<ArmorPage />);

        let lockedHelmet = document.getElementById(
            "locked-helmet"
        ) as HTMLSelectElement;
        let lockedChestpiece = document.getElementById(
            "locked-chestpiece"
        ) as HTMLSelectElement;
        let lockedGauntlets = document.getElementById(
            "locked-gauntlets"
        ) as HTMLSelectElement;
        let lockedLeggings = document.getElementById(
            "locked-leggings"
        ) as HTMLSelectElement;

        act(() => {
            fireEvent.change(lockedHelmet, { target: { value: "no-helmet" } });
        });

        expect(lockedHelmet.value).toBe("no-helmet");

        act(() => {
            fireEvent.change(lockedChestpiece, {
                target: { value: "no-chestpiece" },
            });
        });

        expect(lockedChestpiece.value).toBe("no-chestpiece");

        act(() => {
            fireEvent.change(lockedGauntlets, {
                target: { value: "no-gauntlets" },
            });
        });

        expect(lockedGauntlets.value).toBe("no-gauntlets");

        act(() => {
            fireEvent.change(lockedLeggings, {
                target: { value: "no-leggings" },
            });
        });

        expect(lockedLeggings.value).toBe("no-leggings");

        let resetAllButton = screen.getByRole("button", {
            name: "Reset All",
        }) as HTMLButtonElement;

        act(() => {
            resetAllButton.click();
        });

        expect(lockedHelmet.value).toBe("none");
        expect(lockedChestpiece.value).toBe("none");
        expect(lockedGauntlets.value).toBe("none");
        expect(lockedLeggings.value).toBe("none");
    });

    test("ignores/restores all armor", () => {
        localStorage.clear();
        render(<ArmorPage />);

        let ignoreAllButton = screen.getByRole("button", {
            name: "Ignore All",
        });

        act(() => {
            ignoreAllButton.click();
        });

        let ignoredItems = document.getElementById(
            "ignored-items"
        ) as HTMLUListElement;

        expect(ignoredItems.children.length).toBe(706);

        let restoreAllButton = screen.getByRole("button", {
            name: "Restore All",
        });

        act(() => {
            restoreAllButton.click();
        });

        expect(ignoredItems.children.length).toBe(0);
    });

    test("ignores/restores single armor", () => {
        localStorage.clear();
        render(<ArmorPage />);

        let ignoreButton = document.getElementsByName(
            "ignore-button"
        )[0] as HTMLButtonElement;

        act(() => {
            ignoreButton.click();
        });

        let ignoredItems = document.getElementById(
            "ignored-items"
        ) as HTMLUListElement;

        expect(ignoredItems.children.length).toBe(1);

        let restoreButton = screen.getByRole("button", {
            name: "🗑",
        });

        act(() => {
            restoreButton.click();
        });

        expect(ignoredItems.children.length).toBe(0);

        ignoreButton = document.getElementsByName(
            "ignore-button"
        )[1] as HTMLButtonElement;

        act(() => {
            ignoreButton.click();
        });

        expect(ignoredItems.children.length).toBe(1);

        restoreButton = screen.getByRole("button", {
            name: "🗑",
        });

        act(() => {
            restoreButton.click();
        });

        expect(ignoredItems.children.length).toBe(0);

        ignoreButton = document.getElementsByName(
            "ignore-button"
        )[2] as HTMLButtonElement;

        act(() => {
            ignoreButton.click();
        });

        expect(ignoredItems.children.length).toBe(1);

        restoreButton = screen.getByRole("button", {
            name: "🗑",
        });

        act(() => {
            restoreButton.click();
        });

        expect(ignoredItems.children.length).toBe(0);

        ignoreButton = document.getElementsByName(
            "ignore-button"
        )[3] as HTMLButtonElement;

        act(() => {
            ignoreButton.click();
        });

        expect(ignoredItems.children.length).toBe(1);

        restoreButton = screen.getByRole("button", {
            name: "🗑",
        });

        act(() => {
            restoreButton.click();
        });

        expect(ignoredItems.children.length).toBe(0);
    });

    test("ignores single armor using keyboard", () => {
        localStorage.clear();
        render(<ArmorPage />);

        act(() => {
            document.dispatchEvent(
                new KeyboardEvent("keydown", { key: "Control" })
            );
        });
        act(() => {
            document.dispatchEvent(new KeyboardEvent("keydown", { key: "i" }));
        });
        act(() => {
            document.dispatchEvent(new KeyboardEvent("keydown", { key: "`" }));
        });

        let ignoredItems = document.getElementById(
            "ignored-items"
        ) as HTMLUListElement;

        expect(ignoredItems.children.length).toBe(1);

        act(() => {
            document.dispatchEvent(new KeyboardEvent("keyup", { key: "`" }));
        });
        act(() => {
            document.dispatchEvent(new KeyboardEvent("keydown", { key: "1" }));
        });

        expect(ignoredItems.children.length).toBe(2);

        act(() => {
            document.dispatchEvent(new KeyboardEvent("keyup", { key: "1" }));
        });
        act(() => {
            document.dispatchEvent(new KeyboardEvent("keydown", { key: "2" }));
        });

        expect(ignoredItems.children.length).toBe(3);

        act(() => {
            document.dispatchEvent(new KeyboardEvent("keyup", { key: "2" }));
        });
        act(() => {
            document.dispatchEvent(new KeyboardEvent("keydown", { key: "3" }));
        });

        expect(ignoredItems.children.length).toBe(4);

        act(() => {
            document.dispatchEvent(new KeyboardEvent("keyup", { key: "3" }));
        });
        act(() => {
            document.dispatchEvent(new KeyboardEvent("keydown", { key: "4" }));
        });

        expect(ignoredItems.children.length).toBe(5);

        act(() => {
            document.dispatchEvent(new KeyboardEvent("keyup", { key: "4" }));
        });
        act(() => {
            document.dispatchEvent(new KeyboardEvent("keydown", { key: "5" }));
        });

        expect(ignoredItems.children.length).toBe(6);

        act(() => {
            document.dispatchEvent(new KeyboardEvent("keyup", { key: "5" }));
        });
        act(() => {
            document.dispatchEvent(new KeyboardEvent("keydown", { key: "6" }));
        });

        expect(ignoredItems.children.length).toBe(7);

        act(() => {
            document.dispatchEvent(new KeyboardEvent("keyup", { key: "6" }));
        });
        act(() => {
            document.dispatchEvent(new KeyboardEvent("keydown", { key: "7" }));
        });

        expect(ignoredItems.children.length).toBe(8);

        act(() => {
            document.dispatchEvent(new KeyboardEvent("keyup", { key: "7" }));
        });
        act(() => {
            document.dispatchEvent(new KeyboardEvent("keydown", { key: "8" }));
        });

        expect(ignoredItems.children.length).toBe(9);

        act(() => {
            document.dispatchEvent(new KeyboardEvent("keyup", { key: "8" }));
        });
        act(() => {
            document.dispatchEvent(new KeyboardEvent("keydown", { key: "9" }));
        });

        expect(ignoredItems.children.length).toBe(10);

        act(() => {
            document.dispatchEvent(new KeyboardEvent("keyup", { key: "9" }));
        });
        act(() => {
            document.dispatchEvent(new KeyboardEvent("keydown", { key: "0" }));
        });

        expect(ignoredItems.children.length).toBe(11);

        act(() => {
            document.dispatchEvent(new KeyboardEvent("keyup", { key: "0" }));
        });
        act(() => {
            document.dispatchEvent(new KeyboardEvent("keydown", { key: "-" }));
        });

        expect(ignoredItems.children.length).toBe(12);

        act(() => {
            document.dispatchEvent(new KeyboardEvent("keyup", { key: "-" }));
        });
        act(() => {
            document.dispatchEvent(new KeyboardEvent("keydown", { key: "=" }));
        });

        expect(ignoredItems.children.length).toBe(12);
    });
});
