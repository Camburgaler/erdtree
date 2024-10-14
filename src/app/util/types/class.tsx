import StatMap from "../interfaces/statMap";

type Class = {
    id: string;
    name: string;
    level: number;
    stats: StatMap<number>;
    total?: number;
};

export default Class;
