import React, { useCallback } from 'react'
import { Images } from '../../../assets'
import Form from '../../../components/form'
import InputGroup from '../../../components/form/input-group'
import CustomInput from '../../../components/form/input'
import Button from '../../../components/buttons'
import { Link } from 'react-router-dom'

const ForgotPassword = ({ ...props }) => {

    const handleSubmit = useCallback((e) => {
        e.preventDefault()
    }, [])

    return (
        <section {...props} className="w-full h-screen">
            <div className="w-full flex flex-col sm:flex-row items-center h-full">
                <div className="w-full md:w-1/2 lg:w-[40%] h-full flex justify-center items-center">
                    <Form handleSubmit={handleSubmit} className="p-4 w-full xs:w-[400px]">
                        <div className="w-full mb-16" >
                            <h4 className="text-center text-3xl md:text-4xl font-medium" >Forgot Password?</h4>
                            <p className="text-center text-sm text-gray-600 mt-2">Enter the email address associated with your account.</p>
                        </div>
                        <InputGroup label="Email address">
                            <CustomInput autoComplete="on" inputClass="font-medium" type="email" />
                        </InputGroup>
                        <div className="flex flex-col justify-end items-end !mt-8">
                            <span className="mb-2 text-sm cursor-pointer font-medium">
                                <Link replace to="/login">
                                    Back to login?
                                </Link>
                            </span>
                            <Button type='submit' label="Continue" />
                        </div>
                    </Form>
                </div>
                <div className="w-full hidden md:w-1/2 bg-green-200 lg:w-[60%] md:flex h-full justify-center items-center">
                    <Images.ForgotPassword className="animate-bounce-slow w-auto md:w-[300px] lg:w-[400px] xl:w-[500px]" />
                </div>
            </div>
        </section>
    )
}

export default ForgotPassword