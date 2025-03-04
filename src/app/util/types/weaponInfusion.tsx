import AttackPowerTypeMap from "./attackPowerTypeMap";
import StatMap from "./statMap";

type WeaponInfusion = {
    id: string;
    damage: AttackPowerTypeMap<number>;
    scaling: StatMap<number>;
    aux: { [key: string]: [number, number] };
    masks: AttackPowerTypeMap<StatMap<boolean>>;
    corrections: AttackPowerTypeMap<string>;
    buffable: boolean;
};

export default WeaponInfusion;
