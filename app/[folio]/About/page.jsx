
import { httpsCallable } from "firebase/functions";
import AboutComp from "../About";
import { addAnalytics, getConfig, getEmail, getPro } from "../common";
import { functions } from "../../firebaseConfig";



export default async function About({params}){

    const config= await getConfig(params.folio)

    const isPro=await getPro(params.folio);

    const email = await getEmail(params.folio)

    //const addAnalytics = httpsCallable(functions, "addAnalytics");

    
    /*if(isPro){
      addAnalytics({ folioid: params.folio, page: "About" })
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
          <AboutComp isPro={isPro} config={config} folio={params.folio} email={email}/>
    </div>
    )


}