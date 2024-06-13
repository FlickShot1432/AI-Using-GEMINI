import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { Images } from "../../../assets";
import CustomInput from "../../../components/form/input";
import InputGroup from "../../../components/form/input-group";
import Form from "../../../components/form";
import Button from "../../../components/buttons";
import { useFormik } from "formik";
import { validation } from "../../../utils/yup";
import { api } from "../../../api";

const Login = ({ ...props }) => {
    const { errors, handleChange, handleSubmit, values } =
        useFormik({
            initialValues: {
                email: "",
                password: "",
            },
            validationSchema: validation.login,
            onSubmit: async (values) => {
                await handleApi(values);
            },
        });

    const handleApi = useCallback(async (payload) => {
        try {
            const response = await api.auth.login(payload)
            console.log(response);
            localStorage.setItem('token', response?.data?.token)
        } catch (error) {
            console.err(error)
        }
    }, []);

    return (
        <section {...props} className="w-full h-screen">
            <div className="w-full flex flex-col sm:flex-row items-center h-full">
                <div className="w-full hidden md:w-1/2 bg-green-200 lg:w-[60%] md:flex h-full justify-center items-center">
                    <Images.Login className="animate-bounce-slow w-auto md:w-[300px] lg:w-[400px] xl:w-[500px]" />
                </div>
                <div className="w-full md:w-1/2 lg:w-[40%] h-full flex justify-center items-center">
                    <Form handleSubmit={handleSubmit} className="p-4 w-full xs:w-[400px]">
                        <div className="w-full mb-16">
                            <h4 className="text-center text-3xl md:text-4xl font-medium">
                                Welcome Back
                            </h4>
                            <p className="text-sm text-gray-600 text-center mt-1">
                                Sign in to your account
                            </p>
                        </div>
                        <InputGroup error={errors.email} label="Email address">
                            <CustomInput
                                name="email"
                                error={errors.email}
                                value={values.email}
                                handleChange={handleChange}
                                autoComplete="on"
                                inputClass="font-medium"
                                type="email"
                            />
                        </InputGroup>
                        <InputGroup error={errors.password} label="Password">
                            <CustomInput
                                name="password"
                                error={errors.password}
                                value={values.password}
                                handleChange={handleChange}
                                autoComplete="on"
                                inputClass="font-medium"
                                type="password"
                                passwordVisibility
                            />
                        </InputGroup>
                        <div className="flex flex-col justify-end items-end !mt-8">
                            <span className="mb-2 text-sm cursor-pointer font-medium">
                                <Link replace to="/forgot-password">
                                    Forgot password?
                                </Link>
                            </span>
                            <Button type="submit" label="Login" />
                        </div>
                    </Form>
                </div>
            </div>
        </section>
    );
};

export default Login;
