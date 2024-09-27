
import { Button, Col, Flex, Row,  } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAddUserMutation } from "../redux/features/user/userManagement.api";
import PhForm from "../components/form/PhForm";
import PhInput from "../components/form/PhInput";



const Register = () => {
  const [addUser,{data,error}] =useAddUserMutation();
  console.log(data,error);
    const handleSubmit :SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    addUser(data);
    };

    

  return (
    <Row justify='center' align='middle' style={{height:'100vh', width:'100%'}}>
      <Col span={24}>
      <Flex justify="center" align="center" >
<Col span={12}>
<PhForm onSubmit={handleSubmit}>
  
  <PhInput type="text" name='name' label="Name" ></PhInput>

      <PhInput type="email" name='email' label="Email" ></PhInput>
    
     
      <PhInput type="password" name='password' label="Password" ></PhInput>
   
 
      <PhInput type="text" name='phone' label="Number" ></PhInput>
      
      <PhInput type="text" name='address' label="Address" ></PhInput>
<Button htmlType="submit"> Submit</Button>
<Link to='/login'><Button htmlType="submit">login</Button></Link>

    </PhForm>
</Col>
   
    </Flex>
      </Col>
    
    </Row>
  );
};

export default Register;