'use client'

import { motion, useScroll } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import FolioModal from "./FolioModal";


export default  function FolioImg({i, rounding}){

  const [showModal, setShowModal]= useState(false)

  let value= rounding

    return(

       <div >
         <motion.img onClick={()=>{setShowModal(true)}} whileHover={{scale:1.05}}  className={`hover:brightness-50 cursor-pointer shadow-xl w-[240px] h-auto md:w-[350px] m-1  md:h-auto ${value} object-cover   `} content='cover'  src={i.url} />
        
         <FolioModal setShowModal={setShowModal} showModal={showModal} data={i}/>

         
         
       </div>
    )
}


