import { useState } from "react";
import FormulaField from "./FormulaField";
import { SortByArmor, unmarshallSortBy } from "./sorting";

export function CustomizeSortBy(props: {
    closePopUp: () => void;
    setCustomSortBy: (newSortBy: SortByArmor) => void;
    sortBy: SortByArmor;
}) {
    const [descriptionIsExpanded, setDescriptionIsExpanded] =
        useState<boolean>(true);

    const submitFormula = () => {
        let submittedSortBy: SortByArmor;
        try {
            const formula = (
                document.getElementById("formula") as HTMLTextAreaElement
            ).value;
            submittedSortBy = unmarshallSortBy(formula);
        } catch (error) {
            console.error("error: ", error);
            return;
        }
        submittedSortBy.label = "Custom";
        props.setCustomSortBy(submittedSortBy);
        props.closePopUp();
    };

    const cancelFormula = () => {
        props.closePopUp();
    };

    return (
        <div
            style={{
                position: "fixed",
                flex: "1 1 100%",
                inset: 100,
                padding: "10px",
                backgroundColor: "var(--primary)",
                border: "1px solid #ccc",
                borderRadius: "5px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                zIndex: 1000,
                overflow: "auto",
            }}
        >
            <div>
                <h2>Custom Sort</h2>
                <div>
                    <FormulaField sortBy={props.sortBy} />
                </div>
                <div>
                    <button onClick={submitFormula}>Submit</button>
                    <button onClick={cancelFormula}>Cancel</button>
                </div>
                <div>
                    <button
                        id="descriptionToggle"
                        onClick={() =>
                            setDescriptionIsExpanded(!descriptionIsExpanded)
                        }
                    >
                        {descriptionIsExpanded
                            ? "Hide Description"
                            : "Show Description"}
                    </button>
                    <div
                        style={{
                            visibility: descriptionIsExpanded
                                ? "visible"
                                : "hidden",
                        }}
                        id="description"
                    >
                        <h2>Instructions</h2>
                        <p>
                            In the text box below, you can create a formula for
                            your own custom sorting method! Here are the
                            commands available.
                        </p>
                        <ul>
                            <li>
                                ( X )
                                <ul>
                                    <li>
                                        The parentheses will group things into
                                        one value. This is useful for separating
                                        values when trying to ensure an order of
                                        operations.
                                    </li>
                                </ul>
                            </li>
                            <li>
                                AVG( X X ... )
                                <ul>
                                    <li>
                                        This will average all space-separated
                                        values inside the parentheses. Note that
                                        more than one value is required.
                                    </li>
                                </ul>
                            </li>
                            <li>
                                SUM( X X ... )
                                <ul>
                                    <li>
                                        This will sum all space-separated values
                                        inside the parentheses. Note that more
                                        than one value is required.
                                    </li>
                                </ul>
                            </li>
                            <li>
                                MULT( X X ... )
                                <ul>
                                    <li>
                                        This will multiply all space-separated
                                        values inside the parentheses. Note that
                                        more than one value is required.
                                    </li>
                                </ul>
                            </li>
                            <li>
                                PHYSICAL
                                <ul>
                                    <li>
                                        This will use the value of an armor
                                        piece&#39;s Physical Absorption.
                                    </li>
                                </ul>
                            </li>
                            <li>
                                STRIKE
                                <ul>
                                    <li>
                                        This will use the value of an armor
                                        piece&#39;s Strike Absorption.
                                    </li>
                                </ul>
                            </li>
                            <li>
                                SLASH
                                <ul>
                                    <li>
                                        This will use the value of an armor
                                        piece&#39;s Slash Absorption.
                                    </li>
                                </ul>
                            </li>
                            <li>
                                PIERCE
                                <ul>
                                    <li>
                                        This will use the value of an armor
                                        piece&#39;s Pierce Absorption.
                                    </li>
                                </ul>
                            </li>
                            <li>
                                MAGIC
                                <ul>
                                    <li>
                                        This will use the value of an armor
                                        piece&#39;s Magic Absorption.
                                    </li>
                                </ul>
                            </li>
                            <li>
                                FIRE
                                <ul>
                                    <li>
                                        This will use the value of an armor
                                        piece&#39;s Fire Absorption.
                                    </li>
                                </ul>
                            </li>
                            <li>
                                LIGHTNING
                                <ul>
                                    <li>
                                        This will use the value of an armor
                                        piece&#39;s Lightning Absorption.
                                    </li>
                                </ul>
                            </li>
                            <li>
                                HOLY
                                <ul>
                                    <li>
                                        This will use the value of an armor
                                        piece&#39;s Holy Absorption.
                                    </li>
                                </ul>
                            </li>
                            <li>
                                POISON
                                <ul>
                                    <li>
                                        This will use the value of the armor
                                        piece&#39;s Poison Resistance.
                                    </li>
                                </ul>
                            </li>
                            <li>
                                SCARLETROT
                                <ul>
                                    <li>
                                        This will use the value of the armor
                                        piece&#39;s Scarlet Rot Resistance.
                                    </li>
                                </ul>
                            </li>
                            <li>
                                HEMORRHAGE
                                <ul>
                                    <li>
                                        This will use the value of the armor
                                        piece&#39;s Hemorrhage Resistance.
                                    </li>
                                </ul>
                            </li>
                            <li>
                                FROSTBITE
                                <ul>
                                    <li>
                                        This will use the value of the armor
                                        piece&#39;s Frostbite Resistance.
                                    </li>
                                </ul>
                            </li>
                            <li>
                                SLEEP
                                <ul>
                                    <li>
                                        This will use the value of the armor
                                        piece&#39;s Sleep Resistance.
                                    </li>
                                </ul>
                            </li>
                            <li>
                                MADNESS
                                <ul>
                                    <li>
                                        This will use the value of the armor
                                        piece&#39;s Madness Resistance.
                                    </li>
                                </ul>
                            </li>
                            <li>
                                DEATHBLIGHT
                                <ul>
                                    <li>
                                        This will use the value of the armor
                                        piece&#39;s Death Blight Resistance.
                                    </li>
                                </ul>
                            </li>
                            <li>
                                POISE
                                <ul>
                                    <li>
                                        This will use the value of the armor
                                        piece&#39;s Poise.
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
