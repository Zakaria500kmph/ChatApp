import logo from "../../../public/l.webp"
function Contacts() {
  return (
<div className="md:w-[30%] bg-slate-800 text-white h-[100%] border-solid 
        border-[1px] border-gray-500">
        <div className="flex h-[100px]">
        <img src={logo} alt="LOGO!!" className="w-[150px] h-[150px] absolute top-[-15px] hidden md:block left-[-40px]"/>
        <h1 className="font-medium text-3xl pt-8 relative w-[100%] md:left-[40%]">ChatApp</h1>
        <div className="text-slate-500 text-[15px] absolute bottom-0"> &#169; Zakaria Siddiqui </div>
        </div>
        <div className="px-4 pt-10 text-slate-400">Direct me To messages</div>
        <div className="p-4 text-slate-400">Channels</div>
        
    </div>  )
}

export default Contacts