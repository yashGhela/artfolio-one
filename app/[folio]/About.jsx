import Link from "next/link";

import { ArtStationButton, InstagramButton, PinterestButton, RedditButton, TwitterButton } from '../Components/MediaButtons';
import ArtfolioTag from "../Components/ArtfolioTag";
import SEO from "../Components/SEO";
import { ContactLink } from "../Components/FolioContact";

export default function AboutComp({config, isPro, folio, email}){

    

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

    return(

      
        
           
          
         
         <main
         style={{fontFamily: font.value}}
         className={` flex self-center place-content-center ${bg} ${text}   text-center p-5 max-w-full min-w-screen  min-h-screen max-h-full overflow-hidden`}>

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
                    <Link href={`/${folio}/`}  className="cursor-pointer mr-10">Gallery</Link>
                    <Link href={`/${folio}/About`}  className="ml-10 cursor-pointer">About</Link>
                    <ContactLink bg={bg} text={text} rounding={roundingValue} useremail={email}/>


    </div>

    <div className=" place-content-center mt-20 flex-col self-center ">
    <img className="w-96 h-96 self-center md:ml-[35%] ml-1 sm:ml-32 rounded-lg" src={PFP} alt="" />

    <div className="flex place-content-center mt-5">
                    {Medialink.Instagram? <InstagramButton bg={bg} text={text}  link={Medialink.Instagram}/>  :null}
                    {Medialink.Artstation? <ArtStationButton bg={bg} text={text}  link={Medialink.Artstation}/>  :null}
                    {Medialink.Reddit? <RedditButton bg={bg} text={text}  link={Medialink.Reddit}/>  :null}
                    {Medialink.Twitter? <TwitterButton bg={bg} text={text}  link={Medialink.Twitter}/>  :null}
                    {Medialink.Pinterest? <PinterestButton bg={bg} text={text}  link={Medialink.Pinterest}/>  :null}


                </div>

                <p className={` sm:px-52 text-clip mt-10 text-md font-normal`}>{About}</p>

                {previousWork.length!==0? 
                <div >
                    <p className={`${text} px-6 mt-20 text-lg font-semibold`}>Experience</p>
                    {previousWork.map((i)=>{
                        return(
                            <p  className={`p-2 my-2  rounded-lg mt-5 text-center  font-normal `}>
                                {i}
                            </p>

                        )
                    })}

                </div>
                
                :null
            }

            <footer className="md:ml-52">

            <div className="flex place-content-start mt-[10%]">
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
    </div>
    </main>
 
    )


}