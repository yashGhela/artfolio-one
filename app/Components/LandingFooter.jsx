
import Link from "next/link"
import { SmoothScrollLink } from "./SmoothScrollLink"



export default function LandingFooter(){


    return(

        <div className="mt-[10%]">
            <hr />
            
            <div
              className=' mt-[50px] mb-[50px] flex-col md:grid md:grid-cols-2 '
              >
        
            <div>
            <p className="font-bold text-gray-400 py-3 ">Legal</p>
            <Link scroll={true} href='/PrivacyPolicy'    className='text-gray-400 hover:underline  py-3 cursor-pointer'>Privacy Policy</Link><br/>
            <Link href='/TermsAndConditions'  className='text-gray-400 hover:underline  py-3 cursor-pointer'>Terms and Conditions</Link>
            </div>

            <div>
            <p className="font-bold text-gray-400 py-3 flex-col ">Links</p>
            <SmoothScrollLink to='features' >Features</SmoothScrollLink><br/>
             <SmoothScrollLink to='pricing' >Pricing</SmoothScrollLink><br/>
            <SmoothScrollLink to='How-it-works'  >How it works</SmoothScrollLink><br/>
            </div>
               

                

                </div>

                <p className="font-bold text-gray-400 py-3 ">Made by Yash Codes</p>


        </div>
    )
}