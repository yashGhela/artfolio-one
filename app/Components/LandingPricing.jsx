'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


export default function Pricing({landing}){

   

    const router= useRouter()

    const [yearly, setYearly]= useState(false)
    

    const handleFree=async()=>{
        router.push('/Dashboard')
    }


   

    const benefits=[
        'SEO',
        'No Customization',
        'Live Site',
        'Art protection'
        
    ]

    const benefitspro=[
        'SEO',
        'Infinite Customization',
        'Live Site',
        'Art protection',
        
        'Custom Image Rounding',
        'Customize Color Schemes',
        'Personalized Fonts',
        'No Watermark'

    ]


 

    return(

        <div className="mt-[7%] flex-col" >

        
           

            <p className="text-gray-400 text-2xl font-bold">Pricing</p>
           {/* <button className="mt-5 p-2 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-xl" onClick={()=>{if (yearly){setYearly(false)}else{setYearly(true)}}}>{yearly? "Monthly" : "Yearly" }</button> */}

            <div className="md:grid md:grid-cols-2 flex-col mt-20">

            

                <div className="md:w-[70%] w-full md:ml-40 rounded-xl h-[35rem] shadow-2xl ">

                    <p className='font-bold text-xl text-left text-gray-300 mt-4 p-6 '>Starter</p>

                    <p className='font-bold text-6xl text-center text-gray-300 mt-4 p-6 '>Free</p>
                    <div className="mt-10 ml-20">
                        {benefits.map((i)=>{
                            return(
                                <span key={null} className="flex mt-7 text-gray-300" >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-3">
                                        <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                                        </svg>
                                        <p className='font-normal text-md text-left text-gray-300  '>{i}</p>

                                    </span>
                            )
                        })}

                    


                    </div>
                    {landing?
                    <button onClick={()=>{router.push('/auth')}} className=" w-[90%] mt-10 font-bold text-white p-5 rounded-xl bg-gray-600 hover:bg-gray-700 ">
                   
                    Start Now!
                    </button>:

                    <button onClick={()=>{handleFree()}} className=" w-[90%] mt-10 font-bold text-white p-5 rounded-xl bg-gray-600 hover:bg-gray-700 ">
                                    
                    Continue on this plan
                    </button>
                    
                    }
                </div>

                

                <div className="md:w-[70%] mt-10 md:mt-0 md:ml-20 w-full rounded-xl h-[51rem] shadow-2xl shadow-pink-700 border-[3px] border-pink-500 ">

                <p className='font-bold text-sm mt-3  text-gray-100  py-2 w-20 text-center bg-pink-500 ml-[40%] rounded-md   '>Popular</p>

                

                    <p className='font-bold text-2xl text-left text-gray-300  p-6 '>Pro</p>

                    {/*{yearly ? <p className='font-bold text-6xl text-center text-transparent bg-gradient-to-r from-pink-700 to-purple-700 bg-clip-text mt-4 p-6 '>$35<span className='font-normal text-transparent text-xl bg-clip-text md:text-[30px] bg-gradient-to-r from-pink-400 to-purple-400 mt-2'>/year</span></p>: <p className='font-bold text-6xl text-center text-transparent bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text mt-4 p-6 '>$4<span className='font-normal text-transparent text-xl bg-clip-text md:text-[30px] bg-gradient-to-r from-pink-400 to-purple-400 mt-2'>/month</span></p> }*/}

                    <p className='font-bold text-6xl text-center text-transparent bg-gradient-to-r from-pink-700 to-purple-700 bg-clip-text mt-4 p-6 '>$9<span className='font-normal text-transparent text-xl bg-clip-text md:text-[30px] bg-gradient-to-r from-pink-400 to-purple-400 mt-2'>/once off</span></p>
                    <div className="mt-10 ml-20">
                        {benefitspro.map((i)=>{
                            return(
                                <span key={null} className="flex mt-7 text-gray-300" >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-3">
                                        <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                                        </svg>
                                        <p className='font-normal text-md text-left text-gray-400  '>{i}</p>

                                    </span>
                            )
                        })}

                    


                    </div>
                   {landing?
                    <button onClick={()=>{router.push('/auth')}} className=" w-[90%] mt-10 font-bold text-white p-5 rounded-xl bg-pink-400 hover:bg-pink-600 ">
                   
                    Start Now!
                    </button>:
                   <div> <button  className=" w-[90%] mt-10 font-bold text-white p-5 rounded-xl bg-pink-400 hover:bg-pink-600 ">
                   <a href="https://artfolio.lemonsqueezy.com/checkout/buy/7889771e-f20a-4d17-a2d3-e0e7811e39a0?embed=1" class="lemonsqueezy-button">Buy Artfolio Pro</a><script src="https://assets.lemonsqueezy.com/lemon.js" defer></script>
                      </button>
                      <p className="text-sm font-ligt text-gray-400">If the payment modal is not loading, please reload the page</p>
                    </div>
                    }
                </div>
            </div>

        </div>
    )
}