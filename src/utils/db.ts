import { openDB } from 'idb';

async function getDB(dbName: string, storeName: string) {
  return openDB(dbName, 1, {
    upgrade(db) {
      db.createObjectStore(storeName, {
        autoIncrement: true,
      });
    },
  });
}

export async function getAll<T>(
  dbName: string,
  storeName: string
): Promise<T[]> {
  const db = await getDB(dbName, storeName);
  const items = await db.getAll(storeName);
  return items;
}

export async function addItem<T>(
  dbName: string,
  storeName: string,
  newItem: T,
  key?: IDBValidKey
) {
  const db = await getDB(dbName, storeName);
  return db.put(storeName, newItem, key);
}

export async function clearAllItems(dbName: string, storeName: string) {
  const db = await getDB(dbName, storeName);
  return db.clear(storeName);
}
