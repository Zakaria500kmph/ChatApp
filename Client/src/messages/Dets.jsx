import { IoClose } from "react-icons/io5";
function Dets() {
  return (
    <div className="w-full h-[10vh] flex ">
    <button className="absolute right-0 m-4 text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
    <IoClose className="size-[40px]"/>
    </button>
    </div>
  )
}

export default Dets