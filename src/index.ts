import express from "express";



const app = express();
const PORT = Number(process.env.PORT) || 8000;


app.get("/" , (req, res) =>{
    return res.json({
        massage : "server is up  and running...🚀"
    })  
})

app.listen(PORT, ()=>{console.log(`server is running at PORT ${PORT} 🚀`)} )