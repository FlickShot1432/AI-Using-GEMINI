import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import withUser from '../hoc/withUser'

const PrivateLayout = ({ ...props }) => {
    return <WithUserLayout {...props} replace {...{ to: '/login' }} />
}

export default PrivateLayout

const WithUserLayout = withUser(Outlet, Navigate)