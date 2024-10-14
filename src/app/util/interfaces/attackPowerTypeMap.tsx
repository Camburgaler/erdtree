/**
 * Maps attack power types (e.g. physical, magic, fire, etc.) to their respective values
 */
export default interface AttackPowerTypeMap<T> {
    [key: string]: T | undefined;

    /**
     * Physical attack power; required
     */
    physical: T;

    /**
     * Magic attack power; required
     */
    magic: T;

    /**
     * Fire attack power; required
     */
    fire: T;

    /**
     * Lightning attack power; required
     */
    lightning: T;

    /**
     * Holy attack power; required
     */
    holy: T;

    /**
     * Blood loss status effect; optional
     */
    bleed?: T;

    /**
     * Poison status effect; optional
     */
    poison?: T;

    /**
     * Frost status effect; optional
     */
    frost?: T;

    /**
     * Scarlet rot status effect; optional
     */
    "scarlet-rot"?: T;

    /**
     * Madness status effect; optional
     */
    madness?: T;

    /**
     * Frost status effect; optional
     */
    sleep?: T;
}
