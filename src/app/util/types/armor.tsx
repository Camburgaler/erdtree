import Defenses from "./defenses";
import Equippable from "./equippable";
import Resistances from "./resistances";

type Armor = Equippable & {
    defenses: Defenses;
    resistances: Resistances;
    poise: number;
    weight: number;
    fitness?: number;
};

export default Armor;
