import AttackPowerTypeMap from "../interfaces/attackPowerTypeMap";
import StatMap from "../interfaces/statMap";

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
