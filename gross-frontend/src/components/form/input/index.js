import React, { useCallback, useState } from "react";
import { classNames } from "../../../utils/functions";
import { Icons } from "../../../assets";

const CustomInput = ({
  inputClass,
  passwordVisibility,
  name,
  value,
  error,
  type,
  handleChange,
  ...props
}) => {

  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  return (
    <div className="relative w-full" >
      <input
        {...props}
        className={classNames(
          "w-full bg-white rounded-[0.5rem] border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-50 text-base outline-none text-gray-700 py-3 px-4 transition-colors duration-200 ease-in-out",
          inputClass, error ? 'border-red-500 focus:border-red-500' : '', passwordVisibility ? 'pr-[42px]' : ''
        )}
        {...{ name, value, type: (passwordVisibility ? isOpen ? 'text' : 'password' : type), onChange: handleChange }}
      />
      {
        passwordVisibility ? (isOpen ? <Icons.EyeOpen onClick={handleToggle} className="w-[24px] text-green-600 absolute right-3 top-1/2 cursor-pointer -translate-y-1/2" /> : <Icons.EyeClose onClick={handleToggle} className="w-[24px] text-green-600 absolute right-3 top-1/2 cursor-pointer -translate-y-1/2" />) : null
      }
    </div>
  );
};

export default CustomInput;
