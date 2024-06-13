import React from 'react'
import TopBar from '../../../components/topbar'
import SideBar from '../../../components/sidebar'
import ContentForm from "../../../components/contentForm"
import { useState } from 'react';


const Dashboard = ({ ...props }) => {
    const [uploadedImages, setUploadedImages] = useState([]);
    return (
        <div className='w-full flex' >
            <SideBar />
            <section className='w-full relative flex flex-col justify-start' >
                <TopBar />
                <ContentForm {...{ setUploadedImages, uploadedImages }} />
                {/* <ImageUpload uploadedImages={uploadedImages} setUploadedImages={setUploadedImages} /> */}
            </section>
        </div>
    )
}

export default Dashboard