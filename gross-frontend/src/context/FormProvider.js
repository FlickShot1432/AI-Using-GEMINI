import React, { useState } from 'react'
import FormContext from './form'

const FormProvider = ({ children }) => {
    const [value, setValue] = useState([])
    return <FormContext.Provider value={{ value, setValue }} >
        {children}
    </FormContext.Provider>
}

export default FormProvider