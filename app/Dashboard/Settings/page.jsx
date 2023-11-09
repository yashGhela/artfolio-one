'use client'

import Link from "next/link";
import { grabPro, withAuth } from "../../Common";
//import { auth } from "../firebaseConfig"

import CancelSub from "../../Components/CancelSub";
import CustomDomain from "../../Components/CustomDomain";
import { DashNav } from "../../Components/DashNav";
import ErrorBlock from "../../Components/ErrorBlock";
import HelpButton from '../../Components/HelpButton'
import LogOut from "../../Components/LogOut";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";





 function Settings(){

  


    const [isPro, setIsPro]=useState(false)

    const user = getCookie('useraidt')

    const userfolio= getCookie('folio')

    useEffect(()=>{

        
      grabPro({user:user, setisPro: setIsPro})

 
     
 

     

 },[])

  
 
    return(
        <div>
        <header>
           <title>Settings</title>
         </header>
         <main className=' flex self-center place-content-center  bg-gray-800 text-center p-5 max-w-full min-w-screen  min-h-screen max-h-full overflow-hidden'>

     
     
   

     <div className=' md:w-[70rem] lg:w-[80rem] w-[40rem] mr-0 flex-col'>
     <DashNav folio={userfolio} page={'Settings'} isPro={isPro}/>

    {/*

     <div className="mt-20">

      {isPro?<CustomDomain/>:null}
     </div>

     */
    }

    <div className="mt-20 flex-col p-4 ">

    <div className="flex-col p-4 ">
    <Link className="float-left underline text-gray-400" href='/Privacy Policy'>Privacy Policy</Link><br/>
     
     <Link className="mt-5 float-left underline text-gray-400 " href='/TermsAndConditions'>Terms & Conditions</Link>
    
    </div>


      <div className=" mt-20 float-left -ml-[10rem] ">
 
      <LogOut/>
      
      </div>

    </div>

      {/*

      <div  className="mt-10 ">
     {isPro? <CancelSub/>:null}
      
      </div>
      */
      
    }

      <HelpButton />




        </div>
   
        
        
        
      </main>
     </div>
    )
}

export default withAuth(Settings)