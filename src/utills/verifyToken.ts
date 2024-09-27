 
 import { jwtDecode } from "jwt-decode";

 export const verifyToken=(item: string )=>{
    const token = item?.split(' ')[1]
    
return jwtDecode(token )
}