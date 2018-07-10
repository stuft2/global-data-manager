import {IManager} from './types';
import {
    bindAll,
    bindCopy,
    bindCreate,
    bindCreateMany,
    bindErase,
    bindEraseMany,
    bindFetch, bindGetId,
    bindPut,
    bindPutMany,
    bindRename, bindReset
} from './lib/util';
import {global_data} from './lib/access';
let count = 0;

export function Manager (identifier?: string | number): IManager {
    const protect = {
        id: identifier || count++
    };

    if (!global_data[protect.id]) global_data[protect.id] = {};

    return {
        all: bindAll(protect),
        fetch: bindFetch(protect),
        put: bindPut(protect),
        putMany: bindPutMany(protect),
        create: bindCreate(protect),
        createMany: bindCreateMany(protect),
        erase: bindErase(protect),
        eraseMany: bindEraseMany(protect),
        copy: bindCopy(protect),
        rename: bindRename(protect),
        reset: bindReset(protect),
        getId: bindGetId(protect)
    }
}