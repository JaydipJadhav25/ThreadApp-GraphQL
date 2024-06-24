import { prismaclient } from "../lib/db";
import {createHmac , randomBytes} from "node:crypto"
export interface createuserplayod {

    fristName: string 
    lastName?: string
    email: string
     password: string 
}


class userservice {
    
    //karan aplyala object nko crete krava lagaycha
    //direct class name vr fun call hoil
    public static createuser(payload : createuserplayod){

  //destruture a data in payload      
 const {fristName , lastName , email , password} = payload;

 //hashing a password
 //1.first create salt
 const salt = randomBytes(32).toString("hex");
//2. user salt and hash password

const hashedpassword = createHmac('sha256' , salt).update(password).digest("hex") ;



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


}




export default userservice