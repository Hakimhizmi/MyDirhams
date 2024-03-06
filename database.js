import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('mydirhams_DB.db');

export const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT NOT NULL,
          balance TEXT NOT NULL,
          currency TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS expenses (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          category TEXT NOT NULL,
          amount REAL NOT NULL,
          date TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS income (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          source TEXT NOT NULL,
          amount REAL NOT NULL,
          date TEXT NOT NULL
        );
        `,
        [],
        resolve,
        (_, error) => reject(error)
      );
    });
  });
};


export const checkIfDatabaseExists = () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          'SELECT COUNT(*) FROM sqlite_master WHERE type="table" AND name="users"',
          [],
          (_, { rows }) => {
            const userCount = rows.item(0)['COUNT(*)'];
            resolve(userCount > 0);
          },
          (_, error) => reject(error)
        );
      },
      error => reject(error)
    );
  });
};

