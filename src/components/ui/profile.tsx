import { Avatar, Button, Divider } from "antd";
import PhForm from "../form/PhForm";
import PhInput from "../form/PhInput";
import { useAppSelector } from "../../redux/hooks";
import { currentUser } from "../../redux/features/auth/authSlice";
import { useGetAllUserQuery, useUpdateUserMutation } from "../../redux/features/user/userManagement.api";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { User } from "../../types/globalTypes";

const ProfilePage = () => {
  const {data} =useGetAllUserQuery(undefined)
console.log(data);
const [updateUser] =useUpdateUserMutation()
 const user =useAppSelector(currentUser);

 const currUser = data?.data.find((item :User)=>item.email === user!.email)
console.log(currUser)
  const handleFormSubmit:SubmitHandler<FieldValues> = (data) => {
    console.log('Updated profile information:',data);
    const updatedInfo ={
      id: currUser?._id,
      data
    }
    console.log(updatedInfo)
   updateUser(updatedInfo)
    
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        {/* Header - Profile Picture and Name */}
        <div className="flex items-center space-x-6">
          <Avatar ></Avatar>
          <div>
            <h1 className="text-2xl font-semibold text-blue-800">{user?.name}</h1>
            <p className="text-gray-500">{user?.role}</p>
          </div>
        </div>
<Divider/>

         <div className="flex justify-center items-center">
         <div className=" space-y-3 text-2xl font-bold">
            {/* Name */}
<h1><span className="text-3xl">Name</span>:{currUser?.name}</h1>
            {/* Email */}
   <h2>Email:{currUser?.email}</h2>      
    {/* Phone Number */}
    <h2>Phone:{currUser?.phone}</h2>          
    <h2>Address:{currUser?.address}</h2>    
          </div>
         </div>
  
        
<Divider/>

        {/* Profile Information Form */}
        {currUser && 
        <PhForm onSubmit={handleFormSubmit} >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Name */}
         <PhInput type='text' name='name' placeholder='Name' label='Name' defaultValue={currUser?.name}></PhInput>

          {/* Email */}
       
           <PhInput  type='email'
            name="email"
            label="Email"
             placeholder="Email"
             defaultValue={currUser?.email}
            ></PhInput>

          {/* Phone Number */}
          <PhInput type='number'  name="phone"
            label="Phone Number" defaultValue={currUser?.phone}></PhInput>
        
         
          <PhInput type='text'  name="address"
            label="Address" defaultValue={currUser?.address}></PhInput>
        </div>

        {/* Save Button */}
       
          <div className="flex justify-end mt-6">
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </div>
       
      </PhForm>
      }
      </div>
    </div>
  );
};

export default ProfilePage;
