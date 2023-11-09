import Link from "next/link";
import { SmoothScrollLink } from "./SmoothScrollLink";

export default function LandingBar(){
    return(
        <div className={`flex ml-2  md:w-[90%] sm:w-full  md:ml-[25%] lg:ml-[13%]   h-14 rounded-md mt-0 text-center`}>
        
      
        <p className={` text-pink-400 font-bold ml-[10%] md:ml-5 mt-4`}>Artfolio </p>
      
     
      <div className='mt-4 md:ml-[20%] -ml-52  flex'>
      <SmoothScrollLink to='features' >Features</SmoothScrollLink>
        <SmoothScrollLink to='pricing' >Pricing</SmoothScrollLink>
       
        
       </div>

       <div className="flex mt-4 md:ml-[10%] lg:ml-[25%] ml-28 sm:ml-28 ">
       <Link href='/auth' className={`p-3 h-8 w-16 ml-1  md:ml-8 mt-0 pt-1 bg-pink-400 hover:bg-pink-600 font-bold shadow-lg shadow-pink-500 text-white rounded-md`}>Join</Link>
        <Link href='/auth?state=Login'  className={`p-3 h-8 w-16 ml-2 md:ml-4 mt-0 pt-1  hover:bg-gray-800 font-bold text-gray-400 hover:text-gray-100 rounded-md`}>Login</Link>
       </div>

      
      
       


</div>
    )
}