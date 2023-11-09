

import Link from "next/link"
import { useRouter } from "next/navigation"
import { grabPro } from "../Common"
import { getCookie } from "cookies-next"
import { useState } from "react"
import Modal from "./Modal"
import ReactConfetti from "react-confetti"
import ConfettiExplosion from "react-confetti-explosion"



export  const  DashNav=({page, isPro, folio})=>{

    const [showModal, setShowModal]=useState(false)

    const [copied, setCopied]= useState(false)


    
    

    return(

        <div className="mt-5 bg-gray-900 flex w-[60%] ml-[20%] md:ml-0 md:w-full rounded-lg p-6">

            <p className=" text-gray-300 text-xl font-bold text-left mx-4">{page}</p>

            <div className="float-right ml-[30%] invisible md:visible">

            <Link href={'/Dashboard'} className=" cursor-pointer text-gray-400 text-xl font-normal text-left mx-4">Dashboard</Link>

           {/* {isPro?<Link href={'/Dashboard/Analytics'}  className=" cursor-pointer text-gray-400 text-xl font-normal text-left mx-4">Analytics</Link>:
            <Link href={'/Payment'}  className=" cursor-pointer text-pink-400 text-xl font-normal text-left mx-4">Analytics</Link>
            
            }

            {isPro?<Link href={'/Dashboard/Projects'}  className=" cursor-pointer text-gray-400 text-xl font-normal text-left mx-4">Projects</Link>:
        <Link href={'/Payment'}  className=" cursor-pointer text-pink-400 text-xl font-normal text-left mx-4">Projects</Link>}*/}

            <Link href={'/Dashboard/Settings'}  className=" cursor-pointer text-gray-400 text-xl font-normal text-left mx-4">Settings</Link>
            </div>

            <button onClick={()=>{setShowModal(true)}}   className={`  -mt-1 -mb-2 ml-[30%] p-2  rounded-lg font-bold text-gray-400 bg-gray-600 hover:bg-gray-700 `}>Share</button>

           <div>
           <Modal Header={'Share your portfolio'} showModal={showModal} setShowModal={setShowModal} thin={true} height={'h-[15%]'} >

            <div onClick={()=>{
                navigator.clipboard.writeText(`https://artfolio.space/${folio}`);
                setCopied(true);
                setTimeout(() => {
                    setCopied(false);
                }, 2500);
                   }} className=' flex bg-gray-700 md:w-[100%] font-semibold text-gray-400  mt-3 p-4 cursor-pointer text-left   rounded-md'>

                    

            <p>https://artfolio.space/{folio}</p>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-[30%]">
                
            <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 013.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0121 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 017.5 16.125V3.375z" />
            <path d="M15 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0017.25 7.5h-1.875A.375.375 0 0115 7.125V5.25zM4.875 6H6v10.125A3.375 3.375 0 009.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V7.875C3 6.839 3.84 6 4.875 6z" />
            </svg>

            {copied && <ConfettiExplosion />}




            </div>
         
       
            

           


            </Modal>

            

            
           </div>

        </div>



    )


}