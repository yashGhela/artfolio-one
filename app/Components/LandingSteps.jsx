'use client'

import { useRouter } from "next/navigation"

export default function LandingSteps(){

    const router = useRouter()
    return(
        <div className="mt-[10%] flex-col">
            <p className="text-gray-400 text-2xl font-bold">How does it work?</p>

            <div className="mt-20 p-10  md:ml-[8%]  md:flex rounded-xl ">
                <img className="h-96 w-96   rounded-xl" src="https://firebasestorage.googleapis.com/v0/b/artfolio-one.appspot.com/o/Resources%2Fgif1.gif?alt=media&token=7b146420-6027-4ec9-abf3-c3a4f1910fd2" alt="" />
                <div className="md:ml-20 mt-20 text-left">
                <p className="text-3xl text-pink-400  font-bold">1. Pick a color scheme</p>
                <p className='font-normal text-gray-400 mt-10 p-2 '>Choose from over 50 different color schemes, all with unique and different color combinations to make your site pop!</p>
                </div>

            </div>

            <div className="mt-20 p-10  md:ml-[8%]  md:flex rounded-xl ">
                
                <div className="md:mr-20 mt-20 text-left">
                <p className="text-3xl text-pink-400  font-bold">2. Choose a font</p>
                <p className='font-normal text-gray-400 mt-10 p-2 '>Choose from over 20+ font options, to find one that speaks your voice and harmonizes with your art </p>
                </div>
                <img className="h-96 w-96 rounded-xl" src="https://firebasestorage.googleapis.com/v0/b/artfolio-one.appspot.com/o/Resources%2Fgif2.gif?alt=media&token=89ffe5bb-aac4-40cd-9861-2f970649cb88" alt="" />

            </div>

            <div className="mt-20 p-10  md:ml-[8%]  md:flex rounded-xl ">
                <img className="h-96 w-96 rounded-xl" src="https://firebasestorage.googleapis.com/v0/b/artfolio-one.appspot.com/o/Resources%2Fgif3.gif?alt=media&token=09a2fb76-d13e-493c-98ba-037a27c8b33e" alt="" />
                <div className="md:ml-20 mt-20 text-left">
                <p className="text-3xl text-pink-400  font-bold">3. Share a few works</p>
                <p className='font-normal text-gray-400 mt-10 p-2 '>Upload a couple of your best works to start off with and display to your viewers, don't forget to add more later 😉</p>
                </div>

            </div>
            <div className="mt-20 p-10  md:ml-[8%]  md:flex rounded-xl ">
                
                <div className="md:mr-20 mt-20 text-left">
                <p className="text-3xl text-pink-400  font-bold">4. Tell your viewers about yourself</p>
                <p className='font-normal text-gray-400 mt-10 p-2 '>Write your About section, add any contact or social media links and let visitors learn a bit about you</p>
                </div>
                <img className="h-96 w-96   rounded-xl" src="https://firebasestorage.googleapis.com/v0/b/artfolio-one.appspot.com/o/Resources%2Fgif4.gif?alt=media&token=47977f29-96c3-40a1-992b-2d5a0646bdc6" alt="" />

            </div>

            <button onClick={()=>{router.push('/auth')}} className={`font-bold w-[40%] md:w-[25%] text-white text-xl rounded-xl bg-pink-400 hover:bg-pink-600 mt-20  md:h-14 p-2 mr-1`}>Start Now</button>
        </div>
    )
}