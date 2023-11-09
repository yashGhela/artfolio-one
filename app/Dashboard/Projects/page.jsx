'use client'

import { grabPro, withAuth } from "../../Common";
import { DashNav } from "../../Components/DashNav";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import Modal from "../../Components/Modal";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

 function Projects(){

    const [isPro, setIsPro]=useState(false)
    const [addPM, setAddPM]=useState(false)
    const [npName, setNpName]=useState('')
    const [npDesc, setNPDesc]=useState('')
    const [works, setWorks]=useState([])

    const [projectWorks, setProjectWorks]=useState([])

    const [projects, setProjects]=useState([])

    const user = getCookie('useraidt')

    const userfolio= getCookie('folio')

    const getWorks=async()=>{
        let ref=collection(db,'Users',user,'Works')
  
        await getDocs(ref).then((snap)=>{
          setWorks(snap.docs.map((doc)=>({...doc.data(), id: doc.id})))
     })
     }


     const getProjects=async()=>{

        let ref=collection(db,'Users',user,'Projects')
  
        await getDocs(ref).then((snap)=>{
          setProjects(snap.docs.map((doc)=>({...doc.data(), id: doc.id})))
     })

     }

     const AddProject=async()=>{

        const ref= collection(db,'Users',user,'Projects')

        await addDoc(ref,{
            Title: npName,
            Desc: npDesc,
            projectWorks
        }).then(()=>{
            setAddPM(false);
            setNpName('')
            setNPDesc('')
            setProjectWorks([])
        })
     }


    useEffect(()=>{

        
       grabPro({ setisPro:setIsPro, user:user})
       getProjects()

    
        
    

        

    },[])

    return(
        <div>
        <header>
           <title>Projects</title>
         </header>
         <main className=' flex self-center place-content-center  bg-gray-800 text-center p-5 max-w-full min-w-screen  min-h-screen max-h-full overflow-hidden'>
     
   

     <div className=' md:w-[70rem] lg:w-[80rem] w-[40rem] mr-0 flex-col'>


        <DashNav page={'Projects'} isPro={isPro} folio={userfolio}/>

        <div class="min-h-screen flex items-center justify-center bg-gradient-radial from-pink-400 via-gray-800  to-gray-800">
    <div class=" p-6 rounded-lg text-center">
        <p class="text-2xl md:text-3xl text-gray-100 font-semibold">This Feature is currently in Development</p>
    </div>
</div>

      { /*<div className="mt-10">
       <button onClick={()=>{setAddPM(true); getWorks()}} className="p-4 bg-gray-600 hover:bg-gray-700 font-bold text-gray-400 rounded-lg float-left ">Add a Project</button>
       </div>


       <Modal showModal={addPM} setShowModal={setAddPM} Header={'Add a Project'} height={'h-[40%]'}>
        <div className=" md:grid md:grid-cols-2 flex-col mt-10">
            <div>

            <input value={npName}  onChange={(e)=>{setNpName(e.target.value)}} type="text"className="w-[90%] bg-gray-600 outline-none p-2 rounded-lg text-gray-400 font-bold" placeholder="Name of Project" />
            <textarea value={npDesc}  onChange={(e)=>{setNPDesc(e.target.value)}} className="w-[90%] bg-gray-600 outline-none p-2 rounded-lg text-gray-400 font-bold mt-2" cols="30" rows="6" placeholder="description"></textarea>


                
            </div>

            <div className="m-3 -mt-5">
            <p className="text-center text-gray-400 text-semibold text-md">Click to add to Project</p>
                <div className=" overflow-scroll h-[100%] flex">

                

                {works.map((i)=>{
                    return <img onClick={()=>{setProjectWorks((prev)=>[...prev, i.id])}} className=" hover:cursor-pointer m-1" src={i.url} alt={i.title}/>
                })}

            </div>
            
            </div>
            


        </div>
        <button onClick={()=>{AddProject()}}  className="bg-pink-400 hover:bg-pink-600 disabled:brightness-50 font-bold text-white w-full p-5 rounded-xl mt-6">Add</button>
                    
             

       </Modal>

       <br/>

       <div className="mt-20">
        <p className="text-left text-gray-400 text-bold text-xl">Projects</p>
       </div>

       <div className="mt-20 md:grid md:grid-cols-3 flex-col">

        {projects.map((i)=>{
            return(
                <div className='p-4 rounded-lg bg-gray-900 w-full text-gray-400 font-bold text-lg cursor-pointer'>
                    {i.Title}

                </div>
            )
        })}

       </div>

        */}



        </div>
        </main>
        </div>
    )
}

export default withAuth(Projects)