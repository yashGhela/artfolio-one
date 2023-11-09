

import {  collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"
import { db, functions } from "../firebaseConfig"

import Folio from "./Folio";
import { addAnalytics, getConfig, getEmail, getPro, getWorks } from "./common";
import { httpsCallable } from "firebase/functions";









export default async function folio({params}){


  

    const config= await getConfig(params.folio)

   

    const works = await getWorks(params.folio)

  



    const isPro=await getPro(params.folio);

    const email = await getEmail(params.folio)

    
    //const addAnalytics = httpsCallable(functions, "addAnalytics");

    /*if (isPro){
      addAnalytics({ folioid: params.folio, page: "Home" })
      .then((result) => {
        console.log(result.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    }else{
      return null
    }*/

    



    


    

    return(

        <div>
         <Folio works={works} isPro={isPro} config={config} folio={params.folio} email={email}/>
     </div>
    )



}