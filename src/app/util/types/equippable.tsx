import StatMap from "./statMap";

type Equippable = {
    id: string;
    name: string;
    stats?: StatMap<number>;
    total?: number;
};

export default Equippable;
