export interface StoredData {
    [key: string]: any;
}

export interface IProtect {
    id: string | number;
}

export interface IManager {
    all(): StoredData;
    fetch(key: string): any;
    put(key: string, value: any): StoredData;
    putMany(items: StoredData): StoredData;
    create(key: string, value: any): StoredData | null;
    createMany(items: StoredData): StoredData;
    erase(key: string): void;
    eraseMany(...keys: string[]): void;
    copy(source: string, destination: string): StoredData;
    rename(source: string, destination: string): StoredData;
    reset(): void;
    getId(): string | number;
}