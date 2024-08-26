import { World } from '../types/stored-data-types';
import {
    GenericType,
    StringRecord,
    TypeMap,
} from '../types/typechecking-types';

/**
 * Returns true if the object is a generic record object
 * @param obj
 * @returns
 */
function isRecord(obj: any): obj is StringRecord {
    // Check if obj is an object and not null
    if (obj !== null && typeof obj === 'object') {
        // Check if the object has valid string keys
        return Object.keys(obj).every((key) => typeof key === 'string');
    }

    // Succeed if all checks pass
    return false;
}

/**
 * Returns true if the object has the requested parameter
 * and if the parameter is of the desired type(s)
 * @param obj Test Object
 * @param prop Test property name
 * @param checkType expected result(s) of 'typeof' on the given parameter in 'obj'
 * @returns
 */
function propIs(
    obj: StringRecord,
    prop: string,
    checkType: GenericType | GenericType[]
): boolean {
    // Check if there are multiple legal types
    if (Array.isArray(checkType)) {
        // Return true if it is one of the legal types
        return obj.hasOwnProperty(prop) && checkType.includes(typeof obj[prop]);
    }

    // Return true if it is the legal type
    return obj.hasOwnProperty(prop) && typeof obj[prop] === checkType;
}

/**
 * Determines if the object has all the right keys with the right value types.
 * Only does a shallow check of the top-level keys
 */
function compareTypeMap(obj: StringRecord, map: TypeMap): boolean {
    // Get key arrays
    const keys = Object.keys(obj);
    const mapKeys = Object.keys(map);

    // Fail if the key count does not match
    if (keys.length !== mapKeys.length) {
        return false;
    }

    // Compare all key types to all values
    for (const key of keys) {
        if (!propIs(obj, key, map[key])) {
            return false;
        }
    }

    // Succeed if all checks pass
    return true;
}

/**
 * Compares the input array to the requested types
 * @param arr Test Array
 * @param checkType Type or array of types the array must match
 * @returns True if the array matches the given types. False otherwise
 */
function checkTypeArray(
    arr: Array<any>,
    checkType: GenericType | Array<GenericType>
): boolean {
    let func: (v: any, idx: number) => Boolean;

    // Make filter based if checkType is an array
    if (Array.isArray(checkType)) {
        // Fail if the type array does not match the array length
        if (checkType.length !== arr.length) {
            return false;
        }
        func = (value, idx) => typeof value === checkType[idx];
    } else {
        func = (value, idx) => typeof value === checkType;
    }

    // Force all types to match
    return arr.filter(func).length === arr.length;
}

function checkRecordPropertyTypes(
    obj: StringRecord,
    types: GenericType | Array<GenericType>
): boolean {
    /** Keys of the input record */
    const keys = Object.keys(obj);

    /** Comparison function to check if the key is valid */
    let func: (prop: string) => boolean;

    // Get correct comparison function
    if (Array.isArray(types)) {
        func = (prop: string) => types.includes(typeof obj[prop]);
    } else {
        func = (prop: string) => typeof obj[prop] === types;
    }

    // Compare all record properties
    for (const key of keys) {
        // Fail if the property is not correct
        if (!func(key)) {
            return false;
        }
    }

    // Pass if all properties satisfy the type check
    return true;
}

/**
 *
 *
 * Checks for collection Types
 *
 *
 */

/** Determines of the input object matches the world type */
function isWorld(obj: any): obj is World {
    // Fail if it is not a standard {key: value} object
    if (!isRecord(obj)) {
        return false;
    }

    /** Reference map of what the world type should be */
    const worldMap: TypeMap = {
        _id: 'string',
        name: 'string',
    };

    // Compare the actual to the reference map
    if (!compareTypeMap(obj, worldMap)) {
        return false;
    }

    return true;
}

export {
    TypeMap,
    isRecord,
    propIs,
    checkRecordPropertyTypes,
    checkTypeArray,
    compareTypeMap,
    isWorld,
};
