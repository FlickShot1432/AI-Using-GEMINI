import { useMemo } from 'react'
import { PAGES } from '../utils/urls'
import Login from '../containers/auth/login'
import ForgotPassword from '../containers/auth/forgot-password'
import Dashboard from '../containers/admin/dashboard'
const useRoute = () => {

    const routes = useMemo(() => [
        {
            ...PAGES.AUTH.ROOT_LOGIN,
            element: <Login />,
            isAuth: true
        },
        {
            ...PAGES.AUTH.LOGIN,
            element: <Login />,
            isAuth: true
        },
        {
            ...PAGES.AUTH.FORGOT_PASSWORD,
            element: <ForgotPassword />,
            isAuth: true
        },
        {
            ...PAGES.DASHBOARD.BOARD,
            element: <Dashboard />,
            isPrivate: true
        }
    ], [])

    const authRoutes = useMemo(() => routes.filter(val => val?.isAuth), [routes])
    const publicRoutes = useMemo(() => routes.filter(val => val?.isPublic), [routes])
    const privateRoutes = useMemo(() => routes.filter(val => val.isPrivate), [routes])

    return {
        routes, authRoutes, publicRoutes, privateRoutes
    }
}

export default useRoute