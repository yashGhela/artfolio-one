'use client'

import { useRouter } from "next/navigation"

export default function LandingAction(){
    const router = useRouter()
    return(
        <div className="my-[20%]">
             <p className='md:text-6xl text-3xl font-black text-gray-300'>Supercharge your career today</p>
             <p className='font-bold text-gray-400 text-lg mt-4 p-2 md:text-center'>Get started with Artfolio</p>
         

             <button onClick={()=>{router.push('/auth')}} className={`font-bold w-[40%] md:w-[25%] text-white text-xl rounded-xl bg-pink-400 hover:bg-pink-600 mt-20  md:h-14 p-2 mr-1`}>Start Now</button>
        </div>
    )
}