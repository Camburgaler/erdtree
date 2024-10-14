import Armor from "./armor";

type Set = Armor[] & {
    fitness?: number;
    weight?: number;
};

export default Set;
