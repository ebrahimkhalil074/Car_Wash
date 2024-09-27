/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button, Col,  Row,  } from "antd";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAppDispatch } from "../redux/hooks";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { verifyToken } from "../utills/verifyToken";
import { setUser } from "../redux/features/auth/authSlice";
import PhForm from "../components/form/PhForm";
import PhInput from "../components/form/PhInput";



const Login = () => {

    const navigate =useNavigate()
    const dispatch =useAppDispatch()
    const[ login,{data,error}]=useLoginMutation()
    console.log(data);
    console.log('err',error);
  
  
  
  const onSubmit =async (data :FieldValues) => {
    console.log(data);
    
  const toastId=toast.loading('logged in')
  try{
    const userInfo={
      email: data.email,
       password: data.password,
  
      }
      
      console.log(userInfo);
      
      
       const res = await login(userInfo).unwrap()
       console.log(res);
       
       const user =verifyToken(res.data.accessToken)
       console.log(user);
       
      dispatch(setUser({user:user,token:res.data.accessToken}))
      toast.success('logged in successfully',{id: toastId})
  
      
        navigate(`/`)
   

      }catch(err){
        toast.error('something went wrong',{id: toastId})
        }
        }  

  return (

<div 
className="bg-cover bg-center  relative"
 style={{ backgroundImage: 'url(https://i.ibb.co/Thpg2xc/DALL-E-2024-09-01-21-50-44-A-hero-section-of-a-modern-car-wash-service-website-The-background-shows.webp)',height:"100vh",width:"100%" }}>
<Row
className="  absolute inset-0 bg-black bg-opacity-30 "
style={{height:"100vh",width:"100%"}}
justify='center' align='middle' >
<Col span={8}>
<PhForm onSubmit={onSubmit}>
  
 <div >
 <PhInput type="email" name='email' label="Email" labelClass="text-lg font-semibold text-white"></PhInput>
 </div>
     
   
      <PhInput type="password" name='password' label="Password" labelClass="text-lg font-semibold text-white" ></PhInput>
  
<Button htmlType="submit"> Submit</Button>
    </PhForm>
</Col>
   
    </Row>
</div>


  );
};

export default Login;