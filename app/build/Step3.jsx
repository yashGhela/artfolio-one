'use client'

import { useState } from "react"
import ErrorBlock from "../Components/ErrorBlock"

export default function Step3({setStep3, setStep4, setImage1, setImage2, setImage3, Image1, Image2, Image3}){

    const [errShow, setErrShow]= useState(false)
    const [errMessage, setErrMessage]=useState('')

  return(

    <div 
        data-te-perfect-scrollbar-init
        className=" mt-[10%] w-full md:w-[70%] h-[700px]  md:ml-[220px] rounded-xl overflow-auto">

                <ErrorBlock show={errShow} message={errMessage} setShow={setErrShow}/>
            <p className="text-2xl font-bold py-3 text-gray-300">Add your first 3 works</p>

            <div className="md:grid md:grid-cols-3 md:gap-4 flex-col p-2">
                <div>


               
               {Image1.img? 
                <img onClick={()=>{setImage1((prev)=>({...prev,img: null}))}} src={URL.createObjectURL(Image1.img)} alt="Uploaded Image" className=" w-fit cursor-pointer p-3 rounded-md h-[13rem]" />:

                <div className="flex items-center justify-center w-full h-[13rem] p-3">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-[100%]  rounded-lg cursor-pointer bg-gray-600   hover:bg-gray-700">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        
                        <p className="mb-2 mt-5 text-sm text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                        </svg>
                        </p>
    
                    </div>
                    <input onChange={(e)=>{setImage1((prev)=>({...prev,img: e.target.files[0]}))}} id="dropzone-file" type="file" accept="image/png, image/gif, image/jpeg" className="hidden" />
                </label>
    
                </div>
                }

            <input onChange={(e)=>{setImage1((prev)=>({...prev,name:e.target.value}))}} type="text"className="w-[90%] bg-gray-600 outline-none p-2 rounded-lg text-gray-400 font-bold" placeholder="title" />

            <textarea onChange={(e)=>{setImage1((prev)=>({...prev,desc:e.target.value}))}} className="w-[90%] bg-gray-600 outline-none p-2 rounded-lg text-gray-400 font-bold mt-2" cols="30" rows="5" placeholder="description"></textarea>

            <input onChange={(e)=>{setImage1((prev)=>({...prev,date:e.target.value}))}} type="date" className="w-[90%] bg-gray-600 outline-none p-2 rounded-lg text-gray-400 font-bold" placeholder="date" />

                </div>

                <div>


               
               {Image2.img? 
                <img onClick={()=>{setImage2((prev)=>({...prev,img: null}))}} src={URL.createObjectURL(Image2   .img)} alt="Uploaded Image" className=" w-fit cursor-pointer p-3 rounded-md h-[13rem]" />:

                <div className="flex items-center justify-center w-full h-[13rem] p-3">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-[100%]  rounded-lg cursor-pointer bg-gray-600   hover:bg-gray-700">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        
                        <p className="mb-2 mt-5 text-sm text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                        </svg>
                        </p>
    
                    </div>
                    <input onChange={(e)=>{setImage2((prev)=>({...prev,img: e.target.files[0]}))}} id="dropzone-file" type="file" accept="image/png, image/gif, image/jpeg" className="hidden" />
                </label>
    
                </div>
                }

            <input onChange={(e)=>{setImage2((prev)=>({...prev,name:e.target.value}))}} type="text"className="w-[90%] bg-gray-600 outline-none p-2 rounded-lg text-gray-400 font-bold" placeholder="title" />

            <textarea onChange={(e)=>{setImage2((prev)=>({...prev,desc:e.target.value}))}} className="w-[90%] bg-gray-600 outline-none p-2 rounded-lg text-gray-400 font-bold mt-2" cols="30" rows="5" placeholder="description"></textarea>

            <input onChange={(e)=>{setImage2((prev)=>({...prev,date:e.target.value}))}} type="date" className="w-[90%] bg-gray-600 outline-none p-2 rounded-lg text-gray-400 font-bold" placeholder="date" />

                </div>
                
                <div>


               
               {Image3.img? 
                <img onClick={()=>{setImage3((prev)=>({...prev,img: null}))}} src={URL.createObjectURL(Image3.img)} alt="Uploaded Image" className=" w-fit cursor-pointer p-3 rounded-md h-[13rem]" />:

                <div className="flex items-center justify-center w-full h-[13rem] p-3">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-[100%]  rounded-lg cursor-pointer bg-gray-600   hover:bg-gray-700">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        
                        <p className="mb-2 mt-5 text-sm text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                        </svg>
                        </p>
    
                    </div>
                    <input onChange={(e)=>{setImage3((prev)=>({...prev,img: e.target.files[0]}))}} id="dropzone-file" type="file" accept="image/png, image/gif, image/jpeg" className="hidden" />
                </label>
    
                </div>
                }

            <input onChange={(e)=>{setImage3((prev)=>({...prev,name:e.target.value}))}} type="text"className="w-[90%] bg-gray-600 outline-none p-2 rounded-lg text-gray-400 font-bold" placeholder="title" />

            <textarea onChange={(e)=>{setImage3((prev)=>({...prev,desc:e.target.value}))}} className="w-[90%] bg-gray-600 outline-none p-2 rounded-lg text-gray-400 font-bold mt-2" cols="30" rows="5" placeholder="description"></textarea>

            <input onChange={(e)=>{setImage3((prev)=>({...prev,date:e.target.value}))}} type="date" className="w-[90%] bg-gray-600 outline-none p-2 rounded-lg text-gray-400 font-bold" placeholder="date" />

                </div>

              
                
                
                </div>

                <button onClick={()=>{
                    if (
                        Image1.img !== null &&
                        Image1.name.trim() !== '' &&
                        Image1.desc.trim() !== '' &&
                        Image1.date.trim() !== '' &&
                        Image2.img !== null &&
                        Image2.name.trim() !== '' &&
                        Image2.desc.trim() !== '' &&
                        Image2.date.trim() !== '' &&
                        Image3.img !== null &&
                        Image3.name.trim() !== '' &&
                        Image3.desc.trim() !== '' &&
                        Image3.date.trim() !== ''
                    ) {
                        setStep3(false);
                        setStep4(true);
                    } else {
                        setErrMessage('Missing Fields or Images');
                        setErrShow(true);
                    }
                }} className="p-4 bg-pink-400 my-8 hover:bg-pink-600 rounded-xl w-[96%] text-white font-bold">Next</button>

    </div>
  )
}