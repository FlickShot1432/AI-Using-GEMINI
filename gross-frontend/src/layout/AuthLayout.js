import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import withAuth from '../hoc/withAuth'

const AuthLayout = ({ ...props }) => {
    return <WithAuthLayout {...props} replace {...{ to: '/dashboard' }} />
}

export default AuthLayout

const WithAuthLayout = withAuth(Outlet, Navigate)