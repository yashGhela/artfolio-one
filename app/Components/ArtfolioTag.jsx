'use client'

export default function ArtfolioTag({text}){

    return(
        <div onClick={()=>{window.location.href = 'https://artfolio.space'}}  className={`mt-[5px] cursor-pointer underline ${text}  rounded-lg ml-[30%] text-center font-normal `}>
                                Made With Artfolio
                            </div>
    )
}