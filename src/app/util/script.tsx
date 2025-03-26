export const deepFreeze = <T,>(obj: T): T => {
    if (obj && typeof obj === "object") {
        Object.keys(obj).forEach((key) => {
            const prop = obj[key as keyof T];
            if (prop && typeof prop === "object") {
                deepFreeze(prop);
            }
        });
        return Object.freeze(obj);
    }
    throw new Error("Invalid object: The input is not an object or is null");
};

export function deepCloneAndMap<T extends object>(
    original: T,
    values: Partial<T>[]
): T {
    // Deep clone using structuredClone
    let cloned: T = structuredClone(original);

    // Generate a runtime type reference for validation
    const getType = (value: any): string =>
        Array.isArray(value) ? "array" : typeof value;

    const expectedTypes: Record<string, string> = Object.fromEntries(
        Object.entries(original).map(([key, value]) => [key, getType(value)])
    );

    // Apply the mapping with key & type validation
    for (const val of values) {
        for (const [key, newValue] of Object.entries(val)) {
            if (!(key in original)) {
                continue; // Skip invalid keys
            }

            const expectedType = expectedTypes[key];
            const newValueType = getType(newValue);

            if (newValueType !== expectedType) {
                continue; // Skip invalid types
            }

            (cloned as any)[key] = newValue; // Apply the valid value
        }
    }

    return cloned;
}
