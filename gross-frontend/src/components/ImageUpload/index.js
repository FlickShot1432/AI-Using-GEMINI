import React from 'react';
import { useDropzone } from 'react-dropzone';
import closeIcon from "../../assets/icons/solid/x-circle-fill.svg";


const ImageUpload = ({ uploadedImages, setUploadedImages }) => {
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFiles) => {
            const updatedImages = acceptedFiles.map((file) => ({
                file,
                preview: URL.createObjectURL(file),
            }));
            setUploadedImages([...uploadedImages, ...updatedImages]);
        },
    })

    const removeImage = (index, e) => {
        const updatedImages = [...uploadedImages];
        updatedImages.splice(index, 1);
        setUploadedImages(updatedImages);
    };
    return (
        <div className='main w-full p-'>
            <div {...getRootProps()} className="dropzone w-full">
                <input {...getInputProps()} />
                <p className='dropzone m-auto max-w-full border-dashed border-[2px] border-white-600 p-[20px] mt-[10px] cursor-pointer'>Drag 'n' drop images here, or click to select images</p>
            </div>
            <div className="uploaded-images m-auto mt-[16px] border-solid border-[1px] border-white-600 w-[50%] flex items-center justify-center flex-wrap">
                {uploadedImages?.map((image, index) => (
                    <div key={index} className="uploaded-image relative">
                        <img className="images m-2 w-[200px] h-[120px]" src={image.preview} alt={` ${index}`} />
                        <button
                            onClick={(e) => removeImage(index, e)}
                            className="remove-button -top-[4px] -right-[4px]  bg-none border-none absolute  cursor-pointer"
                        >
                            {/* <img src={Icons.CloseImage} alt="Close" /> */}
                            {/* <Icons.CloseImage /> */}
                            <img src={closeIcon} alt="Close" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ImageUpload