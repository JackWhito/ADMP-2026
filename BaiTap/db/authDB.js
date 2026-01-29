import { openDatabaseAsync } from "expo-sqlite";

let db;

export const initAuthDB = async () => {
  if (!db) {
    db = await openDatabaseAsync("auth.db");
  }

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS auth_user (
      id TEXT PRIMARY KEY NOT NULL,
      data TEXT NOT NULL
    );
  `);
};

export const saveAuthUser = async (user) => {
  await initAuthDB();
  await db.runAsync(
    "REPLACE INTO auth_user (id, data) VALUES (?, ?);",
    "me",
    JSON.stringify(user)
  );
};

export const getAuthUser = async () => {
  await initAuthDB();
  const result = await db.getFirstAsync(
    "SELECT data FROM auth_user WHERE id = ?;",
    "me"
  );
  return result ? JSON.parse(result.data) : null;
};

export const clearAuthUser = async () => {
  await initAuthDB();
  await db.execAsync("DELETE FROM auth_user;");
};
