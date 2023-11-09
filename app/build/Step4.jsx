'use client'

import { useState } from "react"
import Modal from "../Components/Modal"
import { ArtStationButton, InstagramButton, PinterestButton, RedditButton, TwitterButton } from "../Components/MediaButtons"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { db, storage } from "../firebaseConfig"
import { addDoc, collection, doc, setDoc } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { deleteCookie, setCookie } from "cookies-next"
import ErrorBlock from "../Components/ErrorBlock"

export default function Step4({setAbout,user, setClicked, setMediaLinks,previousWork, setPreviousWork,setHeader, font, bg, text, setPFP, PFP,Header, About, Medialink, Image1, Image2, Image3}){

    const [showModal, setShowModal] =useState(false)
    const [link, setlink]=useState('')

    const [showPrev, setShowPrev] =useState(false)

    const [temp, setTemp]=useState('')

    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);

    const [errShow, setErrShow]= useState(false)
    const [errMessage, setErrMessage]=useState('')

    

    const router=useRouter()

    const pfpref= ref(storage,`${user}/pfp`)

    const imgref1=ref(storage,`${user}/images/img1`)

    const imgref2=ref(storage,`${user}/images/img2`)

    const imgref3=ref(storage,`${user}/images/img3`)

    const uploadData = async () => {

      if (
        PFP &&
        Header &&
        
        About &&
        font &&
        bg &&
        text &&
        
        Image1.img &&
        Image1.name &&
        Image1.desc &&
        Image1.date &&
        Image2.img &&
        Image2.name &&
        Image2.desc &&
        Image2.date &&
        Image3.img &&
        Image3.name &&
        Image3.desc &&
        Image3.date
      ){

        setClicked(true)

        await uploadBytes(pfpref, PFP).then(async (snap) => {
          await getDownloadURL(snap.ref).then(async (url) => {
            await setDoc(doc(db, 'Users', user, 'Configs', 'BaseConfig'), {
              Header,
              Medialink,
              About,
              PFP: url,
              font,
              bg,
              text,
              previousWork,
            }).then(async (ref) => {
              await uploadBytes(imgref2, Image1.img).then(async (snap) => {
                await getDownloadURL(snap.ref).then(async (url) => {
                  await addDoc(collection(db, 'Users', user, 'Works'), {
                    url,
                    title: Image1.name,
                    desc: Image1.desc,
                    date: Image1.date,
                  }).then(async (snap) => {
                    await uploadBytes(imgref1, Image2.img).then(async (snap) => {
                      await getDownloadURL(snap.ref).then(async (url) => {
                        await addDoc(collection(db, 'Users', user, 'Works'), {
                          url,
                          title: Image2.name,
                          desc: Image2.desc,
                          date: Image2.date,
                        }).then(async (snap) => {
                          await uploadBytes(imgref3, Image3.img).then(async (snap) => {
                            await getDownloadURL(snap.ref).then(async (url) => {
                              await addDoc(collection(db, 'Users', user, 'Works'), {
                                url,
                                title: Image3.name,
                                desc: Image3.desc,
                                date: Image3.date,
                              }).then((snap) => {
                                router.push('/Dashboard');
                                deleteCookie('fst')
                                setCookie('fr',true, {expires: nextYear})
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      }else{
        setErrMessage('Missing Fields or Images');
    setErrShow(true);
    setClicked(false)
      }
        
      };



    

    return(

        <div  className=" mt-[10%] w-full md:w-[70%] h-[900px]  md:ml-[220px] rounded-xl overflow-auto">

      <ErrorBlock show={errShow} message={errMessage} setShow={setErrShow}/>

        <p className="text-2xl font-bold py-3 text-gray-300">Build your about section</p>

            <div className="md:grid  md:grid-cols-2 flex-col">

                <div className="p-5 flex-col mt-2">
                <input onChange={(e)=>{setHeader(e.target.value)}} type="text"className="w-full bg-gray-600 outline-none p-2 rounded-lg text-gray-400 font-bold" placeholder="Header" />

                

                {PFP? 
                <img onClick={()=>{setPFP(null)}} src={URL.createObjectURL(PFP)} alt="Uploaded Image" className="  w-auto ml-[15%] cursor-pointer p-3 rounded-md h-[13rem]" />:

                <div className="flex items-center justify-center w-full h-[13rem] p-3">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-[100%]  rounded-lg cursor-pointer bg-gray-600   hover:bg-gray-700">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        
                        <p className="mb-2 mt-5 text-sm text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                        </svg>
                        </p>
    
                    </div>
                    <input onChange={(e)=>{setPFP( e.target.files[0])}} id="dropzone-file" type="file" accept="image/png, image/gif, image/jpeg" className="hidden" />
                </label>
    
                </div>
                }

                <div className="flex mt-2 ml-2 w-full gap-2">


                {/*Twitter*/}
                <button  onClick={()=>{setShowModal(true), setlink('Twitter')}} className="p-4 bg-gray-600 hover:bg-gray-700 text-gray-400 rounded-lg"><svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-10 w-10"
                fill="currentColor"
                viewBox="0 0 24 24">
                <path
                d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg></button>

                {/*Reddit*/}


                <button  onClick={()=>{setShowModal(true), setlink('Reddit')}} className="p-4 bg-gray-600 hover:bg-gray-700 text-gray-400 rounded-lg"><svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-10 w-10 "
                fill="currentColor"
                viewBox="0 0 24 24 ">
                <path
                d="M24 11.779c0-1.459-1.192-2.645-2.657-2.645-.715 0-1.363.286-1.84.746-1.81-1.191-4.259-1.949-6.971-2.046l1.483-4.669 4.016.941-.006.058c0 1.193.975 2.163 2.174 2.163 1.198 0 2.172-.97 2.172-2.163s-.975-2.164-2.172-2.164c-.92 0-1.704.574-2.021 1.379l-4.329-1.015c-.189-.046-.381.063-.44.249l-1.654 5.207c-2.838.034-5.409.798-7.3 2.025-.474-.438-1.103-.712-1.799-.712-1.465 0-2.656 1.187-2.656 2.646 0 .97.533 1.811 1.317 2.271-.052.282-.086.567-.086.857 0 3.911 4.808 7.093 10.719 7.093s10.72-3.182 10.72-7.093c0-.274-.029-.544-.075-.81.832-.447 1.405-1.312 1.405-2.318zm-17.224 1.816c0-.868.71-1.575 1.582-1.575.872 0 1.581.707 1.581 1.575s-.709 1.574-1.581 1.574-1.582-.706-1.582-1.574zm9.061 4.669c-.797.793-2.048 1.179-3.824 1.179l-.013-.003-.013.003c-1.777 0-3.028-.386-3.824-1.179-.145-.144-.145-.379 0-.523.145-.145.381-.145.526 0 .65.647 1.729.961 3.298.961l.013.003.013-.003c1.569 0 2.648-.315 3.298-.962.145-.145.381-.144.526 0 .145.145.145.379 0 .524zm-.189-3.095c-.872 0-1.581-.706-1.581-1.574 0-.868.709-1.575 1.581-1.575s1.581.707 1.581 1.575-.709 1.574-1.581 1.574z" />
                </svg></button>

                {/*Instagram*/}

                <button  onClick={()=>{setShowModal(true), setlink('Instagram')}} className="p-4 bg-gray-600 hover:bg-gray-700 text-gray-400 rounded-lg">
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

                <button  onClick={()=>{setShowModal(true), setlink('Artstation')}} className="p-4 bg-gray-600 hover:bg-gray-700 text-gray-400 rounded-lg">
                <svg fill="currentColor" role="img" class="h-10 w-10" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>ArtStation</title><path d="M0 17.723l2.027 3.505h.001a2.424 2.424 0 0 0 2.164 1.333h13.457l-2.792-4.838H0zm24 .025c0-.484-.143-.935-.388-1.314L15.728 2.728a2.424 2.424 0 0 0-2.142-1.289H9.419L21.598 22.54l1.92-3.325c.378-.637.482-.919.482-1.467zm-11.129-3.462L7.428 4.858l-5.444 9.428h10.887z"/></svg>
                </button>


                {/*Pinterest*/}

                <button  onClick={()=>{setShowModal(true), setlink('Pinterest')}} className="p-4 bg-gray-600 hover:bg-gray-700 text-gray-400 rounded-lg">
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

                <input  onChange={(e)=>{setMediaLinks((prev)=>({...prev,[link]:e.target.value}))}} type="text"className="w-full bg-gray-600  outline-none p-2 rounded-lg text-gray-400 font-bold" placeholder={link} />


                </Modal>
                        
                        

                </div>

                <textarea onChange={(e)=>{setAbout(e.target.value)}} className="w-full bg-gray-600 outline-none p-2 rounded-lg text-gray-400 font-bold mt-2" cols="30" rows="5" placeholder="About"></textarea>
                
                
                

                <div>
                <button onClick={()=>{setShowPrev(true)}} className="w-full p-4 mt-3 rounded-lg font-bold text-gray-400 bg-gray-600 hover:bg-gray-700">Previous Work</button>

                <Modal Header={`Previous Work`} setShowModal={setShowPrev} showModal={showPrev} thin={true} height={'h-[50%]'}>
                    
                    <div className="flex">
                    <input value={temp} onChange={(e)=>{setTemp(e.target.value)}} type="text"className="w-[70%] bg-gray-600  outline-none p-2 rounded-lg text-gray-400 font-bold" placeholder={'Previous Job'} />
                    <button onClick={()=>{setPreviousWork((prev)=>[...prev,temp]);setTemp('')}} className="p-2 w-[30%] ml-2 rounded-lg bg-pink-400 hover:bg-pink-600 font-bold text-gray-300">Add</button>
                    </div>

                    {previousWork.map((i)=>{
                        return(
                            <div  className="p-2 my-2 bg-gray-700 rounded-lg mt-5 text-left text-gray-300 font-semibold ">
                                {i}
                            </div>

                        )
                    })}


                    

                </Modal>

                </div>


               
                                </div>


                

                                <div class="relative mx-auto border-gray-900  bg-gray-900 border-[14px] rounded-[2.5rem] h-[600px] w-[300px]">
                <div class="h-[32px] w-[3px] bg-gray-900  absolute -left-[17px] top-[72px] rounded-l-lg"></div>
                <div class="h-[46px] w-[3px] bg-gray-900  absolute -left-[17px] top-[124px] rounded-l-lg"></div>
                <div class="h-[46px] w-[3px] bg-gray-900  absolute -left-[17px] top-[178px] rounded-l-lg"></div>
                <div class="h-[64px] w-[3px] bg-gray-900  absolute -right-[17px] top-[142px] rounded-r-lg"></div>
                <div style={{ fontFamily: font.value }} class={`rounded-[2rem] w-[272px] h-[572px] overflow-auto ${bg}`}>
                   
                   
                   <div className="p-2">
                   <p  className={`${text} mt-10 text-2xl font-bold`}>{Header}</p>
                

                <div  className={`${text} text-center place-content-center flex mt-4 text-md  font-light`}>
                    <p className="cursor-pointer">Gallery</p>
                    <p className="ml-10 cursor-pointer">About</p>

                </div>

                {PFP?<img  src={URL.createObjectURL(PFP)} alt="Uploaded Image" className=" mt-5 ml-12 p-3 rounded-2xl w-[60%] h-[30%]" />:null}

                <div className="flex place-content-center mt-2">
                    {Medialink.Instagram? <InstagramButton small={true} bg={bg} text={text}  link={Medialink.Instagram}/>  :null}
                    {Medialink.Artstation? <ArtStationButton small={true} bg={bg} text={text}  link={Medialink.Artstation}/>  :null}
                    {Medialink.Reddit? <RedditButton small={true} bg={bg} text={text}  link={Medialink.Reddit}/>  :null}
                    {Medialink.Twitter? <TwitterButton small={true} bg={bg} text={text}  link={Medialink.Twitter}/>  :null}
                    {Medialink.Pinterest? <PinterestButton small={true} bg={bg} text={text}  link={Medialink.Pinterest}/>  :null}


                </div>



                <p className={`${text} px-6 mt-10 text-md font-normal`}>{About}</p>

                {previousWork.length!==0? 
                <div >
                    <p className={`${text} px-6 mt-10 text-lg font-semibold`}>Experience</p>
                    {previousWork.map((i)=>{
                        return(
                            <p  className={`p-2 my-2  rounded-lg mt-5 text-center ${text} font-normal `}>
                                {i}
                            </p>

                        )
                    })}

                </div>
                
                :null
            }
                   </div>
                    
                </div>
</div>

                               

            
            </div>
            <button onClick={()=>{uploadData();}} className="p-4 bg-pink-400 my-8 hover:bg-pink-600 rounded-xl w-[90%] mr-12 text-white font-bold">Done</button>
        </div>

    )
}