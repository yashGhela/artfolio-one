export default function TestimonialAvatars(){
    return(
       <div>
         <div className="flex items-center space-x-2 mt-4">
      {/* Avatar 1 */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
          alt="Avatar 3"
          className="w-10 h-10 rounded-full bg-cover brightness-50 border-[2px] border-white"
        />
        
      </div>

      {/* Avatar 2 */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1542596768-5d1d21f1cf98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
          alt="Avatar 3"
          className="w-10 h-10 rounded-full bg-cover brightness-50 border-[2px] border-white"
        />
        
      </div>

      {/* Avatar 3 */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Avatar 3"
          className="w-10 h-10 rounded-full bg-fit brightness-50 border-[2px] border-white"
        />
        
      </div>
      
    </div>
    <p className="text-gray-400 text-sm mt-2">Loved by 100+ artists</p>
       </div>
    )
}