/** Result of using 'typeof' */
type GenericType =
    | 'string'
    | 'number'
    | 'bigint'
    | 'boolean'
    | 'symbol'
    | 'undefined'
    | 'object'
    | 'function';

/** Maps valid checks for a top-level type check map */
type TypeMap = {
    [key: string]: GenericType;
};

/** Alias for the Record<string, any> type */
type StringRecord = Record<string, any>;

export { GenericType, TypeMap, StringRecord };
