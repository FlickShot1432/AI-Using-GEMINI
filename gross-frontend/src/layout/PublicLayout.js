import React from 'react'
import { Outlet } from 'react-router-dom'

const PublicLayout = ({ defaultAccess, ...props }) => {
    return <section>
        {defaultAccess ? <Outlet {...props} /> : null}
    </section>
}

export default PublicLayout