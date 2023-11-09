'use client'


import LandingBar from './Components/LandingBar'
import LandingHero from './Components/LandingHero'

import LandingSteps from './Components/LandingSteps'
import LandingFeatures from './Components/LandingFeatures'
import LandingVideo from './Components/LandingVideo'
import Modal from './Components/Modal'

import Interest from './Components/Interest'
import LandingAction from './Components/LandingAction'
import LandingFooter from './Components/LandingFooter'
import LandingFaq from './Components/LandingFaq'
import Pricing from './Components/LandingPricing'
import SEO from './Components/SEO'
import { useEffect } from 'react'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import LogoFeature from './Components/LogoFeature'
import { Element } from 'react-scroll'




export default function Home() {
  
  const router=useRouter()
  const user = getCookie('useraidt')

  useEffect(()=>{

    if (user){
        router.push('/Dashboard')
    }

},[])


  return (

    
    
  <div style={{scrollBehavior:'smooth'}}>
    
      <main className=' flex self-center place-content-center  bg-gray-800 text-center p-5 max-w-full min-w-screen  min-h-screen max-h-full overflow-hidden '>
      <SEO 
       title={'Build a Portfolio in 5 minutes | Artfolio'}
       description={'Build a stunning, clean portfolio in 5 minutes and supercharge your career to the next level. Built with Analytics tools, SEO optomization, and tons of customization '}
       keywords={'Porfolio, art, art portfolios, how to build a portfolio, artfolio, nitron, Artfolio, quick, portfolios, Artfolio portfolios, Analytics, Easy art portfolio builder, art portfolio builder, web builder, websites, website builder, portfolio builder '}
       />
    
   

     <div className=' md:w-[70rem] lg:w-[80rem] w-[25rem] mr-0 flex-col'>

      
     <LandingBar/>
  


     <LandingHero />
     
     <div className='items-center md:ml-[45%] mt-32 ml-32'>
     <LogoFeature/>
     </div>

     <Interest/>

     <Element id='How-it-works'>
     <LandingSteps/> 
     </Element>

     <Element name='features'>
     <LandingFeatures/>
     </Element>

     

     <Element name='pricing'>
     <Pricing landing={true}/>
     </Element>

     <Element name='FAQ'>
      <LandingFaq/>
     </Element>

     <LandingAction/>

     <LandingFooter/>


     </div>

     
     
     
   </main>
  </div>
  )
}
