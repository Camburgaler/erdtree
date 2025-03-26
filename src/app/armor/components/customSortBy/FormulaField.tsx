import {
    getChildTokenGroups,
    marshallSortByToTokenGroups,
    SortByArmor,
} from "./sorting";

export default function FormulaField(props: {
    sortBy: SortByArmor;
}): JSX.Element {
    const marshalledFormula: string[][] = marshallSortByToTokenGroups(
        props.sortBy
    );
    const TAB = "    ";

    let tabs: number = 0;
    function mapTokenGroupToLines(tokenGroup: string[]): string {
        // if length is 1, process the token
        if (tokenGroup.length === 1) {
            const token = tokenGroup[0];
            if (token.includes("(")) {
                const value = TAB.repeat(tabs) + token + "\n";
                tabs += 1;
                return value;
            } else if (token === ")") {
                tabs -= 1;
                return TAB.repeat(tabs) + token + "\n";
            } else {
                return TAB.repeat(tabs) + token + "\n";
            }
        }
        // else if length is greater than 1, process the token group recursively
        else {
            return getChildTokenGroups(tokenGroup)
                .map(mapTokenGroupToLines)
                .join("");
        }
    }

    return (
        <textarea
            id="formula"
            defaultValue={marshalledFormula
                .map((tokenGroup) => {
                    return mapTokenGroupToLines(tokenGroup);
                })
                .join("")}
            style={{
                width: "100%",
                backgroundColor: "var(--secondary)",
                color: "var(--contrast)",
            }}
            rows={20}
        />
    );
}
