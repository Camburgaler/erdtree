import StatMap from "./statMap";

type Class = {
    id: string;
    name: string;
    level: number;
    stats: StatMap<number>;
    total?: number;
};

export default Class;
