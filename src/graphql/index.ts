import { ApolloServer } from '@apollo/server';
//import user of all conf.

import {User} from "./user/index"
import { Context } from 'node:vm';

async function createapollographqlserver(){
        
    //create graphql server
const gqlserver = new ApolloServer({
    typeDefs  :`
      ${User.typeDefs}

    type Query {
    
            ${User.queries}
    }

    type Mutation {
             ${User.mutation}   
  }
    `, // schema as string
    resolvers :{

        Query :{
         ...User.resolvers.queries
           
    //      getcontext: (parent:any, parameters:any , context) =>{
        
    //    console.log("context : " , context)
    //    return "context wroking done"

    //      }
     
        },
        Mutation :{
            ...User.resolvers.mutations
        
       }

       
    }
})

//start server -engin
await gqlserver.start();

return  gqlserver;


}

export default createapollographqlserver;