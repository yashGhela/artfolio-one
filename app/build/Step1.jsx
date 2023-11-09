import { colorSchemes, limitColorSchemes } from "../Common";


export default function Step1({setStep1, setbg, settext, setStep2}){

   

    return(
        <div className=" mt-[15%] w-full md:w-[70%] h-[500px]  md:ml-[220px] rounded-xl overflow-auto">
            <p className="text-2xl font-bold py-3 text-gray-300">Choose a Color Scheme</p>

            <hr className="py-3" />

            <div className="grid md:grid-cols-4 grid-cols-2 p-8">
            {limitColorSchemes.map((scheme, index) => (
                    <div
                    key={index}
                    className="w-[100%] rounded-xl border-[3px] border-gray-900 flex h-[75px] cursor-pointer"
                    onClick={()=>{setStep1(false); setbg(scheme.bg); setStep2(true); settext(scheme.text)}}
                    >
                    <div className={`w-[100%] ${scheme.bg} rounded-md`}>
                    <p className={` ${scheme.text} text-md font-bold text-center mt-5`}>Artfolio</p>
                    
                    </div>
                    
                    </div>
                ))}
      
                    

                </div>
                
            </div>


        
       
    )
}