import AttackPowerTypeMap from "./attackPowerTypeMap";
import StatMap from "./statMap";

type SlopeIntercept = {
    slope: number;
    intercept: number;
};

export type InfusionData = {
    id: string;
    name: string;
    damageUpgradeRate: AttackPowerTypeMap<SlopeIntercept>;
    statScalingRate: StatMap<number[]>;
};

type Infusion = {
    [key: string]: InfusionData;
};

export default Infusion;
