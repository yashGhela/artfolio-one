import { Link, Element, scroller } from 'react-scroll';
import { useEffect, useState } from 'react';



export function SmoothScrollLink({ to, children }) {
    const handleClick = () => {
      scroller.scrollTo(to, {
        duration: 800,  // Adjust the duration as needed
        smooth: 'easeInOut',
      });

      window.location.hash=to
    };
  
    return (
      <Link to={to} onClick={handleClick}  className={`text-gray-400 sm:invisible invisible md:visible ml-8 cursor-pointer`}>
        {children}
      </Link>
    );
  }
  