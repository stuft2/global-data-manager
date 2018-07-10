import {IProtect, StoredData} from '../types';
import {all, copy, create, createMany, erase, eraseMany, fetch, getId, put, putMany, rename, reset} from './access';

export function bindAll (protect: IProtect) {
    return function (): StoredData {
        return all(protect);
    }
}

export function bindFetch (protect: IProtect) {
    return function (key: string): any {
        return fetch(protect, key);
    }
}

export function bindPut (protect: IProtect) {
    return function (key: string, value: any): StoredData {
        return put(protect, key, value);
    }
}

export function bindPutMany (protect: IProtect) {
    return function (items: StoredData): StoredData {
        return putMany(protect, items);
    }
}

export function bindCreate (protect: IProtect) {
    return function (key: string, value: any): StoredData | null {
        return create(protect, key, value);
    }
}

export function bindCreateMany (protect: IProtect) {
    return function (items: StoredData): StoredData {
        return createMany(protect, items)
    }
}

export function bindErase (protect: IProtect) {
    return function (key: string): void {
        return erase(protect, key);
    }
}

export function bindEraseMany (protect: IProtect) {
    return function (...keys: string[]): void {
        return eraseMany(protect, ...keys);
    }
}

export function bindCopy (protect: IProtect) {
    return function (source: string, destination: string): StoredData {
        return copy(protect, source, destination);
    }
}

export function bindRename (protect: IProtect) {
    return function (source: string, destination: string): StoredData {
        return rename(protect, source, destination);
    }
}

export function bindReset (protect: IProtect) {
    return function (): void {
        return reset(protect);
    }
}

export function bindGetId (protect: IProtect) {
    return function (): string | number {
        return getId(protect);
    }
}
