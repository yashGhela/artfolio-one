import { fontOptions } from "../Common";

export default function Step2({setStep2, setStep3, setFont}){


      

    return(

        <div 
        data-te-perfect-scrollbar-init
        className=" mt-[15%] w-full md:w-[70%] h-[500px]  md:ml-[220px] rounded-xl overflow-auto">
            <p className="text-2xl font-bold py-3 text-gray-300">Choose a Font</p>

            <div className="grid grid-cols-3 gap-4 p-2">
        {fontOptions.map((font, index) => (
          <div
           onClick={()=>{setFont(font); setStep2(false); setStep3(true)}}
            key={index}
            className="bg-gray-800 p-4 border rounded-xl text-lg text-gray-400 hover:bg-gray-200 hover:text-gray-700 cursor-pointer"
            style={{ fontFamily: font.value }}
          >
            {font.family}
          </div>
        ))}
      </div>

        </div>
    )

}