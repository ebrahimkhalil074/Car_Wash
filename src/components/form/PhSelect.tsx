import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TSelectProps={
  label: string;
  name: string;
  options: Array<{ value: string, label: string ,
    disabled?:boolean |undefined}>;
    disabled?: boolean | undefined;
     mode?:"multiple"|undefined
}

const PhSelect = ({label,name,options,disabled,mode}:TSelectProps) => {
  
  return (
  <Controller
  name={name}
  render={({field,fieldState:{error}})=> <Form.Item  label={label}>
  <Select
style={{ width: '100%'}}
{...field}
mode={mode}
disabled={disabled}
options={options}
/>
{error&& <small style={{color:'red',}}>{error.message}</small>}
</Form.Item>}
  
  
  
  />
  );
};

export default PhSelect;