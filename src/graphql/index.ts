import { ApolloServer } from '@apollo/server';
//import user of all conf.

import {User} from "./user/index"

async function createapollographqlserver(){
        
    //create graphql server
const gqlserver = new ApolloServer({
    typeDefs  :`
    type Query {
    
            hello: String
    }

    type Mutation {
             ${User.mutation}   
  }
    `, // schema as string
    resolvers :{

        Query :{
         ...User.resolvers.queries
     
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