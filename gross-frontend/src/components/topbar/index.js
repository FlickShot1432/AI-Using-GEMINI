import React from 'react'
import { Icons } from "../../assets";



const TopBar = () => {
    return (
        <div className='w-full h-20 px-6 py-8 bg-gray-50 flex justify-between items-center' >
            <div>2</div>
            <div><Icons.NotificationBell /></div>
        </div>
    )
}

export default TopBar