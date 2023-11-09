'use client'

import { getCookie } from "cookies-next";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db, storage } from "../firebaseConfig";
import Modal from "./Modal";
import { colorSchemes, fontOptions, grabPro, limitColorSchemes, roundingOptions } from "../Common";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Head from "next/head";
import HelpButton from "./HelpButton";
import FolioImg from "./FolioImg";


export default function EditSite(){

    const iframeRef = useRef(null);

    const refreshIframeContent = () => {
      if (iframeRef.current) {
        iframeRef.current.contentWindow.location.reload();
      }
    }

    
    const user= getCookie('useraidt')
    const userfolio= getCookie('folio')

    const router = useRouter()

    const [showModal, setShowModal] =useState(false)
    const [link, setlink]=useState('')

    const [showPrev, setShowPrev] =useState(false)

    const [colorscheme, setColorScheme]=useState(false)

    const [fontstyle,setFontStyle]=useState(false)

    const [addWork, setAddWork]=useState(false)

    const [temp, setTemp]=useState('')

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

    const [newPFP, setNewPFP]=useState(null);

    const [rounding, setRounding]=useState([])

    const [manageWorks, setManageWorks]=useState(false)

    const [works, setWorks]=useState([])

    const [showImgR, setShowImgR]=useState(false)

    
    


    const [Image1, setImage1]=useState({
        img: null,
        name: '',
        desc: '',
        date:'',
        filename:''
    })

    const [save, setSave]=useState(false)

   // const [scheme, setScheme]=useState(true)

    

    const getConfig=async()=>{

        const configref= doc(db,'Users',user,'Configs','BaseConfig')
        await getDoc(configref).then((ref)=>{

            var config=ref.data()

            setbg(config.bg)

            settext(config.text)

            setPFP(config.PFP)

            setMediaLinks(config.Medialink)
            
            setHeader(config.Header)

            setFont(config.font)

            setAbout(config.About)

            setPreviousWork(config.previousWork)

            setRounding(config.rounding)

        })

        
    }



    

    const [isclicked,setIsClicked]=useState(false)

    const [imclicked, setimclicked]=useState(false)

    

   const getWorks=async()=>{
      let ref=collection(db,'Users',user,'Works')

      await getDocs(ref).then((snap)=>{
        setWorks(snap.docs.map((doc)=>({...doc.data(), id: doc.id})))
   })
   }

   const deleteWork=async({i})=>{
     await deleteDoc(doc(db,'Users',user,'Works',i.id))
   }



    const addNewWork=async()=>{

        let collref= collection(db,'Users',user,'Works')
        let imgref= ref(storage,`${user}/images/${Image1.filename}`)

        const imageFileExtension = Image1.filename.split('.').pop()

        const metadata = {
            contentType: `image/${imageFileExtension}`
          };



        await uploadBytes(imgref, Image1.img, metadata).then(async(snap)=>{
            await getDownloadURL(snap.ref).then(async(url)=>{
                await addDoc(collref,{
                    url,
                    title: Image1.name,
                    desc: Image1.desc,
                    date: Image1.date,
                }).then((snap)=>{
                    setAddWork(false)

                    setImage1({
                        img: null,
                        name: '',
                        desc: '',
                        date:'',
                        filename:''
                    })

                    setIsClicked(false)
                })
            })
        })


       
    }


 
  

    const updateConfig=async()=>{
     
        let imgref=ref(storage,`${user}/pfp`)

        let docref= doc(db,'Users',user,'Configs','BaseConfig')

      




        
        
            if (newPFP===null){
                await updateDoc(docref,{
                    Header:header,
                    Medialink:mediaLinks,
                    About:about,
                    PFP:pfp,
                    font,
                    bg,
                    text,
                    previousWork,
                    
                }).then((snap)=>{
                     
                    setSave(false)
                })
            }else{
    
                await uploadBytes(imgref, newPFP).then(async(snap)=>{
                    await getDownloadURL(snap.ref).then(async (url)=>{
                        await updateDoc(docref,{
                            Header:header,
                            Medialink:mediaLinks,
                            About:about,
                            PFP:url,
                            
                            font,
                            bg,
                            text,
                            previousWork,
                           
                        }).then((snap)=>{
                             
                            setSave(false)
                        })
                    })
                })
    
            }
        
    }


    const updateImageRounding=async()=>{

        let docref= doc(db,'Users',user,'Configs','BaseConfig')

        await updateDoc(docref,{
            rounding
        }).then(()=>{
            setimclicked(false)
        })
        
    }

    const [isPro, setIsPro]=useState(false)


    useEffect(()=>{

        getConfig()

         grabPro({user:user, setisPro: setIsPro})
         

    
        
    

        

    },[])

    return(

        
            <div className=" md:flex  w-full h-[80%]">

              

                

            <div className="md:w-[400px] w-[60%] ml-[20%] md:ml-0  mt-10 bg-gray-900 rounded-xl h-full md:h-[110%] ">

            <div className="p-5 flex-col mt-2 " >


                

                
            
            <button onClick={()=>{setAddWork(true)}} className={`w-full my-2 p-4  rounded-lg font-bold text-gray-900 bg-gray-300 hover:bg-gray-400 `}>Add a Work</button>

            <Modal Header={`Add a Work`} setShowModal={setAddWork} showModal={addWork} thin={false} height={'h-[35%]'}>

            <div className="grid grid-cols-2">


               
                    <div>
                    {Image1.img? 
                    <img onClick={()=>{setImage1((prev)=>({...prev,img: null}))}} src={URL.createObjectURL(Image1.img)} alt="Uploaded Image" className=" w-fit cursor-pointer p-3 rounded-md h-[13rem]" />:

                    <div className="flex items-center justify-center w-full h-[100%] p-3">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-[100%]  rounded-lg cursor-pointer bg-gray-600   hover:bg-gray-700">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            
                            <p className="mb-2 mt-5 text-sm text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                            </svg>
                            </p>

                        </div>
                        <input onChange={(e)=>{setImage1((prev)=>({...prev,img: e.target.files[0], filename: e.target.files[0].name}))}} id="dropzone-file" type="file" accept="image/png, image/gif, image/jpeg" className="hidden" />
                    </label>

                    </div>
                    }
                    </div>

                  <div>
            <input value={Image1.name} onChange={(e)=>{setImage1((prev)=>({...prev,name:e.target.value}))}} type="text"className="w-[90%] bg-gray-600 outline-none p-2 rounded-lg text-gray-400 font-bold" placeholder="title" />

            <textarea value={Image1.desc} onChange={(e)=>{setImage1((prev)=>({...prev,desc:e.target.value}))}} className="w-[90%] bg-gray-600 outline-none p-2 rounded-lg text-gray-400 font-bold mt-2" cols="30" rows="5" placeholder="description"></textarea>

            <input value={Image1.date} onChange={(e)=>{setImage1((prev)=>({...prev,date:e.target.value}))}} type="date" className="w-[90%] bg-gray-600 outline-none p-2 rounded-lg text-gray-400 font-bold" placeholder="date" />

                  </div>
                    </div>

                    <button disabled={isclicked} onClick={()=>{addNewWork(); setIsClicked(true)}} className="bg-pink-400 hover:bg-pink-600 disabled:brightness-50 font-bold text-white w-full p-5 rounded-xl mt-6">Add</button>
                    
             

          



                    

                </Modal>
                
             {isPro?<button onClick={()=>{setColorScheme(true)}} className={`w-full my-2 p-4 mt-2 rounded-lg font-bold ${text} ${bg} `}>Color Scheme</button>:
            <Link href={'/Payment'} className='text-md my-2 text-left p-3 rounded-xl flex  hover:bg-pink-500 bg-pink-400 cursor-pointer  font-bold text-gray-100 '>Change Color Scheme<span className="ml-24 text-purple-900"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z" clipRule="evenodd" />
          </svg>
          </span></Link>}

             <Modal Header={`Change your color scheme`} setShowModal={setColorScheme} showModal={colorscheme} thin={false} height={'h-[50%]'}>
                    
             

             

             
              <div className="grid md:grid-cols-4 grid-cols-2 p-8 overflow-auto">
              {colorSchemes.map((scheme, index) => (
                      <div
                      key={index}
                      className="w-[100%] rounded-xl border-[3px] border-gray-900 flex h-[75px] cursor-pointer"
                      onClick={()=>{ setbg(scheme.bg);  settext(scheme.text)}}
                      >
                      <div className={`w-[100%] ${scheme.bg} rounded-md`}>
                      <p className={` ${scheme.text} text-md font-bold text-center mt-5`}>Artfolio</p>
                      
                      </div>
                      
                      </div>
                  ))}
        
                      
  
                  </div>



                    

                </Modal>

                {isPro? <button onClick={()=>{setFontStyle(true)}} style={{ fontFamily: font }}  className={`w-full my-2 p-4  rounded-lg font-bold text-gray-400 bg-gray-600 hover:bg-gray-700 `}>Font</button>
                :
                <Link href={'/Payment'} className='text-md my-2 text-left p-3 rounded-xl flex  hover:bg-pink-500 bg-pink-400 cursor-pointer  font-bold text-gray-100 '>Change Font<span className="ml-24 text-purple-900"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z" clipRule="evenodd" />
          </svg>
          </span></Link>
                }

                <Modal Header={`Change your Font`} setShowModal={setFontStyle} showModal={fontstyle} thin={false} height={'h-[50%]'}>
                    
                    
       
                    <div className="grid md:grid-cols-4 grid-cols-2 gap-2 p-8 overflow-auto">
                    {fontOptions.map((font, index) => (
                           <div
                           onClick={()=>{setFont(font)}}
                               key={index}
                               className="bg-gray-800 p-4 border rounded-xl text-lg text-gray-400 hover:bg-gray-200 hover:text-gray-700 cursor-pointer"
                               style={{ fontFamily: font.value }}
                           >
                               {font.family}
                           </div>
                           ))}
                
                              
          
                          </div>
          
          
          
                              
          
                          </Modal>

                        {isPro?  <button onClick={()=>{setShowImgR(true)}}   className={`w-full my-2 p-4  rounded-lg font-bold text-gray-400 bg-gray-600 hover:bg-gray-700 `}>Image Rounding</button>
                
                :<Link href={'/Payment'} className='text-md my-2 text-left p-3 rounded-xl flex  hover:bg-pink-500 bg-pink-400 cursor-pointer  font-bold text-gray-100 '>Image rounding<span className="ml-24 text-purple-900"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z" clipRule="evenodd" />
          </svg>
          </span></Link>}

             <Modal setShowModal={setShowImgR} showModal={showImgR} Header={'Image Rounding'} height={'h-[30%]'} >

             <div className="grid md:grid-cols-5 grid-cols-2 p-8 gap-3 overflow-auto">

             {roundingOptions.map((rounding, index) => (
                           <div
                           onClick={()=>{setRounding(rounding)}}
                               key={index}
                               className="bg-gray-800 p-4 border rounded-xl text-lg text-gray-400 hover:bg-gray-200 hover:text-gray-700 cursor-pointer"
                              
                           >
                               {rounding.title}
                           </div>
                           ))}


            
            </div>

            <button disabled={imclicked} onClick={()=>{updateImageRounding(); setimclicked(true)}}  className="bg-pink-400 hover:bg-pink-600 disabled:brightness-50 font-bold text-white w-full p-5 rounded-xl mt-6">Save</button>
                    
             




             </Modal>



                <input value={header} onChange={(e)=>{setHeader(e.target.value)}} type="text"className="w-full bg-gray-600 outline-none p-2 mt-2 rounded-lg text-gray-400 font-bold" placeholder="Header" />

                

                {newPFP ? 
                 <img onClick={()=>{setNewPFP(null)}} src={URL.createObjectURL(newPFP) } alt="Uploaded Image" className="  w-auto ml-[15%] cursor-pointer p-3 rounded-md h-[13rem]" />:

                <div className="flex-col my-3 items-center justify-center w-full h-[13rem] p-3">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-[100%]  rounded-lg cursor-pointer bg-gray-600   hover:bg-gray-700">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        
                        <p className="mb-2 mt-5 text-sm text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                        </svg>
                        </p>
    
                    </div>
                    <input onChange={(e)=>{setNewPFP( e.target.files[0])}} id="dropzone-file" type="file" accept="image/png, image/gif, image/jpeg" className="hidden" />
                    <p className="text-gray-400 text-md font-bold">Change your Profile Picture</p>

                 
                   
    
                </label>
               
                </div>
                }

                {/*Links*/}

                <div className="flex mt-2 ml-2 w-full gap-2">


                {/*Twitter*/}
                <button  onClick={()=>{setShowModal(true), setlink('Twitter')}} className="p-2 bg-gray-600 hover:bg-gray-700 text-gray-400 rounded-lg"><svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-10 w-10"
                fill="currentColor"
                viewBox="0 0 24 24">
                <path
                d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg></button>

                {/*Reddit*/}


                <button  onClick={()=>{setShowModal(true), setlink('Reddit')}} className="p-2 bg-gray-600 hover:bg-gray-700 text-gray-400 rounded-lg"><svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-10 w-10 "
                fill="currentColor"
                viewBox="0 0 24 24 ">
                <path
                d="M24 11.779c0-1.459-1.192-2.645-2.657-2.645-.715 0-1.363.286-1.84.746-1.81-1.191-4.259-1.949-6.971-2.046l1.483-4.669 4.016.941-.006.058c0 1.193.975 2.163 2.174 2.163 1.198 0 2.172-.97 2.172-2.163s-.975-2.164-2.172-2.164c-.92 0-1.704.574-2.021 1.379l-4.329-1.015c-.189-.046-.381.063-.44.249l-1.654 5.207c-2.838.034-5.409.798-7.3 2.025-.474-.438-1.103-.712-1.799-.712-1.465 0-2.656 1.187-2.656 2.646 0 .97.533 1.811 1.317 2.271-.052.282-.086.567-.086.857 0 3.911 4.808 7.093 10.719 7.093s10.72-3.182 10.72-7.093c0-.274-.029-.544-.075-.81.832-.447 1.405-1.312 1.405-2.318zm-17.224 1.816c0-.868.71-1.575 1.582-1.575.872 0 1.581.707 1.581 1.575s-.709 1.574-1.581 1.574-1.582-.706-1.582-1.574zm9.061 4.669c-.797.793-2.048 1.179-3.824 1.179l-.013-.003-.013.003c-1.777 0-3.028-.386-3.824-1.179-.145-.144-.145-.379 0-.523.145-.145.381-.145.526 0 .65.647 1.729.961 3.298.961l.013.003.013-.003c1.569 0 2.648-.315 3.298-.962.145-.145.381-.144.526 0 .145.145.145.379 0 .524zm-.189-3.095c-.872 0-1.581-.706-1.581-1.574 0-.868.709-1.575 1.581-1.575s1.581.707 1.581 1.575-.709 1.574-1.581 1.574z" />
                </svg></button>

                {/*Instagram*/}

                <button  onClick={()=>{setShowModal(true), setlink('Instagram')}} className="p-2 bg-gray-600 hover:bg-gray-700 text-gray-400 rounded-lg">
                            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-10 w-10"
                fill="currentColor"
                viewBox="0 0 24 24">
                <path
                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                </button>


                {/*Artstation*/}

                <button  onClick={()=>{setShowModal(true), setlink('Artstation')}} className="p-2 bg-gray-600 hover:bg-gray-700 text-gray-400 rounded-lg">
                <svg fill="currentColor" role="img" class="h-10 w-10" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>ArtStation</title><path d="M0 17.723l2.027 3.505h.001a2.424 2.424 0 0 0 2.164 1.333h13.457l-2.792-4.838H0zm24 .025c0-.484-.143-.935-.388-1.314L15.728 2.728a2.424 2.424 0 0 0-2.142-1.289H9.419L21.598 22.54l1.92-3.325c.378-.637.482-.919.482-1.467zm-11.129-3.462L7.428 4.858l-5.444 9.428h10.887z"/></svg>
                </button>


                {/*Pinterest*/}

                <button  onClick={()=>{setShowModal(true), setlink('Pinterest')}} className="p-2 bg-gray-600 hover:bg-gray-700 text-gray-400 rounded-lg">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-10 w-10 "
                fill="currentColor"
                viewBox="0 0 24 24">
                <path
                d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"
                fill-rule="evenodd"
                clip-rule="evenodd" />
                </svg>
                </button>

                <Modal Header={`Set link for ${link}`} setShowModal={setShowModal} showModal={showModal} thin={true} height={'h-[5%]'}>

                <input value={mediaLinks[link]} onChange={(e)=>{setMediaLinks((prev)=>({...prev,[link]:e.target.value}))}} type="text"className="w-full bg-gray-600  outline-none p-2 rounded-lg text-gray-400 font-bold" placeholder={link} />


                </Modal>
                        
                        

                </div>

                <textarea value={about} onChange={(e)=>{setAbout(e.target.value)}} className="w-full  bg-gray-600 outline-none p-2 rounded-lg text-gray-400 font-bold mt-2" cols="30" rows="5" placeholder="About"></textarea>
                
                
                

                <div>
                <button onClick={()=>{setShowPrev(true)}} className="w-full p-4 mt-3 rounded-lg font-bold text-gray-400 bg-gray-600 hover:bg-gray-700">Previous Work</button>

                <Modal Header={`Previous Work`} setShowModal={setShowPrev} showModal={showPrev} thin={true} height={'h-[50%]'}>
                    
                    <div className="flex">
                    <input value={temp} onChange={(e)=>{setTemp(e.target.value)}} type="text"className="w-[70%] bg-gray-600  outline-none p-2 rounded-lg text-gray-400 font-bold" placeholder={'Previous Job'} />
                    <button onClick={()=>{setPreviousWork((prev)=>[...prev,temp]);setTemp('')}} className="p-2 w-[30%] ml-2 rounded-lg bg-pink-400 hover:bg-pink-600 font-bold text-gray-300">Add</button>
                    </div>

                    {previousWork.map((i)=>{
                        return(
                            <div onClick={()=>{
                                let del= previousWork.indexOf(i);
                                previousWork.splice(del,1)
                            }}  className="p-2 my-2 cursor-pointer bg-gray-700 rounded-lg mt-5 text-left text-gray-300 font-semibold ">
                                {i}
                            </div>

                        )
                    })}


                    

                </Modal>

                <button onClick={()=>{setManageWorks(true); getWorks()}} className="w-full p-4 mt-3 rounded-lg font-bold text-gray-400 bg-gray-600 hover:bg-gray-700">Manage Works</button>

                
                <Modal Header={`Manage Works`} setShowModal={setManageWorks} showModal={manageWorks} thin={false} height={'h-[50%]'}>

              
                <div className="flex-col p-4 sm:grid md:grid-cols-2 sm:grid-cols-2 gap-2 mt-5 sm:ml-0">

                {works.map((i)=>{
                    return (
                        <img
                            className="cursor-pointer rounding-lg"
                            src={i.url}

                            onClick={()=>{
                                deleteWork({i:i})
                            }}
                            style={{ transition: "filter 0.3s" }}
                            onMouseEnter={(e) => (e.target.style.filter = "brightness(70%)")}
                            onMouseLeave={(e) => (e.target.style.filter = "brightness(100%)")}
                            />
                    )
                        
                    
                    })}


                </div>

                   




                    </Modal>
                

                </div>

                <button onClick={()=>{updateConfig(); setSave(true)}} disabled={save}  className="w-full disabled:brightness-50 p-4 mt-3 rounded-lg font-bold text-white bg-pink-400 hover:bg-pink-600">Save Changes {save?<span><div role="status" className="align-items-center  ">
                <svg aria-hidden="true" class="w-4 h-4 ml-2 text-gray-200 animate-spin dark:text-gray-600 fill-pink-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
               
            </div></span>:null}</button>



               </div>

            </div>

               


                {/*Display box*/}
                <div class="relative mx-auto invisible md:visible bg-gray-900 border-gray-900 border-[14px] md:ml-[10%] mt-20 rounded-[2.5rem] h-[90%] w-[110%]">
       
        <div style={{ fontFamily: font.value }} class={`rounded-[2rem] w-full h-full overflow-auto ${bg}`}>

        {userfolio?<iframe ref={iframeRef} src={`https://artfolio.space/${userfolio}`} className="w-full h-full border-none"></iframe>:null}

               

       
            
        </div>
        <button
                        onClick={()=>{window.open(`https://artfolio.space/${userfolio}`)}}
                        class="  bg-gray-500 text-white px-4 py-2 mt-10 rounded-full shadow-lg"
                    >
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                        </svg>

                        
                    </button>

        
       <HelpButton/>

       
        </div>
            </div>
      
    )
}