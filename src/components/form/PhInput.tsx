import {  Form, Input } from "antd";
import { Controller } from "react-hook-form";

// type TInputProps = {
//   type: string,
//   name: string,
//   placeholder?: string,
//   label: string,
//   defaultValue?: string,
//   className?: string,
// }

// const PhInput = ({type,name,placeholder,label,defaultValue,className}:TInputProps) => {

//   return (
//     <div style={{marginBottom:'10px'}}>
 
   
//        <Controller
//        name={name}
//         render={({field,fieldState:{error}}) =><Form.Item  label={label }>
           
//      <Input
//        {...field}
//         type={type}
//         id={name}
//         placeholder={placeholder}
//     defaultValue={defaultValue}
//      className={className}
//        />  
//        {error&& <small style={{color:'red',}}>{error.message}</small>}
//         </Form.Item>}
//       />
  
//     </div>
//   )
// };

// export default PhInput;
type TInputProps = {
  type: string;
  name: string;
  placeholder?: string;
  label: string;
  defaultValue?: string;
  className?: string;
  labelClass?: string; // New prop for label class
};

const PhInput = ({ type, name, placeholder, label, defaultValue, className, labelClass }: TInputProps) => {
  return (
    <div style={{ marginBottom: '10px' }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label={<span className={labelClass}>{label}</span>} // Applying the label class
            validateStatus={error ? "error" : ""}
            help={error ? error.message : ""}
          >
            <Input
              {...field}
              type={type}
              id={name}
              placeholder={placeholder}
              defaultValue={defaultValue}
              className={className}
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PhInput;
