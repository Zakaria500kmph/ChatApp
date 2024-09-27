import { useState } from "react"

function Dm() {
    const [set,setSet]=useState(false)
    function HandleContacts(){
        setSet(true)
        console.log(set)
    }
  return (<>
    <div className="pl-14 text-3xl mt-[-7px] cursor-pointer relative group">
  <div class="absolute hidden group-hover:block bg-black text-white text-center p-2 mt-[-30px] ml-[-40px] rounded text-sm w-[100px]" >
    Add Contacts
  </div>
  <div onClick={HandleContacts}>+</div>
</div>
{set && <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
  <div class="bg-white p-8 rounded-lg shadow-lg">
    <h2 class="text-2xl mb-4 text-yellow-950">Dialog Titlc mse</h2>
    <p class="mb-4 text-blue-700">This is the dialog codjkfbjkebfwjkefudvkntent.</p>
    <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={()=>setSet(!set)}>Close</button>
  </div>
</div>
}
</>
  )
}

export default Dm