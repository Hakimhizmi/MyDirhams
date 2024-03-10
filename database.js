import { format, isValid } from 'date-fns';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('mydirhamsDB.db');
const itemsPerPage = 20

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
                'SELECT * FROM users',
                [],
                (_, { rows }) => {
                  const lang = rows.item(0).lang;
                  resolve(lang ? lang : false);
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

export const getTodayData = (page = 1) => {
  const todayDate = format(new Date(), 'yyyy-MM-dd');
  const offset = page > 1 ? (page - 1) * itemsPerPage : 0;

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      const expensesQuery = `SELECT 'expense' as type, id, title, category, amount, date FROM expenses WHERE substr(date, 1, 10) = ? ORDER BY date DESC LIMIT ${itemsPerPage} OFFSET ${offset}`;
      const incomeQuery = `SELECT 'income' as type, id, null as title, amount, date, source as title FROM income WHERE substr(date, 1, 10) = ? ORDER BY date DESC LIMIT ${itemsPerPage} OFFSET ${offset}`;

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


export const getExpensesOrIncomes = async (table, date = null, category = null, page = 1) => {
  date = isValid(date) ? format(date, 'yyyy-MM-dd') : null
  const whereClause = date ? 'WHERE substr(date, 1, 10) = ?' : '';
  const categoryFilter = category ? `${date ? 'AND' : 'WHERE'}  ${table === 'expenses' ? 'category' : 'source'} = ?` : '';
  const offset = page > 1 ? (page - 1) * itemsPerPage : 0;
  const query = `SELECT * FROM ${table} ${whereClause} ${categoryFilter} ORDER BY date DESC LIMIT ${itemsPerPage} OFFSET ${offset}`;
  const params = [date, category].filter(param => param !== null && param !== undefined);
  try {
    const { rows } = await new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          query,
          params,
          (_, result) => resolve(result),
          (_, error) => reject(error)
        );
      });
    });
    const data = rows._array;
    const { currency } = await getUserData();
    return { data, currency };
  } catch (error) {
    throw error;
  }
};

export const deleteExpensesOrIncomes = async (table, id) => {
  let query = `SELECT amount FROM ${table} WHERE id = ?`;

  try {
    const { rows } = await new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          query,
          [id],
          (_, result) => resolve(result),
          (_, error) => reject(error)
        );
      });
    });

    if (rows.length === 0) {
      throw new Error(`Item with id ${id} not found.`);
    }

    const deletedItem = rows.item(0);
    const amount = deletedItem.amount;

    query = `DELETE FROM ${table} WHERE id = ?`;

    await new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          query,
          [id],
          (_, result) => resolve(result),
          (_, error) => reject(error)
        );
      });
    });

    if (table === 'expenses') {
      await updateBalance(amount);
    } else if (table === 'income') {
      await updateBalance(-amount);
    }

    return { success: true };
  } catch (error) {
    throw error;
  }
};


//statistique

export const getStatistiqueData = async (table, selectedYear) => {
  return new Promise(async (resolve, reject) => {
    const monthsArray = Array.from({ length: 12 }, () => 0);

    const fetchData = (query, onSuccess) => {
      db.transaction((tx) => {
        tx.executeSql(
          query,
          [selectedYear.toString()],
          (_, { rows }) => {
            onSuccess(rows._array);
          },
          (_, error) => {
            console.error('Error fetching data:', error);
            reject(error);
          }
        );
      });
    };

    const totalAmountQuery = `
      SELECT 
        strftime('%m', date) as month,
        SUM(amount) as totalAmount
      FROM ${table}
      WHERE strftime('%Y', date) = ?
      GROUP BY strftime('%m', date)
      ORDER BY strftime('%m', date);
    `;

    const categoryPercentageQuery = `
    SELECT 
      ${table === 'expenses' ? 'category' : 'source'} as category,
      SUM(amount) as totalAmount
    FROM ${table}
    WHERE strftime('%Y', date) = ?
    GROUP BY ${table === 'expenses' ? 'category' : 'source'}
    ORDER BY ${table === 'expenses' ? 'category' : 'source'};
  `;


    fetchData(totalAmountQuery, async (totalAmountData) => {
      let totalExpenses = 0;
      totalAmountData.forEach((item) => {
        const monthIndex = parseInt(item.month, 10) - 1;
        monthsArray[monthIndex] = item.totalAmount;
        totalExpenses += item.totalAmount;
      });

      const { currency } = await getUserData();

      fetchData(categoryPercentageQuery, (categoryData) => {
        const totalCategoryExpenses = categoryData.reduce((acc, categoryItem) => acc + categoryItem.totalAmount, 0);
        const categoriesPercentage = categoryData.map((categoryItem) => ({
          category: categoryItem.category,
          percentage: (categoryItem.totalAmount / totalCategoryExpenses) * 100,
        }));

        resolve({ monthsArray, totalExpenses, currency, categoriesPercentage });
      });
    });
  });
};

//settings

export const updateUserInfo = (key, value) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE users SET ${key} = ?`,
        [value],
        (_, success) => {
          resolve(success);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};


export const deleteAccount = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql('DROP TABLE IF EXISTS expenses;', [], (_, success) => {
        tx.executeSql('DROP TABLE IF EXISTS income;', [], (_, success) => {
          tx.executeSql('DROP TABLE IF EXISTS users;', [], resolve, reject);
        });
      });
    });
  });
};

