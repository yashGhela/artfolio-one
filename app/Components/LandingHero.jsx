'use client';
import {motion} from 'framer-motion'
import { useRouter } from 'next/navigation';
import TestimonialAvatars from './TestimonialAvatars';
import LogoFeature from './LogoFeature';
import TestimonialBar from './TestimonialBar';


export default function LandingHero(){

    const site = Math.floor(Math.random() * 20)

    const router=useRouter()
    return(
        <motion.div 
        className='mt-20 ml-10 md:items-center items-center text-left p-5  md:grid md:grid-cols-2 flex-col '
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false  }}
      
       
       > 
          

        <div>

        <p className='font-normal text-gray-500 text-md mt-4 p-2 md:text-left'>Last site built {site} minutes ago </p>

        <a href="https://www.producthunt.com/posts/artfolio?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-artfolio" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=423767&theme=light" alt="Artfolio - Build&#0032;a&#0032;professional&#0032;art&#0032;portfolio&#0032;in&#0032;5&#0032;minutes | Product Hunt" style={{width: '250px', height: '54px'}}  /></a>
             
        <p className={`text-transparent mt-7 text-4xl md:text-5xl bg-clip-text pb-3  bg-gradient-to-r from-pink-700 to-purple-700 font-black text-gray-700`}>Build a professional Portfolio in 5 minutes</p>
         
         <p className='font-lighter text-gray-400 text-lg mt-4 p-2 md:text-left'>Artfolio let's you build an art portfolio in 5 minutes with no confusing editors or coding knowledge required</p>
         
          
    
        <div className="flex  w-full mt-5 ">
        <motion.button whileHover={{scale:1.2}} onClick={()=>{router.push('/auth')}} className={`font-bold shadow-lg  shadow-pink-700 w-[40%] md:w-[25%] text-white text-xl rounded-xl bg-pink-400 hover:bg-pink-600 mt-5  md:h-14 p-2 mr-1`}>Start Now</motion.button>
        <button onClick={()=>{router.push('/auth?state=Login')}} className='font-normal w-[40%] md:w-[60%] text-gray-400 text-xl rounded-md text-left mt-6 ml-10 underline  md:h-14 p-2 mr-1'>Log In</button>

 


        </div>
        <div className='mt-10'>
       <TestimonialBar/>

       
       </div>
        </div>

        <div>
        <div
        style={{backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/artfolio-one.appspot.com/o/Resources%2FScreenshot%202023-11-08%20143723.png?alt=media&token=597c7111-4833-4a22-95d4-03e834ca4009)'}}
        class="relative mx-auto bg-cover border-gray-900 md:visible invisible  bg-gray-900 border-[14px] rounded-[2.5rem] h-[700px] w-[360px]">
                <div class="h-[32px] w-[3px] bg-gray-900  absolute -left-[17px] top-[72px] rounded-l-lg"></div>
                <div class="h-[46px] w-[3px] bg-gray-900  absolute -left-[17px] top-[124px] rounded-l-lg"></div>
                <div class="h-[46px] w-[3px] bg-gray-900  absolute -left-[17px] top-[178px] rounded-l-lg"></div>
                <div class="h-[64px] w-[3px] bg-gray-900  absolute -right-[17px] top-[142px] rounded-r-lg"></div>
              
        {/*<iframe  src={`/leodavinci`} className="w-full h-full border-none rounded-[2rem]"></iframe>*/}
                </div>

                <button onClick={()=>{window.open('https://artfolio.space/leodavinci')}} className='p-4 bg-gray-600 text-gray-300 rounded-lg hover:bg-gray-700  md:ml-56 mt-4'>Check it Out</button>
        </div>
         
        
        </motion.div>   
    )
}