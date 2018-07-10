import {IProtect, StoredData} from '../types';

export const global_data: StoredData = {};

export function all(protect: IProtect): StoredData {
    return global_data[protect.id];
}

/**
 * Retrieves the key-value pair
 * @param protect
 * @param key
 * @returns the value of the key in the store
 */
export function fetch(protect: IProtect, key: string): any {
    return global_data[protect.id][key];
}

/**
 * Stores the key-value pair, over-writes the key if it already exists
 * @param protect
 * @param key is the store property (must be a string)
 * @param value is the value of this store property
 * @returns the key
 */
export function put(protect: IProtect, key: string, value: any): StoredData {
    global_data[protect.id][key] = value;
    return {[key]: value};
}

export function putMany (protect: IProtect, items: StoredData): StoredData {
    const keys = Object.keys(items);
    keys.map(key => {
        global_data[protect.id][key] = items[key];
    });
    return items;
}

/**
 * Creates the key-value pair, will not over-write the key if it already exists
 * @param protect
 * @param key is the store property (must be a string)
 * @param value is the value of this store property
 * @returns the key or null
 */
export function create (protect: IProtect, key: string, value: any): StoredData | null {
    if (global_data[protect.id][key] === undefined) {
        global_data[protect.id][key] = value;
        return {[key]: global_data[protect.id][key]};
    }
    return null;
}

export function createMany (protect: IProtect, items: StoredData): StoredData {
    const keys = Object.keys(items);
    return keys.reduce(function (res, key) {
        if (global_data[protect.id][key] === undefined || global_data[protect.id][key] === null) {
            global_data[protect.id][key] = items[key];
            return Object.assign(res, {[key]: global_data[protect.id][key]});
        }
        return Object.assign(res, {[key]: null});
    }, {});
}

/**
 * Removes the property from the store
 * @param protect
 * @param key is the store property (must be a string)
 */
export function erase (protect: IProtect, key: string): void {
    delete global_data[protect.id][key];
}

export function eraseMany (protect: IProtect, ...keys: string[]): void {
    keys.map(key => {
        delete global_data[protect.id][key];
    })
}

/**
 * Copy the value from one property to another
 * @param protect
 * @param source is the property of the value that you want to copy (must be a string)
 * @param destination is the destination to which the value will be copied (must be a string)
 * @returns the destination
 */
export function copy (protect: IProtect, source: string, destination: string): StoredData {
    global_data[protect.id][destination] = global_data[protect.id][source];
    return {[destination]: global_data[protect.id][destination]};
}

/**
 * Move the value from one property to another
 * @param protect
 * @param source is the property of the value that you want to move (must be a string)
 * @param destination is the destination to which the value will be moved (must be a string)
 * @returns the destination
 */
export function rename (protect: IProtect, source: string, destination: string): StoredData {
    if (source !== destination) {
        global_data[protect.id][destination] = global_data[protect.id][source];
        delete global_data[protect.id][source];
    }
    return {[destination]: global_data[protect.id][destination]};
}

export function reset (protect: IProtect): void {
    const keys = Object.keys(global_data[protect.id]);
    keys.map(key => {
        delete global_data[protect.id][key]
    })
}

/**
 * Get the Manager instance identifier
 * @param {IProtect} protect
 * @returns {string | number}
 */
export function getId (protect: IProtect): string | number {
    return protect.id
}
