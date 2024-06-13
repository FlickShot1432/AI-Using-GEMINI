import * as Yup from "yup"

const validation = {
    login: Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])/, 'Must contain one uppercase, one lowercase')
            .matches(/^(?=.*[!@#$%^&*])/, 'Must contain one special character')
            .matches(/^.*[0-9]+.*$/, 'Must contain one number')
            .min(8, 'Must be longer than 8 characters')
            .max(32, 'Must not be longer than 32 characters')
    }),
    forgotPassword: Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required')
    })
}

export { validation }