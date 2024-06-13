import React, { useCallback, useContext, useEffect, useState } from 'react'
import { api } from "../../api";
import { useFormik } from "formik";
import { SocketContext } from '../../context/socket';
import FormContext from '../../context/form';
import { Icons } from "../../assets";
import ImageUpload from '../ImageUpload'


const room = "1234";

const ContentForm = ({ uploadedImages, setUploadedImages }) => {

    const socket = useContext(SocketContext)
    const { value, setValue } = useContext(FormContext);

    console.log('value', value)

    const [configuration, setConfiguration] = useState({
        isLoading: false,
        data: null,
        error: null
    })

    console.log('uploadedImages', uploadedImages)

    const [box, setBox] = useState({
        question: false,
        answer: false
    })
    const [prompt, setPrompt] = useState("");
    const [showImageUpload, setShowImageUpload] = useState(false);

    const { errors, handleChange, handleSubmit, values } =
        useFormik({
            initialValues: {
                prompt: "",
                images: "",
            },
            onSubmit: async (values) => {
                await handleApi(values);
            },
        });


    const submitHandler = async (e) => {
        e.preventDefault();
        await handleApi();
    };


    useEffect(() => {
        socket.on("message", (item) => {
            console.log('message', item);
        });
    }, []);

    const handleApi = useCallback(async () => {
        try {
            setBox({ ...box, question: true })
            setPrompt("")
            setConfiguration({
                ...configuration, isLoading: true
            })
            const formData = new FormData()
            if (uploadedImages.length > 0) {
                for (let i = 0; i < uploadedImages.length; i++) {
                    formData.append("images", uploadedImages[i].file)
                }
            }
            formData.append("prompt", prompt)
            const response = await api.gemini.generate(formData)
            if (response) {
                setBox({ question: true, answer: true })
            }
            setConfiguration({
                ...configuration, isLoading: false, data: response?.data?.data
            })
            setValue([...value, {
                send: prompt,
                receive: response?.data?.data
            }])
            socket.emit('task_creation', { send: prompt, receive: response?.data?.data, id: room });
        } catch (error) {
            setConfiguration({
                ...configuration, error: error, isLoading: false
            })

        }
    }, [box, configuration, prompt, setValue, socket, uploadedImages, value])

    const handleAttachClick = () => {
        setShowImageUpload(true);
    };

    return (
        <>{
            box.question && value.map((data, index) => (
                <div className='flex justify-end items-end mx-4 mt-[20px]'>
                    <div className='w-max h-10px px-[20px] py-[14px] bg-[#B4B4B8] flex rounded-lg'>


                        <section className="App-response max-w-full flex align-right" key={index}>
                            {data.send}
                        </section>
                    </div>

                </div>
            ))}
            {console.log("box.answer", box.answer)}
            {box.answer && value.map((data, index) => (
                <div className=' w-max h-10px px-[20px] py-[17px] bg-[#B4B4B8] flex rounded-lg mx-4'>
                    <section className="App-response" key={index}>
                        {configuration.isLoading && <p>Generating your content Please Wait</p>}
                        {configuration.error && <p>{configuration.error.message}</p>}
                        {data.receive && <p>{data.receive}</p>}
                    </section>
                </div>
            ))
            }
            <form className="w-full flex flex-col-reverse p-4 justify-center items-center absolute bottom-0" onSubmit={submitHandler}>
                <div className="relative w-full">
                    <input
                        type="text"
                        id="prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Write a content about..."
                        className="App-input w-full p-4 pl-16 border-solid border-[1px] border-white-600 rounded-[50px]"
                    />
                    <Icons.Attach
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500 cursor-pointer"
                        onClick={handleAttachClick}
                    />
                    <div className='button w-[40px] h-[40px] bg-[#C2C2C2] rounded-[50%]  absolute right-[0.6rem] top-1/2 transform -translate-y-1/2  text-gray-500 flex items-center  justify-center'>
                        <button>
                            <Icons.UpArrow />
                        </button>
                    </div>
                </div>
                {showImageUpload && <ImageUpload {...{ setUploadedImages, uploadedImages }} onClose={() => setShowImageUpload(false)} />}
            </form>
        </>
    )
}

export default ContentForm