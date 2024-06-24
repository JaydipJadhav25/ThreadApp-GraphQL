import userservice, { createuserplayod, getusertokenpayload } from "../../services/user";


const queries = {

getusertoken: async(parent:any,payload :getusertokenpayload) =>{
        const{email , password} =payload;
        const token = await userservice.getusertoken(payload);
          return token;
    },
getcurrentloggeduser: async(parent:any , parameters:any,context:any)=> {
    // console.log("context: " , context);
    // return "demo"

    if(context && context.decodetoken ){
        
        // return context.decodetoken 

      const id = context.decodetoken.id;
      const crruser = await userservice.getuserbyid(id);
      return crruser;
    }
     
    return new Error("I dont know who are you || Incorrect token")


    
       
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