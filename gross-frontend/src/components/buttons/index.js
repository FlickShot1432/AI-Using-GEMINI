import React from "react";
import { classNames } from "../../utils/functions";
import Loader from "../loader";

const Button = ({ label, handleClick, loading, icon: ICON, iconClassName, loaderClass, loaderType, ...props }) => {
    return (
        <button
            {...props}
            onClick={handleClick}
            className={classNames(
                "flex justify-center items-center text-white w-full bg-green-600 py-3 px-4 focus:outline-none hover:bg-green-700 rounded-[0.5rem] text-base font-medium",
            )}
        >
            {label}
            {ICON ? <ICON className={classNames('fill-white ml-1 w-4 h-4', iconClassName)} /> : null}
            {loading ? <Loader className={classNames('ml-1', loaderClass)} type={loaderType || 'spinner'} /> : null}
        </button>
    );
};

export default Button;
