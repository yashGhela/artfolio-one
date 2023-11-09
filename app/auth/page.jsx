

import Head from "next/head"
import Auth from "../Components/Auth"
import SEO from "../Components/SEO"
import { usePathname } from "next/navigation"
//import { auth } from "../firebaseConfig"

export default function AuthPage() {
    
  //const user= auth.currentUser

  

    


  return (
    <div className={`md:scale-110 flex self-center place-content-center  bg-gray-800 text-center p-5 max-w-full min-w-screen  min-h-screen max-h-full overflow-hidden`}>

    <SEO title={'Sign In'}/>
   <Auth/>
   </div>
  )
}