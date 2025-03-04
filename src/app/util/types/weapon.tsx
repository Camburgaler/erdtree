import { CategoryMapKey } from "./categoryMap";
import Equippable from "./equippable";
import InfusionMap from "./infusionMap";
import StatMap from "./statMap";
import WeaponInfusion from "./weaponInfusion";

type Weapon = Equippable & {
    requirements: StatMap<number>;
    category: CategoryMapKey;
    paired: boolean;
    "glintstone-staff": boolean;
    "sacred-seal": boolean;
    infusions: InfusionMap<WeaponInfusion>;
};

export default Weapon;
