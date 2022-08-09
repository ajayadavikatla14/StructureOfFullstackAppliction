const express=require("express");
const cors=require("cors");
const route=express.Router();
const pool=require("../db/db.js");

//middlewares
route.use(cors());
route.use(express.json());

route.get('/getEntities',async(req,res)=>{
   const data = await pool.query('select id,display_name from tblentities where statusid = 1 order by id');
    res.send(data.rows);
})
                         
route.get('/getParticularEntity/:id',async(req,res)=>{
    const entityId=req.params.id;
   const data = await pool.query('select  tm.id,tm.name,tm.parent,tmp.entityid,tmp.moduleid,tmp.statusid from tblmodules tm left join tblentitymodulemap tmp on tmp.moduleid = tm.id left join tblentities te on te.id = tmp.entityid where tmp.entityid =($1) order by tm.id',[entityId]);
   res.send(data.rows);
})

route.post('/insertModuleMap',async(req,res)=>{
    const {entityid,moduleid,statusid}=req.body
    await pool.query('insert into tblentitymodulemap (entityid,moduleid,statusid) values ($1,$2,$3)',
    [entityid,moduleid,statusid])
    res.send({message: 'successfully inserted..!!!'})
})

route.put('/putModuleMap',async(req,res)=>{
    const {entityId,modules} = req.body;
    modules.map(async(module)=>{
        module.statusid = (module.isChecked===true)  ? 1  : 0;
        if(module.statusid===1 && module.childs.length > 0){
            module.childs.map(async(child,index)=>{
                child.statusid=(child.isChecked===true) ? 1 : 0;
                await pool.query('update tblentitymodulemap set statusid = ($1) where entityid = ($2) and moduleid = ($3)',[child.statusid,child.entityid,child.moduleid])
            })
          }else if(module.statusid===0 && module.childs.length > 0){
            module.childs.map(async(child,index)=>{
                child.statusid=(child.isChecked===true) ? 1 : 0;
                await pool.query('update tblentitymodulemap set statusid = ($1) where entityid = ($2) and moduleid = ($3)',[child.statusid,child.entityid,child.moduleid])
            })
        }
          if(module.statusid===1){
            console.log('each 1 module.statusid===1');
            await pool.query('update tblentitymodulemap set statusid = ($1) where entityid = ($2) and moduleid = ($3)',[module.statusid,module.entityid,module.moduleid])
          }else if(module.statusid===0){
            console.log('each 1 module.statusid===0');
            await pool.query('update tblentitymodulemap set statusid = ($1) where entityid = ($2) and moduleid = ($3)',[module.statusid,module.entityid,module.moduleid])
          }
    })
    res.send('successfully updated..!!!');
})

module.exports=route;





// modules.map(async(module)=>{
//     module.statusid = (module.isChecked===true)  ? 1  : 0;
//         if(module.statusid===1){
//             await pool.query('update tblentitymodulemap set statusid = ($1) where entityid = ($2) and moduleid = ($3)',[module.statusid,module.entityid,module.moduleid])
//         }else{
//             await pool.query('update tblentitymodulemap set statusid = ($1) where entityid = ($2) and moduleid = ($3)',[module.statusid,module.entityid,module.moduleid])
//         }
// })