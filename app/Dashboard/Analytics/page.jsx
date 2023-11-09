'use client'

import { grabPro, withAuth } from "../../Common";
import { DashNav } from "../../Components/DashNav";
import { analytics } from "../../firebaseConfig";
import { Chart, registerables } from "chart.js";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import LandingFeatures from "../../Components/LandingFeatures";

Chart.register(...registerables);

 function Analytics(){

    const [isPro, setIsPro]=useState(false)

    const user = getCookie('useraidt')

    const userfolio= getCookie('folio')

 



    useEffect(()=>{

        
         grabPro({user:user, setisPro: setIsPro})

 
    
        
    

        

    },[])



    return(
        <div>
        <header>
           <title>Analytics</title>
         </header>
         <main className=' flex self-center place-content-center  bg-gray-800 text-center p-5 max-w-full min-w-screen  min-h-screen max-h-full overflow-hidden'>
     
   

     <div className=' md:w-[70rem] lg:w-[80rem] w-[40rem] mr-0 flex-col'>


        <DashNav folio={userfolio} page={'Analytics'} isPro={isPro}/>

        <div className="w-full mt-30 flex-col   ">
       

        <div class="min-h-screen flex items-center justify-center bg-gradient-radial from-pink-400 via-gray-800  to-gray-800">
    <div class=" p-6 rounded-lg text-center">
        <p class="text-2xl md:text-3xl text-gray-100 font-semibold">This Feature is currently in Development</p>
    </div>
</div>







     
                




          
               



           



        </div>


        </div>
        </main>
        </div>
    )
}

export default withAuth(Analytics)