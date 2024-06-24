import express from "express";
import {expressMiddleware} from "@apollo/server/express4"
import createapollographqlserver from "./graphql";
import userservice from "./services/user";






async function init(){

     
const app = express();
const PORT = Number(process.env.PORT) || 8000;
app.use(express.json());



// app.use(expressMiddleware(gqlserver)); //set graphql server apn all sathi
// app.use("/graphql",expressMiddleware(gqlserver)); //set graphql server apn all sathi

//call graphql server and rgister on /graphql root
const qlserver = await createapollographqlserver();
 app.use("/graphql",expressMiddleware(qlserver ,  {
     context : async( { req}) =>{ 
         //access token on rea
         
         const token = req.headers["token"]
         //  const token = req.headers("token");

         //decode token
         try {
             
        const decodetoken = userservice.decodejwttoken(token as string);

          console.log("useer" , decodetoken)

        return { decodetoken };

     } catch (error) {
        
        return {}
     }


    }
 })); 

 //in one line pass server 
//  app.use("/graphql",expressMiddleware(await createapollographqlserver())); 




app.get("/" , (req, res) =>{
    return res.json({
        massage : "server is up  and running...🚀"
    })  
})



app.listen(PORT, ()=>{console.log(`server is running at PORT ${PORT} 🚀`)} )

}

init(); //call global level
