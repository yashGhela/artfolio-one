import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "./firebaseConfig"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export const grabPro=async({user, setisPro})=>{

    let ref=doc(db,'Users',user)

   

    await getDoc(ref).then((snap)=>{
        if (snap.data().paid){
            setisPro(true)
        }
    })

  

}


export const withAuth=(WrappedComponent)=>{
  const WithAuth= (props) => {
    const [user, setUser] = useState(null);
    const router = useRouter()

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          // User is logged in
          setUser(authUser);
        } else {
          // User is not logged in
          setUser(null);
          router.push('/auth?state=Login')

        }
      });

      // Unsubscribe when the component unmounts
      return () => unsubscribe();
    }, []);

    return <WrappedComponent user={user} {...props} />;
  };

  return WithAuth
}


export const colorSchemes = [
    { bg: "bg-red-300", text: "text-yellow-100" },
    { bg: "bg-blue-200", text: "text-green-600" },
    { bg: "bg-green-100", text: "text-blue-300" },
    { bg: "bg-yellow-100", text: "text-purple-300" },
    { bg: "bg-pink-200", text: "text-teal-700" },
    { bg: "bg-indigo-200", text: "text-rose-400" },
    { bg: "bg-purple-200", text: "text-amber-500" },
    { bg: "bg-teal-100", text: "text-violet-300" },
    { bg: "bg-lime-700", text: "text-lime-400" },
    { bg: "bg-cyan-300", text: "text-gray-700" },
    { bg: "bg-lime-200", text: "text-gray-700" },
    { bg: "bg-rose-300", text: "text-red-700" },
    { bg: "bg-violet-200", text: "text-blue-300" },
    { bg: "bg-emerald-600", text: "text-green-300" },
    { bg: "bg-amber-100", text: "text-yellow-500" },
    { bg: "bg-gray-100", text: "text-pink-300" },
    { bg: "bg-gray-700", text: "text-indigo-300" },
    { bg: "bg-gray-100", text: "text-rose-300" },
    { bg: "bg-gray-700", text: "text-teal-300" },
    { bg: "bg-gray-100", text: "text-orange-300" },
    { bg: "bg-red-100", text: "text-cyan-700" },
    { bg: "bg-blue-100", text: "text-rose-300" },
    { bg: "bg-green-100", text: "text-amber-700" },
    { bg: "bg-yellow-200", text: "text-violet-300" },
    { bg: "bg-pink-300", text: "text-emerald-300" },
    { bg: "bg-indigo-300", text: "text-indigo-700" },
    { bg: "bg-purple-300", text: "text-purple-700" },
    { bg: "bg-teal-100", text: "text-teal-900" },
    { bg: "bg-orange-100", text: "text-red-300" },
    { bg: "bg-cyan-100", text: "text-green-900" },
    { bg: "bg-lime-100", text: "text-yellow-700" },
    { bg: "bg-rose-300", text: "text-pink-900" },
    { bg: "bg-violet-300", text: "text-indigo-900" },
    { bg: "bg-emerald-300", text: "text-violet-500" },
    { bg: "bg-amber-100", text: "text-teal-300" },
    { bg: "bg-gray-200", text: "text-orange-300" },
    { bg: "bg-gray-200", text: "text-cyan-300" },
    { bg: "bg-gray-700", text: "text-rose-300" },
    { bg: "bg-gray-100", text: "text-amber-300" },
    { bg: "bg-gray-100", text: "text-gray-700" },
    { bg: "bg-gray-700", text: "text-amber-300" },
    { bg: "bg-gray-700", text: "text-blue-300" },
    { bg: "bg-slate-700", text: "text-lime-300" },
    { bg: "bg-slate-900", text: "text-gray-200" },
    // ... Add more color schemes here
  ];


  
  export const limitColorSchemes=[

    { bg: "bg-red-300", text: "text-yellow-100" },
    { bg: "bg-blue-200", text: "text-green-600" },
    { bg: "bg-green-100", text: "text-blue-300" },
    { bg: "bg-yellow-100", text: "text-purple-300" },

 
    { bg: "bg-purple-200", text: "text-amber-500" },
    { bg: "bg-teal-100", text: "text-violet-300" },

    { bg: "bg-cyan-300", text: "text-gray-700" },
    { bg: "bg-lime-200", text: "text-gray-700" },
    { bg: "bg-rose-300", text: "text-red-700" },
    
    { bg: "bg-slate-900", text: "text-gray-200" },
    { bg: "bg-gray-100", text: "text-rose-300" },
    { bg: "bg-gray-100", text: "text-gray-700" },

  ]


  export const fontOptions = [
    { family: 'Arial', value: 'Arial' },
    { family: 'Helvetica', value: 'Helvetica' },
    { family: 'Georgia', value: 'Georgia' },
    { family: 'Times New Roman', value: 'Times New Roman' },
    { family: 'Courier New', value: 'Courier New' },
    { family: 'Verdana', value: 'Verdana' },
    { family: 'Trebuchet MS', value: 'Trebuchet MS' },
    { family: 'Arial Narrow', value: 'Arial Narrow' },
    { family: 'Lucida Sans Unicode', value: 'Lucida Sans Unicode' },
    { family: 'Palatino Linotype', value: 'Palatino Linotype' },
    { family: 'Book Antiqua', value: 'Book Antiqua' },
    { family: 'Arial Black', value: 'Arial Black' },
    { family: 'Impact', value: 'Impact' },
    { family: 'Lucida Console', value: 'Lucida Console' },
    { family: 'Garamond', value: 'Garamond' },
    { family: 'Tahoma', value: 'Tahoma' },
    { family: 'Franklin Gothic Medium', value: 'Franklin Gothic Medium' },
    { family: 'Century Gothic', value: 'Century Gothic' },
    { family: 'Copperplate', value: 'Copperplate' },
    { family: 'Brush Script MT', value: 'Brush Script MT' },
    { family: 'Roboto', value: 'Roboto' },
    { family: 'Poppins', value: 'Poppins' },
    { family: 'Montserrat', value: 'Montserrat' },
    { family: 'Oswald', value: 'Oswald' },
    { family: 'Avenir', value: 'Avenir' },
    { family: 'Nunito', value: 'Nunito' },
    { family: 'Cabin', value: 'Cabin' },
    { family: 'Dancing Script', value: 'Dancing Script' },
    { family: 'Pacifico', value: 'Pacifico' },
    { family: 'Playfair Display', value: 'Playfair Display' },
  ];

  export const roundingOptions=[
    {title: 'None', value: 'rounded-none'},
    {title: 'Small', value: 'rounded-sm'},
    {title: 'Medium', value: 'rounded-md'},
    {title: 'Large', value: 'rounded-lg'},
    {title: 'Extra Large', value: 'rounded-xl'}

  ]