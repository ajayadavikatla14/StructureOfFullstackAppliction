
const Pool=require("pg").Pool;

const pool=new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'i3auras_staging_new', 
    password: '1234',
    port: 5432,
})

module.exports=pool;