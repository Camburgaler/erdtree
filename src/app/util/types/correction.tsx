export type CalcCorrectGraph = {
    softcap: number;
    growth: number;
    adjustment: number;
};

type Correction = {
    [key: string]: CalcCorrectGraph[];
};

export default Correction;
