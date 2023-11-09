
'use client'

import { deleteCookie, getCookie, setCookie } from "cookies-next"
import Modal from "../Components/Modal"
import EditSite from "../Components/EditSite"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebaseConfig"
import { DashNav } from "../Components/DashNav"
import { grabPro, withAuth } from "../Common"





  function Dashboard(){

  
  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);


    const fr=getCookie('fr')

    const router=useRouter()


    const user= getCookie('useraidt')

    const userfolio= getCookie('folio')

    const [folio, setFolio]=useState('')

    const [foliolist, setFolioList]=useState([])

    const [showerr,setShowerr]=useState(false)

    const getList=async()=>{

      let list= doc(db, 'Folios', 'List')
  
      await getDoc(list).then((snap)=>{
        setFolioList(snap.data().List)
        
      })
    }

    const updateFolio=async()=>{

      getList()
      let ref = doc(db,'Users',user)

      if (foliolist.includes(folio)){
        setShowerr(true) 
      }else{

        await updateDoc(ref,{
          folio
        }).then(async (snap)=>{
          await updateDoc((doc(db,'Folios','List')),{
            List: arrayUnion(folio)
          }).then(()=>{
            deleteCookie('fr')
            window.location.reload()
            setCookie('folio', folio, {expires: nextYear})
          })
        })
      }
      

    }

    const [isPro, setIsPro]=useState(false)


    useEffect(()=>{





       

         grabPro({user:user, setisPro: setIsPro})
         

    
        
    

        

    },[])

   


    return(
        <div>
        <header>
           <title>Dashboard</title>
         </header>
         <main className=' flex self-center place-content-center  bg-gray-800 text-center p-5 max-w-full min-w-screen  min-h-screen max-h-full overflow-hidden'>
     
   

     <div className=' md:w-[70rem] lg:w-[80rem] w-[40rem] mr-0 flex-col'>


        <DashNav page={'Dashboard'} isPro={isPro} folio={userfolio}/>

        {fr ? <Modal thin={true} height={'h-[10%]'} Header={'Assign your link'} showModal={true}>

          

          <input onChange={(e)=>{setFolio(e.target.value)}} type="text"className="w-full bg-gray-600 mt-2 outline-none p-2 rounded-lg text-gray-400 font-bold" placeholder="leodavinci" />

          {/*<Link href={'/Payment'} className='text-lg mt-4 text-left p-5 rounded-xl flex  hover:bg-pink-500 bg-pink-400 cursor-pointer  font-bold text-gray-100 '>Use a professional custom link <span className="ml-24 text-purple-900"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z" clipRule="evenodd" />
          </svg>
          </span></Link> */}

          <button onClick={()=>{if(folio!=''){updateFolio()}}} className="w-full font-bold bg-gray-600 hover:bg-gray-700 text-gray-400 p-4 mt-4 rounded-lg">Update</button>
          {showerr && <p className="text-red-500 text-md">Folio already listed</p>}

          

            
            </Modal> : null}

        <EditSite/>

        


        </div>
   
        
        
        
      </main>
     </div>
    )
}

export default withAuth(Dashboard)