'use client'
import Link from "next/link"
import Pricing from "../Components/LandingPricing"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getCookie } from "cookies-next"
import { doc, setDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebaseConfig"



export default function Payment(){


  const user= getCookie('useraidt')

    const router =useRouter()

    useEffect(()=>{
      
        
      try{
        LemonSqueezy.Setup({
          eventHandler: async (event) => {

              
                 if (event.event==='Checkout.Success'){
                  await setDoc(doc(db,'Users',user,'SubscriptionDetails','sub'),{
                    data: event
                  }).then(async(snap)=>{
                    updateDoc(doc(db, 'Users', user), {
                      paid: true,
                     
                    }).then((snap)=>{
                
                      LemonSqueezy.Url.Close()
                      router.push('/Dashboard')
                    })
          
                  })
                 }
          }
        })
      }catch(error){
        console.log(error)
      
      }
      }
        
  ,[])
    //Code here works 


   



   

  

    return(
        <main className=' flex self-center place-content-center  bg-gray-800 text-center p-5 max-w-full min-w-screen  min-h-screen max-h-full overflow-hidden '>
          <script src="https://app.lemonsqueezy.com/js/lemon.js" defer></script>
            <header>
                <title>Payments</title>
                <script src="https://assets.lemonsqueezy.com/lemon.js" defer></script>
            </header>

            <div className=' md:w-[70rem] lg:w-[80rem] w-[25rem] mr-0 flex-col'>


            <Pricing/>

            
           <div className="mt-[5%] flex-col">
           <Link href='/PrivacyPolicy' className='text-gray-500 mt-4  cursor-pointer underline'>Privacy Policy</Link><br/>
           <Link href='/TermsAndConditions'  className='text-gray-500 mt-4  cursor-pointer underline'>Terms and Conditions</Link> 
           </div>
            </div>

        </main>
    )
}