/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Modal } from "antd";
import { toast } from "sonner";
import { useUpdateServiceMutation } from "../../../redux/features/user/servicesApi";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PhForm from "../../form/PhForm";
import PhInput from "../../form/PhInput";

const UpdateServiceModal = ({ service, isVisible, onClose }:any) => {
  console.log('inside modal',service);
  
    const [updateService,{data}] =useUpdateServiceMutation  ();
  console.log(data)
    const handleSubmit : SubmitHandler<FieldValues> = async (data) => {
      const toastId = toast.loading('Updating...');
      console.log('modal',data);
      const price=Number(data.price.slice(0, -1));
      console.log(price);
      
      const serviceData = {
        id:service.key,
        data:{
          name: data.name,
        duration: Number(data.duration.split(' ')[0]),
        price:Number(data.price.slice(0, -1)),
        description: data.description,
        }
        
      };
  console.log('modal service data ',serviceData);
  
      try {
        const res = await updateService(serviceData);
      console.log(res);
        toast.success('Service updated successfully!', { id: toastId });
        onClose(); // Close the modal after success
      } catch (err) {
        toast.error('Something went wrong', { id: toastId });
      }
    };
  
    return (
      <Modal
        title="Update Service"
        open={isVisible}
        onCancel={onClose}
        footer={null}
      >
        <PhForm onSubmit={handleSubmit} defaultValues={service}>
          <PhInput type="text" name="name" label="Name" defaultValue={service?.name} />
          <PhInput type="text" name="duration" label="Duration" defaultValue={service?.duration} />
          <PhInput type="text" name="price" label="Price" defaultValue={service?.price} />
          <PhInput type="text" name="description" label="Description" defaultValue={service?.description} />
          
          <Button htmlType="submit">Submit</Button>
        </PhForm>
      </Modal>
    );
  };
  export default UpdateServiceModal