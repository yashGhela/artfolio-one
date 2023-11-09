import { db } from "../firebaseConfig";
import {  addDoc, collection, doc, getDoc, getDocs, increment, query, updateDoc, where } from "firebase/firestore"

import admin from 'firebase-admin'

export async function getConfig (folioid){

    let ref = collection(db,'Users')

    let q = query(ref, where("folio", "==",folioid)) 

    let configdata;

    
    
    try{
        await getDocs(q).then(async(snap)=>{

            if (!snap.empty){
                let docref=snap.docs[0].ref.id
    
            let ref =doc(db,'Users',docref,'Configs','BaseConfig');
    
    
            await getDoc(ref).then((snap)=>{
                 configdata= snap.data()
            })
            }else{
                return null
            }
        })
    
        return configdata
    
    }catch{
        return console.error('Error occured')
    }

}

export async function getPro(folioid){
    let ref = collection(db,'Users')

    let q = query(ref, where("folio", "==",folioid)) 

    let ispro;

    await getDocs(q).then(async(snap)=>{

        if (!snap.empty){
            let docref=snap.docs[0].ref.id
        let ref=doc(db,'Users',docref)


        await getDoc(ref).then((snap)=>{
             ispro=snap.data().paid
        })
        }else{
            return null
        }
    })

    return ispro
}

export async function getWorks (folioid){

    let ref = collection(db,'Users')



    let q = query(ref, where("folio", "==",folioid)) 

    let works;

    
   
    try{
        await getDocs(q).then(async(snap)=>{

            let docref=snap.docs[0].ref.id
            let ref=collection(db,'Users',docref,'Works')
    
    
            await getDocs(ref).then((snap)=>{
                 works= snap.docs.map((doc)=>({...doc.data(), id: doc.id}))
            })
        })
    
        return works
    }catch{
        return console.error('Error occured')
    }


}


export async function getEmail(folioid){

    let ref = collection(db,'Users')



    let q = query(ref, where("folio", "==",folioid)) 

    let email;

    try{
        await getDocs(q).then(async(snap)=>{

            let docref=snap.docs[0].ref.id
            

            await getDoc(doc(db,'Users', docref)).then((snap)=>{
                email= snap.data().email
            })
        })
    
        return email
    }catch{
        return console.error('Error occured')
    }

}

/*export async function addAnalytics (folioid,page){

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0]; 

    let ref = collection(db,'Users')

    let q = query(ref, where("folio", "==",folioid)) 
    let flag=false;

    
        try{
            await getDocs(q).then(async(snap)=>{
               if (!snap.empty){
                let docref=snap.docs[0].ref.id
                let ref=collection(db,'Users',docref,'Analytics')
    
                let queryref= query(ref, where("Date", "==", formattedDate), where('Page','==', page))
    
                await getDocs(queryref).then(async(snap)=>{
    
                    if (snap.exists()){
                        let anadoc = doc(db,'Users',docref, 'Analytics',snap.docs[0].ref.id)
    
                        await updateDoc(anadoc,{
                            pageviews: increment(1)
                        }).then(()=>{
                            flag=true
                        })
                    }else {
    
                        await addDoc(ref,{
                            Date: formattedDate,
                            pageviews: 1,
                            page: page
                        }).then(()=>{
                            flag=true
                        })
                    }
                })
               }
    
            })

            if (flag){
                console.log('success')
            }else {
                console.log('no worky')
            }

            

            
        }catch (err){
            console.log(err)
        }
    

};*/



