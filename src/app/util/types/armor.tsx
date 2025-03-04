import DefensesMap from "./defensesMap";
import Equippable from "./equippable";
import ResistancesMap from "./resistancesMap";

type Armor = Equippable & {
    defenses: DefensesMap<number>;
    resistances: ResistancesMap<number>;
    poise: number;
    weight: number;
    fitness?: number;
};

export default Armor;
