function ArmorResultRow(props: {
    name: string;
    id: string;
    armorId?: string;
    stats: string[];
    addIgnoredItem: Function;
    hotkey?: string;
}): JSX.Element {
    return (
        <tr id={props.id}>
            <td>
                <a
                    href={
                        "https://eldenring.wiki.fextralife.com/" +
                        props.name.replaceAll(" ", "+")
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {props.name}
                </a>
                <button
                    name="ignore-button"
                    onClick={() => props.addIgnoredItem(props.armorId)}
                    // add hint on hover
                    title={"Ignore this armor (CTRL+i+" + props.hotkey + ")"}
                    style={{
                        marginLeft: "5px",
                        backgroundColor: "transparent",
                        border: "none",
                    }}
                >
                    {" "}
                    ❌
                </button>
            </td>
            <td>{props.stats[0]}</td>
            <td>{props.stats[1]}</td>
            <td>{props.stats[2]}</td>
            <td>{props.stats[3]}</td>
            <td>{props.stats[4]}</td>
        </tr>
    );
}

export default ArmorResultRow;
