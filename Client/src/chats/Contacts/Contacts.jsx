import logo from "../../../public/l.webp"
function Contacts() {
  return (
<div className="w-[30%] bg-slate-800 text-white h-[100%] border-solid 
        border-[1px] border-gray-500">
        <div className="flex border-solid border-[1px] h-[100px] bg-slate-600">
        <h1 className="font-medium text-4xl py-8 pl-8 ">ChatApp</h1>
        <img src={logo} alt="LOGO!!" className="size-[150px] relative top-[-20px]"/>
        </div>
        <div className="p-4 text-slate-400">Direct me To messages</div>
        <div className="p-4 text-slate-400">Channels</div>
        
    </div>  )
}

export default Contacts