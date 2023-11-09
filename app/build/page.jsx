'use client'

import { useEffect, useState } from "react"
import SEO from "../Components/SEO"
import { auth } from "../firebaseConfig"
import LandingAction from "../Components/LandingAction"
import Step1 from "./Step1"
import Step2 from "./Step2"
import Step3 from "./Step3"
import Step4 from "./Step4"
import { getCookie } from "cookies-next"
import { useRouter } from "next/navigation"

export default function Build(){

    


    const router=useRouter()
    const user= getCookie('useraidt')
    const fst= getCookie('fst')

    const [step1, setStep1]=useState(true)
    const[step2,setStep2]=useState(false)
    const[step3,setStep3]=useState(false)
    const[step4,setStep4]=useState(false)

    const [bg,setbg]=useState('');
    const [text,settext]=useState('');

    const [font,setFont]=useState('');

    const [about, setAbout]=useState('');
    const [mediaLinks, setMediaLinks]=useState({
        Instagram:'',
        Twitter:'',
        Artstation:'',
        Pinterest:'',
        Reddit: ''

    })
    const [header, setHeader]=useState('')
    const [previousWork, setPreviousWork]=useState([]);

    const [pfp, setPFP]=useState(null);

    
    


    const [Image1, setImage1]=useState({
        img: null,
        name: '',
        desc: '',
        date:''
    })
    const [Image2, setImage2]=useState({
        img: null,
        name: '',
        desc: '',
        date:''
    })
    const [Image3, setImage3]=useState({
        img: null,
        name: '',
        desc: '',
        date:''
    })

    const [clicked, setClicked]=useState(false)

    useEffect(()=>{

        if (fst!='tsf'){
            router.push('/')
        }

    },[])

    return(
        <main className={`flex self-center place-content-center  bg-gray-800 text-center p-5 max-w-full min-w-screen  min-h-screen max-h-full  overflow-hidden`}>
            <SEO 
                title={'Build a Portfolio in 5 minutes | Artfolio'}
                description={'Build a stunning, clean portfolio in 5 minutes and supercharge your career to the next level. Built with Analytics tools, SEO optomization, and tons of customization '}
                keywords={'Porfolio, art, art portfolios, how to build a portfolio, artfolio, nitron, Artfolio, quick, portfolios'}
                />

            {clicked &&<div className="fixed inset-0 bg-black opacity-50">
            <div role="status" className="align-items-center ml-[49%] mt-10">
                <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-pink-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
                </div>}
                
            <div className=' md:w-[70rem] lg:w-[80rem] w-[25rem] mr-0 flex-col'>

            
       <div className="mt-5 md:w-[70%] md:ml-[17%] md:items-center items-center text-left p-5  flex ">
      <div className={`mt-6 w-[25%] h-[6px] rounded-full ${step1 ? 'bg-pink-400' :'bg-gray-500'}`}>

        </div>
        <div className={`mt-6 w-[25%] h-[6px] rounded-full ml-4 ${step2 ? 'bg-pink-400' :'bg-gray-500'}`}>

        </div>
        <div className={`mt-6 w-[25%] h-[6px] rounded-full ml-4 ${step3 ? 'bg-pink-400' :'bg-gray-500'}`}>
            </div>

            <div className={`mt-6 w-[25%] h-[6px] rounded-full ml-4 ${step4 ? 'bg-pink-400' :'bg-gray-500'}`}>
            </div>
                
            </div>

            {step1 ? <Step1 setStep1={setStep1} setbg={setbg} settext={settext} setStep2={setStep2}/>:null}

            {step2?<Step2 setFont={setFont} setStep2={setStep2} setStep3={setStep3}/>:null}

            {step3? <Step3 setStep3={setStep3} setStep4={setStep4} setImage1={setImage1} setImage2={setImage2} setImage3={setImage3} Image1={Image1} Image2={Image2} Image3={Image3}/>:null}
            
            {step4?<Step4 setClicked={setClicked} user={user} Image1={Image1} Image2={Image2} Image3={Image3} Header={header} About={about} Medialink={mediaLinks} PFP={pfp} setAbout={setAbout} previousWork={previousWork}  setHeader={setHeader} setMediaLinks={setMediaLinks} setPFP={setPFP} setPreviousWork={setPreviousWork} font={font} text={text} bg={bg} />:null}
            </div>
        </main>
    )
}