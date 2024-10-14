import AttackPowerTypeMap from "../interfaces/attackPowerTypeMap";
import StatMap from "../interfaces/statMap";

type SlopeIntercept = {
    slope: number;
    intercept: number;
};

type Infusion = {
    [key: string]: {
        id: string;
        name: string;
        damageUpgradeRate: AttackPowerTypeMap<SlopeIntercept>;
        statScalingRate: StatMap<number[]>;
    };
};

export default Infusion;
