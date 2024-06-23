import express from "express";
import { ApolloServer } from '@apollo/server';
import {expressMiddleware} from "@apollo/server/express4"
import { prismaclient } from "./lib/db";





async function init(){
     
const app = express();
const PORT = Number(process.env.PORT) || 8000;
app.use(express.json());

//create graphql server
const gqlserver = new ApolloServer({
    typeDefs  :`
    type Query {
     hello : String
     bye : String
     say(name : String) : String
    }

    type Mutation {
       createuser(fristName: String! , lastName: String! , email:String!, password:String!) :Boolean
    }
    `, // schema as string
    resolvers :{
        Query :{
            hello : () => `hey there , I am a grapgql server `,
            bye : () => `Bye , from apollo server `,
            say :(parent , {name}:{name : String}) => `hey i am ${name}`,
        },

        Mutation: {

            createuser :async(parent,
                 {fristName ,
                 lastName ,
                  email, 
                  password
                } :{
                    fristName: string; 
                    lastName: string; 
                    email: string;
                     password: string 
                } 
            )=> {
                await prismaclient.user.create({
                    data: {
                        email,
                        fristName,
                        lastName,
                        password,
                        salt : "random_salt",
                    },
                });
               return true;

            },

        },
    }
})

await gqlserver.start();

// app.use(expressMiddleware(gqlserver)); //set graphql server apn all sathi
app.use("/graphql",expressMiddleware(gqlserver)); //set graphql server apn all sathi

app.get("/" , (req, res) =>{
    return res.json({
        massage : "server is up  and running...🚀"
    })  
})

// app.get("/graphql" , (req, res) =>{
//     return res.gqlserver
// })



app.listen(PORT, ()=>{console.log(`server is running at PORT ${PORT} 🚀`)} )

}

init(); //call global level
