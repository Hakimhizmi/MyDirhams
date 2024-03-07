import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('mydirhamsDB.db');

export const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      // Users table creation
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT NOT NULL,
          balance TEXT NOT NULL,
          currency TEXT NOT NULL,
          lang TEXT NOT NULL
        );`,
        [],
        (_, success) => {
          // Expenses table creation
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS expenses (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              title TEXT NOT NULL,
              category TEXT NOT NULL,
              amount REAL NOT NULL,
              date TEXT NOT NULL
            );`,
            [],
            (_, success) => {
              // Income table creation
              tx.executeSql(
                `CREATE TABLE IF NOT EXISTS income (
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  source TEXT NOT NULL,
                  amount REAL NOT NULL,
                  date TEXT NOT NULL
                );`,
                [],
                resolve, // Resolve the promise if successful
                (_, error) => reject(error) // Reject the promise in case of an error
              );
            }
          );
        }
      );
    });
  });
};

export const checkIfDatabaseExists = () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        // Check if 'users' table exists
        tx.executeSql(
          'SELECT name FROM sqlite_master WHERE type="table" AND name="users"',
          [],
          (_, { rows }) => {
            const tableExists = rows.length > 0;

            if (tableExists) {
              // 'users' table exists, check if it has data
              tx.executeSql(
                'SELECT COUNT(*) as count FROM users',
                [],
                (_, { rows }) => {
                  const userCount = rows.item(0).count;
                  resolve(userCount > 0);
                },
                (_, error) => reject(error)
              );
            } else {
              resolve(false); // 'users' table does not exist
            }
          },
          (_, error) => reject(error)
        );
      },
      error => reject(error)
    );
  });
};

export const insertUser = (username, balance, currency, lang) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          'INSERT INTO users (username, balance, currency, lang) VALUES (?, ?, ?, ?)',
          [username, balance, currency, lang],
          (_, { insertId }) => {
            resolve(insertId); // Returns the ID of the inserted row
          },
          (_, error) => reject(error)
        );
      },
      error => reject(error)
    );
  });
};

export const getUserData = () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          'SELECT * FROM users LIMIT 1',
          [],
          (_, { rows }) => {
            if (rows.length > 0) {
              console.log(rows);
              resolve(rows.item(0));
            } else {
              reject(new Error('No user found'));
            }
          },
          (_, error) => {
            reject(error);
          }
        );
      },
      error => {
        reject(error);
      }
    );
  });
};

const updateBalance = (changeAmount) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE users SET balance = balance + ?`, // Adjust the WHERE clause as needed
        [changeAmount],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            console.log(rowsAffected);
            console.log(changeAmount);
            resolve();
          } else {
            reject(new Error("Failed to update user's balance"));
          }
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

// expences
export const insertExpense = (title, category, amount) => {
  const todayDate = new Date().toISOString()
  // SQL query to insert an expense
  const query = `INSERT INTO expenses (title, category, amount, date) VALUES (?, ?, ?, ?)`;
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        query,
        [title, category, amount, todayDate],
        (_, { insertId }) => {
          // After inserting income, update the user's balance
          updateBalance(-amount)
            .then(() => resolve(insertId))
            .catch((updateError) => reject(updateError));
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

//incomes
export const insertIncome = (source, amount) => {
  const todayDate = new Date().toISOString()
  // SQL query to insert an expense
  const query = `INSERT INTO income (source, amount, date) VALUES (?, ?, ?)`;
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        query,
        [source, amount, todayDate],
        (_, { insertId }) => {
          // After inserting income, update the user's balance
          updateBalance(amount)
            .then(() => resolve(insertId))
            .catch((updateError) => reject(updateError));
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export const getTodayData = () => {
  const todayDate = new Date().toISOString().split('T')[0]; // Format date as 'YYYY-MM-DD'

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      const expensesQuery = `SELECT 'expense' as type, id, title, category, amount, date FROM expenses WHERE substr(date, 1, 10) = ? ORDER BY date DESC`;
      const incomeQuery = `SELECT 'income' as type, id, null as title, amount, date, source as title FROM income WHERE substr(date, 1, 10) = ? ORDER BY date DESC`;

      const expensesPromise = new Promise((resolveExpenses, rejectExpenses) => {
        tx.executeSql(
          expensesQuery,
          [todayDate],
          (_, { rows }) => resolveExpenses(rows._array),
          (_, error) => rejectExpenses(error)
        );
      });

      const incomePromise = new Promise((resolveIncome, rejectIncome) => {
        tx.executeSql(
          incomeQuery,
          [todayDate],
          (_, { rows }) => resolveIncome(rows._array),
          (_, error) => rejectIncome(error)
        );
      });

      // Combining the results once both queries are executed
      Promise.all([expensesPromise, incomePromise])
        .then(([expenses, income]) => {
          const todayData = [...expenses, ...income];
          // Sort the combined data by date in descending order
          todayData.sort((a, b) => new Date(b.date) - new Date(a.date));
          resolve(todayData);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

export const getExpenses = () => {
  const query = `SELECT * FROM expenses ORDER BY date DESC`;

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        query,
        [],
        (_, { rows }) => {
          const Expenses = rows._array;
          resolve(Expenses);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};


