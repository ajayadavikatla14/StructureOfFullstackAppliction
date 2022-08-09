const app=require("./src/app.js");
const port=process.env.PORT || 4002;
let hostIP='localhost';

app.listen(port,hostIP,()=>{
    console.log(`listening on port http://${hostIP}:${port}`);
})