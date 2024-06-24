// import { userInfo } from "node:os";
import { prismaclient } from "../lib/db";
import {createHmac , randomBytes} from "node:crypto"
import jwt  from "jsonwebtoken"


export interface createuserplayod {
    fristName: string 
    lastName?: string
    email: string
     password: string 
}

export interface getusertokenpayload {
    email: string;
    password: string; 
}

//global access
const secetkey  ="jaydipjadhav1122131232";


class userservice {
  
//genrate usertoken fun
// private static genrateusertoken(){
// }

//give hashpassword    
private static genratehash(salt : string, password :string){
const hashedpassword = createHmac('sha256' , salt)
                        .update(password)
                        .digest("hex") ;
                    return hashedpassword;     
   
}    

    //karan aplyala object nko crete krava lagaycha
    //direct class name vr fun call hoil
public static createuser(payload : createuserplayod){

  //destruture a data in payload      
 const {fristName , lastName , email , password} = payload;

 //hashing a password
 //1.first create salt
 const salt = randomBytes(32).toString("hex");
//2. user salt and hash password
const hashedpassword = userservice.genratehash(salt , password);


return prismaclient.user.create({
            data :{
                fristName,
                lastName,
                email,
                salt,
                password : hashedpassword
            }
        });

    }

//find user function
private static getuserbyemail(email :string){
    return prismaclient.user.findUnique({
        where :{
            email
        }
    })
}
 
//user login fun
public static async getusertoken(payload:getusertokenpayload){
    const{email , password} = payload;

    //finding user 
const curruser = await userservice.getuserbyemail(email);

if(!curruser) return new Error("user is not found!");

//user find so, check passwrod
const usersalt = curruser.salt;
const hashpassword = userservice.genratehash(usersalt, password);
console.log(curruser.password , hashpassword)
 if(curruser.password !== hashpassword) throw new Error("password in wrong");


//genrate a token
const token = jwt.sign({
    id :curruser.id,
    fristName: curruser.fristName,
    email: curruser.email
}, secetkey)

return token;

}    

public static decodejwttoken(token: string){
return jwt.verify(token , secetkey);
}


//to find user user based on id services
public static getuserbyid(id: string){

    return prismaclient.user.findUnique({ where:{id}});

}


}




export default userservice