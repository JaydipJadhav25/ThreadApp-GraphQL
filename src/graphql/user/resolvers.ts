import userservice, { createuserplayod, getusertokenpayload } from "../../services/user";


const queries = {

getusertoken: async(parent:any,payload :getusertokenpayload) =>{
        const{email , password} =payload;
        const token = await userservice.getusertoken(payload);
          return token;
    },
getcurrentloggeduser: async() =>{

        // return "demo user"
        return new Error("i dont no who are you?")
    }    
}

const mutations = {

//     createuser :async(parent : any,
//         {fristName ,
//         lastName ,
//          email, 
//          password
//        } :{
//            fristName: string; 
//            lastName: string; 
//            email: string;
//             password: string 
//        } 
//    )=> { return "done"},

createuser: async(_:any ,payload: createuserplayod) =>{
    const res = await userservice.createuser(payload);
    return res.id;
}

}


export const resolvers = {queries , mutations}