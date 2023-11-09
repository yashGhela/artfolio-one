'use client'

import { useEffect, useState } from "react"
import Modal from "./Modal"
import LemonSqueezy from "@lemonsqueezy/lemonsqueezy.js"
import { getCookie } from "cookies-next"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebaseConfig"

import { useRouter } from "next/navigation"




export default function CancelSub(){


    const key='eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NGQ1OWNlZi1kYmI4LTRlYTUtYjE3OC1kMjU0MGZjZDY5MTkiLCJqdGkiOiI2M2RlMzkzNzMyNzFiZmRlYjBjZmZjZTg5ODc3YzEwODU2NjVmYmE4YmIzZDhlMTkxZTQzNzQxYmNkZmM5MGExNDk1ZmZlMjY5NjU3YzQyYyIsImlhdCI6MTY5NzEyNDIwNC41MzI0NDksIm5iZiI6MTY5NzEyNDIwNC41MzI0NTEsImV4cCI6MTcyODc0NjYwNC41MjQ3Niwic3ViIjoiMTAxMDAzNiIsInNjb3BlcyI6W119.HgL85ZlLwZj-f2pBZ99GID3gWy5-SEgeeEccyXabawJEG_ueqav3OWc77gFRI4CeyQpQcR_6mNNXGIQfda4H8ffn4ZSlsD4Ui_YCC_fgkGFX_om5_4VpZDxuoriGFymnpyzkdvZIyym8Dd69hz6_4p9k2Y1K843xcWNVuHKEmiwd633hNv7tqQb2fJBX50cisJPFwB9vvRNpjC-L2QCztQfgmOzCTIBxPQzpiOSf0NOgGzbQtGS-qDlOoIZEGmYOR2eF8-kiN1y2C-T4fLB5Bak5RfBLdYHtcjSWncVdsPQvMNtkqok5aPzJ2QCmDJYfL0Qc0ADjYv5oPOZkRdGzfbNXIt5cKT2oGzABJ0f1uczazrlxUDjLoK6tZQuBhU0eAi2cqCFDlRXE36HdeN3uF2bcOpgthlWuixokFwa4z208DZ8v4aGfgOEx8LCEp09hUmxl1RafCT-dlTaLBJ2vxCSvan8CRG5l_4sD2aLjAQxWWaf1yj66QcAY9gb3Ap13'
    const ls= new LemonSqueezy(key)
    const [showModal,setShowModal]=useState(false)
    const [subID, setSubID]=useState('');
    const [useremail, setuseremail]=useState('')

    const [array,setArray]=useState([])

     const user= getCookie('useraidt')
     const router= useRouter()

  


      const getSubID=async()=>{
    await getDoc(doc(db,'Users',user)).then((snap)=>{
      setuseremail(snap.data().email)
      
    }).then(async (snap)=>{
      const subscription=await ls.getSubscriptions();
      setArray(subscription.data)
      
      for (let i=0; i< array.length; i++){
        if(array[i].attributes.user_email===useremail){
          setSubID(array[i].id)
          
        }
      }
     
    })

    
  }

     const cancelSub=async ()=>{
     const cancel = ls.cancelSubscription({id:subID})
     console.log(cancel)
     await updateDoc(doc(db,'Users',user),{
      paid:false,
      

     }).then((snap)=>{
      router.push('/Dashboard')
     })

      
  }
  
  

    
    useEffect(()=>
    {
        

        getSubID()

    },[])


    return(

       <div>
         <button onClick={()=>{setShowModal(true); getSubID()}} className="w-72 p-3 border border-red-400 hover:bg-red-400 text-red-400 hover:text-gray-100 rounded-xl">Cancel Subscription</button>

          <Modal showModal={showModal} setShowModal={setShowModal} Header={'Cancel Subscription'} height={'h-[12%]'} thin={true}>
            <div>
                <h1 className="font-bold text-gray-500">Are you sure you want to Cancel your Subscription?</h1>
                <div className="p-3 mt-10">
                <button onClick={()=>{cancelSub();}} className="w-full p-3 mb-3 border border-red-400 hover:bg-red-400 text-red-400 hover:text-gray-100 rounded-xl">Yes</button>
                <button onClick={()=>{setShowModal(false)}} className="w-full p-3 border border-gray-600 hover:bg-gray-700 text-gray-400 hover:text-gray-100 rounded-xl">No, take me back!</button>
                </div>
            </div>
          </Modal>

       </div>
    )
    
}