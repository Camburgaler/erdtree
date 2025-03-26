import Armor from "@/app/util/types/armor";
import { ChangeEventHandler } from "react";

function InputSelect(props: {
    id: string;
    label: string;
    name: string;
    onChange: ChangeEventHandler<HTMLSelectElement>;
    options: Armor[];
    value?: string;
}): JSX.Element {
    return (
        <div>
            <label htmlFor={props.id}>{props.label}</label>
            <select
                itemType="text"
                id={props.id}
                name={props.name}
                onChange={props.onChange}
                value={props.value === undefined ? "none" : props.value}
            >
                <option value="none">None</option>
                {props.options.map((item: Armor) => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default InputSelect;
