import Equippable from "./equippable";
import StatMap from "./statMap";

interface Multipliers {
    maxHp: number;
    maxFp: number;
    maxStamina: number;
    equipLoad: number;
}

type Talisman = Equippable & {
    weight: string;
    stats: StatMap<number>;
    multipliers: Multipliers;
};

export default Talisman;
