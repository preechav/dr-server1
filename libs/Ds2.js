const mysql = require('mysql');

module.exports = {

    selectDr : async(pool) => {
      var sql = "select * from dr";
      return await pool.query(sql);
    },

    selectDrById : async(pool,classid) => {
      var sql = "select * from dr "
              + " where classid = ?" 
      sql = mysql.format(sql,[classid]);
      return await pool.query(sql);  
    }, 

    insertDr : async(pool,classname,classdetail,classtreatment) => {
      var sql = "insert into dr(classname,classdetail,classtreatment) values(?,?,?)";
      sql = mysql.format(sql,[
        classname,classdetail,classtreatment
      ]);
      return await pool.query(sql);
    },

      updateDr : async(pool,classid,classname,classdetail,classtreatment) => {
        var sql = "update dr set "
                + "classname = ? " 
                + ",classdetail = ? " 
                + ",classtreatment = ? " 
                + " where classid = ?" 
        sql = mysql.format(sql,[
          classname,classdetail,classtreatment,classid
        ]);
        return await pool.query(sql);  
    }, 

    deleteDr : async(pool,classid) => {
      var sql = "delete from dr "
              + " where classid = ?" 
      sql = mysql.format(sql,[classid]);
      return await pool.query(sql);  
    } 

}