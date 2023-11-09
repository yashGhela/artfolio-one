'use client';

import React, { useEffect, useState } from 'react'
import {  useRouter } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'universal-cookie';

import {browserLocalPersistence, createUserWithEmailAndPassword, setPersistence, signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth'
import  { auth,db,provider } from '../firebaseConfig'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { setCookie } from 'cookies-next';




export default function Auth() {
    

    const nextYear = new Date();
    const router =useRouter()




    nextYear.setFullYear(nextYear.getFullYear() + 1);//next years date for cookies

    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [checked, setChecked]= useState(false)



   


    
    const signInG = async () => {
      setPersistence(auth, browserLocalPersistence).then(async () => {
        await signInWithPopup(auth, provider).then(async (r) => {
          const ref = doc(db, 'Users', r.user.uid);
    
          var ud = r.user;
          
    
          await getDoc(ref).then(async (snap) => {
            if (snap.exists()) {
              router.push('/Dashboard');
              setCookie('useraidt', ud.uid, {expires: nextYear})
              setCookie('folio', snap.data().folio, {expires: nextYear})
            } else if (!snap.exists()) {
              await setDoc(ref, {
                email: ud.email,
                username: r.user.displayName,
                paid: false,
              }).then((snap) => {
                setCookie('fst', 'tsf', { expires: nextYear, path: '/' });
                setCookie('useraidt', ud.uid, {expires: nextYear})
                
                router.push('/build');
              });
            }
          });
        });
      });
    };
    
    const signUpEp = async () => {
      setPersistence(auth, browserLocalPersistence).then(async () => {
        await createUserWithEmailAndPassword(auth, email, password).then(async (r) => {
          const ref = doc(db, 'Users', r.user.uid);
    
          var ud = r.user;
    
          await setDoc(ref, {
            email: ud.email,
            username: ud.email,
            paid: false,
          }).then((snap) => {
            setCookie('fst', 'tsf', { expires: nextYear, path: '/' });
             setCookie('useraidt', ud.uid, {expires: nextYear})
            router.push('/build');
          });
        })
      })
    }

      const signInEp=async()=>{
        setPersistence(auth, browserLocalPersistence).then(async () => {
          await signInWithEmailAndPassword(auth, email, password).then(async (r) => {
            const ref = doc(db, 'Users', r.user.uid);
  
            var ud = r.user;
  
            await getDoc(ref).then((snap) => {
              if (snap.exists()) {
                router.push('/Dashboard');
                setCookie('fst', 'tsf', { expires: nextYear, path: '/' });
              setCookie('useraidt', ud.uid, {expires: nextYear})
              setCookie('folio', snap.data().folio, {expires: nextYear})
              }
            });
          });
        })

      }


   

      
    

     
      useEffect(()=>{


        const searchParams = new URLSearchParams(window.location.search);
        const state = searchParams.get('state');
        
        if (state === 'Login') {
          setChecked(true);
        }

      },[])
    
    
    
 

    


  return (
 
        <div className='mt-52'>
            <button className="p-2 bg-gray-00 text-white font-bold bg-gray-600 hover:bg-gray-700 rounded-xl" onClick={()=>{if (checked){setChecked(false)}else{setChecked(true)}}}>{checked? "Sign Up" : "Login" }</button>

          <div className='mt-5 bg-gray-800  shadow-2xl shadow-pink-300 border-[3px] border-pink-300  h-[360px] w-[250px] p-5 rounded-xl '>
            <button onClick={()=>{signInG()}} className='w-full p-4 rounded-lg text-white font-bold bg-red-400 hover:bg-red-600'>Sign In with Google</button>
            <hr className='mt-2' />

           
            <input  onChange={(e)=>{setEmail(e.target.value)}}  className='p-2 w-full bg-gray-700 rounded-lg mt-2 text-gray-300 font-bold focus:outline-none ' type="email" placeholder='leodavinci@email.com'/>
            <input onChange={(e)=>{setPassword(e.target.value)}} className='p-2 w-full bg-gray-700 rounded-lg mt-2 text-gray-300 font-bold focus:outline-none ' type="password" placeholder='******'/>
            
            {checked?<button id='login' onClick={()=>{signInEp()}} className='w-full p-4 rounded-lg mt-3 text-white font-bold bg-gray-600 hover:bg-gray-700'>Log In </button>:
            <button onClick={()=>{signUpEp()}} className='w-full p-4 rounded-lg mt-3 text-white font-bold bg-gray-600 hover:bg-gray-700'>Sign Up </button>}
            <p  className='text-gray-500 mt-4 text-xs  cursor-pointer'>By signing up you agree to our <Link href='/TermsAndConditions'  className='text-gray-500 mt-4  cursor-pointer underline'>Terms and Conditions</Link> and our <Link href='/PrivacyPolicy' className='text-gray-500 mt-4  cursor-pointer underline'>Privacy Policy</Link> </p>
            
            

        </div>
        </div>
   
  )
}