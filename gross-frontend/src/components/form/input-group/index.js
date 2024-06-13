import React from "react";
import { classNames } from "../../../utils/functions";

const InputGroup = ({ children, className, label, labelClass, error, ...props }) => {
  return (
    <div
      {...props}
      className={classNames(
        "flex flex-col justify-center items-start",
        className
      )}
    >
      {label ? (
        <label
          className={classNames(
            "mb-[0.25rem] text-base font-medium",
            labelClass
          )}
        >
          {label}
        </label>
      ) : null}
      {children}
      {error ? (
        <label
          className={classNames(
            "mb-[0.25rem] text-sm font-medium text-red-500",
          )}
        >
          {error}
        </label>
      ) : null}
    </div>
  );
};

export default InputGroup;
