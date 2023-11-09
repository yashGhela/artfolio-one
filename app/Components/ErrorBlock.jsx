'use client'

import { useEffect, useState } from "react"
import {motion} from 'framer-motion'

export default function ErrorBlock({show, message, setShow}){


   

    const variants = {
        open: { opacity: 1, y: 0 },
        closed: { opacity: 0, y: "-100%" },
        
      }
      useEffect(() => {
        let timeout;
    
        if (show) {
          timeout = setTimeout(() => {
            setShow(false);
          }, 2000);
        }
    
        return () => {
          clearTimeout(timeout);
        };
      }, [show]);
    
    return(
      <div>
      {show ? (
        <motion.span
          animate={show ? "open" : "closed"}
          variants={variants}
          className="p-2 fixed z-[100] flex mt-5 w-52 text-center top-0 left-[35%] transform -translate-x-1/2 rounded-xl bg-gray-200 text-gray-800 font-normal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 text-red-500">
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
              clipRule="evenodd"
            />
          </svg>
          {message}
        </motion.span>
      ) : null}
    </div>

    )
}