'use client'

import { doc, getDoc, updateDoc } from "firebase/firestore"
import Link from "next/link"
import { useEffect, useState } from "react"
import { db } from "../firebaseConfig"
import { getCookie } from "cookies-next"
import ErrorBlock from "./ErrorBlock"

export default function CustomDomain(){

    const [customDomain, setCustomDomain]=useState('')

    const [domainExists, setDomainExists]=useState(false)

    const [errShow, setErrorShow]=useState(false)

    const [errmessage, setErrMessage]=useState('')

  
    

    const user= getCookie('useraidt')

    const ref=doc(db,'Users',user,'Configs','BaseConfig')

    const checkDomain=async()=>{

        await getDoc(ref).then((snap)=>{
            if (snap.data().customDomain){

                setDomainExists(true);
                setCustomDomain(snap.data().customDomain)

            } 
        })
    }



    const addDomain=async()=>{

      
        const myref= doc(db,'Users',user)

        await updateDoc(myref,{
            customDomain
        }).then(()=>{
            setDomainExists(true)
        })
      
    }

    useEffect(()=>{

        checkDomain()
        


    })


    return(
        <div className=" p-5 w-[50%] md:ml-[25%] h-62 bg-gray-900 rounded-xl">

          

            <div className="flex mb-6 mt-2">
          

            <p className="text-left ml-16 text-gray-300 font-bold  text-lg">Custom Domain</p>
            
            </div>

           
           
           <div>

            <div className="w-[80%] ml-14">
            <input defaultValue={customDomain}  placeholder="leodavinci.com" className="w-[70%] bg-gray-600 outline-none p-2 mt-2 rounded-lg text-gray-400 font-bold" onChange={(e)=>{setCustomDomain(e.target.value)}} type="text"/>

            <button onClick={()=>{addDomain()}} className={`w-[20%] ml-2 p-2  rounded-lg font-bold text-white bg-pink-400 hover:bg-pink-600 `}>Save</button>

            </div>
            {domainExists?null:

            <Link href={'/Help/Config-Domains'} className='text-md my-3 text-left p-3 rounded-xl flex w-[74%]  bg-gray-700 cursor-pointer ml-[4.6rem] font-normal text-gray-400 '>Please ensure your domain's CNAME records are correctly setup before setting your Custom Domain.

            <span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6   cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
            </span>
            
            </Link>}

            

            
            </div>
           



        </div>

    )
}