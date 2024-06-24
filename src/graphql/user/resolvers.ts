import userservice, { createuserplayod } from "../../services/user";


const queries = {};


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