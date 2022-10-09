const mysql = require('mysql');

module.exports = {
  config: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1234',
    database: 'exapp',
  },
  sqlConnect: (sql, sqlArr, callback) => {
    const pool = mysql.createPool(this.config);

    pool.getConnection((err, connection) => {
      if (err) {
        console.error('err connection: ', err.message);
        throw err;
      }

      connection.query(sql, sqlArr, (error, results, fields) => {
        if (error) {
          console.log('error query: ', error.message);
          throw error;
        }

        callback(results);

        // 当不再使用时，归还到连接池中
        connection.release();

        // 当不再使用时并要从连接池中移除
        connection.destroy();
      });
    });

    // 当连接池不需要使用时，关闭连接池
    pool.end();
  },

  SySqlConnect: (sySql, sqlArr) => {
    return new Promise((resolve, reject) => {
      const pool = mysql.createPool(this.config);

      pool.getConnection((err, connection) => {
        if (err) {
          console.error('err connection: ', err.message);
          reject(err);
        } else {
          connection.query(sySql, sqlArr, (error, data) => {
            if (error) {
              console.log('error query: ', error.message);
              reject(err);
            } else {
              resolve(data);
            }

            // 当不再使用时，归还到连接池中
            connection.release();

            // 当不再使用时并要从连接池中移除
            connection.destroy();
          });
        }
      });

      // 当连接池不需要使用时，关闭连接池
      pool.end();
    });
  },
};
