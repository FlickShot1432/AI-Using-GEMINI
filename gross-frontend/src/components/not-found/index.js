import React from 'react'
import { classNames } from '../../utils/functions'
import { Images } from '../../assets'

const NotFound = ({ className, ...props }) => {
    return (
        <section className={classNames('w-full h-screen bg-white p-4', className)} {...props} >
            <div className='w-full flex items-center justify-center' >
                <Images.NotFound className='animate-bounce-slow xs:w-4/5 sm:w-1/2 md:w-1/3 lg:w-1/4' />
            </div>
        </section>
    )
}

export default NotFound