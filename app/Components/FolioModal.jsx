import { motion } from "framer-motion";
import { useState } from "react";

export default function FolioModal({setShowModal, data, showModal}){

    const variants = {
        open: { opacity: 1, y: 0 },
        closed: { opacity: 0, y: "-100%" },
        
      }

      const [hover, setHover]=useState(false)

    return(

        <div>
             {showModal &&<div className="fixed inset-0 bg-black opacity-60"></div>}

             <motion.dialog 
            open={showModal}
             className={` rounded-lg sm:w-[90%] sm:h-[90%]  w-[90%] h-[20%]  bg-transparent  sm:bg-fit  p-5 z-50 bg-no-repeat  fixed inset-1 overflow-auto`}

             onHoverStart={()=>{setHover(true)}}
             onHoverEnd={()=>{setHover(false)}}

             
             animate={showModal ? "open" : "closed"}
            variants={variants}>


           <div className="  flex">
           <img className="w-auto h-auto max-w-[80%] max-h-[90%]" src={data.url} alt="Image" />

           
            

           


         <div className='text-gray-200 font-normal text-left text-lg ml-10 mt-10 p-2'>
         <button onClick={()=>{setShowModal(false)}} 

            
            
            
        className={`rounded-md   float-right   p-2`}
        ><svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        </button>
          <p className="font-bold my-10">{data.title}</p>
              <p className="mt-10">{data.desc}</p>
          </div>
           </div>



            

            
 
            
            
                


            </motion.dialog>

             

        </div>


    )
}