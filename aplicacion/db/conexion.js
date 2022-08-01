const sql = require('mssql');

export default async function db(){
    
    // make sure that any items are correctly URL encoded in the connection string
    await sql.connect(`Server=localhost;Database=jhostter;User Id=prueba;Password=123;trustServerCertificate=true`);
    
    return sql;
}