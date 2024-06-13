import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import control from "../../assets/images/control.png"
import { Icons } from "../../assets";
import { SocketContext } from '../../context/socket';


const SideBar = () => {
    const [history, setHistory] = useState([]);
    const socket = useContext(SocketContext);
    const [open, setOpen] = useState(true);
    const [hoverIndex] = useState(null);


    const Menus = [
        { title: "Setting", ICON: Icons.Settings },
        { title: "Logout", ICON: Icons.Close },
    ];

    useEffect(() => {
        const handleMessages = (data) => {
            setHistory((history) => [...history, data])
            console.log('data', data)

        }
        socket.on('message', handleMessages)

        return () => {
            socket.off('message', handleMessages);
        };
    }, [socket])

    console.log('history', history)

    return (
        <div>
            <div className="flex">
                <div className={` ${open ? "w-72" : "w-20 "} bg-black h-screen p-5 pt-6 relative duration-300`}>
                    <img alt="profile_image" src={control} className={`absolute cursor-pointer -right-3 top-7 w-7 border-dark-purple border-2 rounded-full z-50 ${!open && "rotate-180"}`} onClick={() => setOpen(!open)} />
                    <div className="flex gap-x-4 items-center">
                        <img
                            alt="profile_image"
                            src="https://img.mbiz.web.id/180x180/erp/R2p1IXoyVEpBMk01WOEAdaI3hHVlkuIg0wW5_pn-CJCKHSrA_n1-U1tfE7Bl5H4_4Z7AxgL0DPOmUCdPuCHHC5lWvMU5Ig3t1uDrkVN53MlWlnA"
                            className={`h-[40px] cursor-pointer duration-500 ${open && "rotate-[360deg]"
                                }`}
                        />
                        <h1
                            className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"
                                }`}
                        >
                            AdeCodes
                        </h1>
                    </div>
                    <div className='flex justify-center items-center text-white'>
                        <ul>
                            {history.map((item, index) => (
                                <li key={index} style={{ textAlign: 'left', borderBottom: "1px solid black" }}>
                                    <p>{item.receive}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <ul className="pt-6 absolute bottom-[25px] w-4/5" >
                        {Menus.map((Menu, index) => (
                            <li
                                key={index}
                                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-gray text-gray-300 text-sm items-center gap-x-4 
                                             ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"} hover:bg-white hover:text-black `}
                            >
                                {/* Change color of SVG icon based on hover state */}
                                {Menu.ICON && (
                                    <Menu.ICON
                                        style={{ fill: hoverIndex === index ? "yourHoverColor" : "currentColor" }}
                                    />
                                )}

                                <span className={`${!open && "hidden"} origin-left duration-200 `}>
                                    {Menu.title}
                                </span>

                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default SideBar
