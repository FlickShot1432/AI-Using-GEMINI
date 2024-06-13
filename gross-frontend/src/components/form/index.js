import React from "react";
import { classNames } from "../../utils/functions";

const Form = ({ className, children, handleSubmit, ...props }) => {
  return (
    <form
      className={classNames("space-y-4", className)}
      {...props}
      onSubmit={handleSubmit}
    >
      {children}
    </form>
  );
};

export default Form;
