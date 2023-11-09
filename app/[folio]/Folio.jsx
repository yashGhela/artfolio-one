import FolioImg from "../Components/FolioImg";
import Link from "next/link";
import { ArtStationButton, InstagramButton, PinterestButton, RedditButton, TwitterButton } from "../Components/MediaButtons";
import ArtfolioTag from "../Components/ArtfolioTag";
import SEO from "../Components/SEO";
import { ContactLink } from "../Components/FolioContact";




export default function Folio({isPro, config, works, folio, email}){

    let bg= config.bg;

    let text= config.text;

    let Header= config.Header

    let About= config.About;

    let Medialink= config.Medialink;

    let PFP= config.PFP;

    let font = config.font

    let previousWork= config.previousWork

    let rounding= config.rounding
    

    const roundingValue = rounding && rounding.value !== undefined ? rounding.value : 'rounding-md';

    let show=false


    


    return(
       
        
          
         
        
         <main
         style={{fontFamily: font.value}}
         className={` flex self-center place-content-center ${bg} ${text} text-center p-5 max-w-full min-w-screen  min-h-screen max-h-full overflow-auto`}>

            <SEO 
           keywords={`${Header}, ${Header} Portfolio, ${Header} art, ${Header} works, ${Header} commisions, ${Header} contact, ${Header} Artfolio, ${Header} Portfolio, ${Header} Experience, ${Header} About `}
           description={About}
           image={PFP}
           url={`artfolio.space/${folio}`}
           title={Header}
           />
     
   

     <div className=' md:w-[70rem] lg:w-[80rem] w-[40rem] mr-0 flex-col'>
     <p  className={` mt-10 text-4xl font-normal`}>{Header}</p>
     
     <div  className={` text-center place-content-center flex mt-10 text-md  font-normal`}>
                    <Link href={`/${folio}/`}  className="cursor-Linkointer mr-10">Gallery</Link>
                    <Link href={`/${folio}/About`}  className="ml-10 cursor-pointer">About</Link>
                    <ContactLink bg={bg} text={text} rounding={roundingValue} useremail={email}/>
                   

    </div>

  
    

    


    <div className="flex-col p-4 sm:grid md:grid-cols-3 sm:grid-cols-2 gap-2 mt-20 ml-5 sm:ml-0">

        {works.map((i)=>{
          return <FolioImg i={i} rounding={roundingValue} />
            
          
        })}

    </div>

    
    <footer className="md:ml-52">

        <div className="flex place-content-start mt-[20%]">
                {Medialink.Instagram? <InstagramButton bg={bg} text={text} small={true}  link={Medialink.Instagram}/>  :null}
                {Medialink.Artstation? <ArtStationButton bg={bg} text={text}  small={true} link={Medialink.Artstation}/>  :null}
                {Medialink.Reddit? <RedditButton bg={bg} text={text}  small={true} link={Medialink.Reddit}/>  :null}
                {Medialink.Twitter? <TwitterButton bg={bg} text={text} small={true}  link={Medialink.Twitter}/>  :null}
                {Medialink.Pinterest? <PinterestButton bg={bg} text={text}  small={true} link={Medialink.Pinterest}/>  :null}

                {isPro?null: <ArtfolioTag text={text}/>}


                {isPro?

<p className={`  text-md font-normal invisble sm:visible  sm:ml-[50%] md:ml-[75%]`}>{Header}</p>
        
    :<p className={`  text-md font-normal invisble sm:visible  sm:ml-[20%]`}>{Header}</p>}


            </div>



        </footer>

   

        
        
     </div>
     </main>
  
    )


}