import React from "react";

export default function CustomInput({
  icon,
  type,
  title,
  name,
  register,
  errors,
}) {
  const Icon = icon;
  return (
    <>
      <div className="custom_input">
        <div className="input_icon_outer">
          <Icon fontSize="medium" color="disabled" className="input_icon"/>
        </div>
        <input type={type} placeholder={title} {...register(name)} />
        {errors[name] && (
          <span className="custom_input_error">{`* ${errors[name].message}`}</span>
        )}
      </div>
    </>
  );
}
