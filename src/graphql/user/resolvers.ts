

const queries = {};


const mutations = {
    // createuser: async(parent , {fristName, lastName, email, password}:)
    // createUser : async() => {
    //     return "ramdonid";
    // },

    createuser :async(parent : any,
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
   )=> { return "done"},
}


export const resolvers = {queries , mutations}