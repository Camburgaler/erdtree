import ArmorResultRow from "./ArmorResultRow";

function ArmorResultSet(props: {
    id: string;
    armorIds: string[];
    armorNames: string[];
    itemStats: string[][];
    setStats: string[];
    addIgnoredItem: Function[];
    hotkeys: string[];
}): JSX.Element {
    return (
        <>
            <thead>
                <tr>
                    <th>Armor</th>
                    <th>Weight</th>
                    <th>Poise</th>
                    <th>Standard Absorptions</th>
                    <th>Elemental Absorptions</th>
                    <th>Resistances</th>
                </tr>
            </thead>
            <tbody id={props.id}>
                <tr id={props.id + "_total"}>
                    <td>
                        <b>Total</b>
                    </td>
                    <td>{props.setStats[0]}</td>
                    <td>{props.setStats[1]}</td>
                    <td>{props.setStats[2]}</td>
                    <td>{props.setStats[3]}</td>
                    <td>{props.setStats[4]}</td>
                </tr>
                <ArmorResultRow
                    name={props.armorNames[0]}
                    id={props.id + "_" + props.armorIds[0]}
                    armorId={props.armorIds[0]}
                    stats={props.itemStats[0]}
                    addIgnoredItem={props.addIgnoredItem[0]}
                    hotkey={props.hotkeys[0]}
                />
                <ArmorResultRow
                    name={props.armorNames[1]}
                    id={props.id + "_" + props.armorIds[1]}
                    armorId={props.armorIds[1]}
                    stats={props.itemStats[1]}
                    addIgnoredItem={props.addIgnoredItem[1]}
                    hotkey={props.hotkeys[1]}
                />
                <ArmorResultRow
                    name={props.armorNames[2]}
                    id={props.id + "_" + props.armorIds[2]}
                    armorId={props.armorIds[2]}
                    stats={props.itemStats[2]}
                    addIgnoredItem={props.addIgnoredItem[2]}
                    hotkey={props.hotkeys[2]}
                />
                <ArmorResultRow
                    name={props.armorNames[3]}
                    id={props.id + "_" + props.armorIds[3]}
                    armorId={props.armorIds[3]}
                    stats={props.itemStats[3]}
                    addIgnoredItem={props.addIgnoredItem[3]}
                    hotkey={props.hotkeys[3]}
                />
            </tbody>
        </>
    );
}

export default ArmorResultSet;
