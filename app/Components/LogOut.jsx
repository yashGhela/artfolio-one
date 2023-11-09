
'use client'
import { deleteCookie, getCookie } from "cookies-next";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../firebaseConfig"

export default function LogOut(){
    

  

    const router=useRouter()

    const logOut=()=>{
        signOut(auth).then(()=>{
          
          router.push('/')
          deleteCookie('useraidt')
          deleteCookie('folio')
          
        })
      }
      

    return(

        <button onClick={()=>{logOut()}} className="w-72 p-3 border border-gray-600 hover:bg-gray-600 text-gray-400 hover:text-gray-100 rounded-xl">Log Out</button>

    )
}