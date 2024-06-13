import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PublicLayout from '../layout/PublicLayout'
import useRoute from '../hooks/useRoute'
import AuthLayout from '../layout/AuthLayout'
import NotFound from '../components/not-found'
import PrivateLayout from '../layout/PrivateLayout'

const Routing = ({ ...props }) => {

    const { publicRoutes, authRoutes, privateRoutes } = useRoute()

    return (
        <Routes {...props} >
            <Route path='/' element={<PublicLayout defaultAccess />}>
                {
                    publicRoutes?.map(({ id, ...data }) => <Route index key={id} {...data} />)
                }
            </Route>
            <Route path='/' element={<AuthLayout />}>
                {
                    authRoutes?.map(({ id, ...data }) => <Route index key={id} {...data} />)
                }
            </Route>
            <Route path='/' element={<PrivateLayout />}>
                {
                    privateRoutes?.map(({ id, ...data }) => <Route index key={id} {...data} />)
                }
            </Route>
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}

export default Routing