'use client'

import {motion} from 'framer-motion'
import { useState } from "react"
import ErrorBlock from './ErrorBlock'



export function ContactLink({bg, text, rounding,useremail}){

    const [show, setShow]=useState(false)
    const [name, setName]=useState('')
    const [subject, setSubject]=useState('')
    const [message, setMessage]=useState('')

    const [errShow, setErrShow]= useState(false)
    const [errMessage, setErrMessage]=useState('')

    const variants = {
        open: { opacity: 1, y: 0 },
        closed: { opacity: 0, y: "-100%" },
        
      }

      const sendEmail=()=>{

        if(name !=='' && subject!=='' & message!==''){
            const mailtoURL= `mailto:${useremail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)} <${name}>`

        window.location.href=mailtoURL
        }else{

            setErrShow(true)
            setErrMessage('Missing Fields')

        }

      }

    return(
        <div>

            <ErrorBlock show={errShow} message={errMessage} setShow={setErrShow}/>
            <a onClick={()=>{setShow(true)}}  className="ml-20 cursor-pointer">Contact</a>

            <div>
            {show &&<div className="fixed inset-0 bg-black opacity-60"></div>}

           

            

            <motion.dialog 
            open={show}
             className={`${bg} ${text} ${rounding} md:w-[25%] md:h-[47%] p-5 z-50  fixed inset-1 overflow-auto`}
             animate={show ? "open" : "closed"}
            variants={variants}>


            <div className='grid grid-cols-2  p-2'>

                
            <p className={`font-bold text-lg -ml-5 p-2 ${text}`}>Contact</p>
            <button onClick={()=>{setShow(false)}} className={`rounded-md ${text} md:ml-[80%] ml-[30%]   p-2`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            </button>
            </div>

            <div className='p-4 flex-col'>
            

           
            <input onChange={(e)=>{setName(e.target.value)}}   type="text"className={`w-full ${bg} border border-current outline-current  p-2 mt-2 ${rounding} ${text} font-normal`} placeholder="Name*" />

           
            <input  onChange={(e)=>{setSubject(e.target.value)}}  type="text"className={`w-full ${bg} border border-current outline-current  p-2 mt-2 ${rounding} ${text} font-normal`} placeholder="Subject*" />

            

            <textarea onChange={(e)=>{setMessage(e.target.value)}} cols="30" rows="5"   type="email"className={`w-full ${bg} border border-current outline-current  p-2 mt-2 ${rounding} ${text} font-normal`} placeholder="Message*" />

            <button onClick={()=>{sendEmail()}} className={`  border border-current ${rounding} hover:bg-current  w-full  font-bold py-4 `}>Send</button>
            

                



            </div>


        

            



            
 
            
            
                


            </motion.dialog>
        </div>
        </div>
    )
}

