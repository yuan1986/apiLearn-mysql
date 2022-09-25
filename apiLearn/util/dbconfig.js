const mysql = require('mysql');

module.exports = {
  //数据库配置
  config: {
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'exapp',
  },
  //连接数据库，使用连接池方式
  //连接池对象
  sqlConnect: function (sql, sqlArr, callBack) {
    var pool = mysql.createPool(this.config);

    pool.getConnection(function (err, conn) {
      if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }

      conn.query(sql, sqlArr, function (error, results, fields) {
        if (error) throw error;

        callBack(results);

        conn.release();
      });
    });
  },

  //promise 回调
  SySqlConnect: function (sySql, sqlArr) {
    return new Promise((resolve, reject) => {
      var pool = mysql.createPool(this.config);

      pool.getConnection(function (err, conn) {
        if (err) {
          reject(err);
        } else {
          conn.query(sySql, sqlArr, (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
            
            conn.release();
          });
        }
      });
    }).catch((err) => {
      console.log(err);
    });
  },
};
