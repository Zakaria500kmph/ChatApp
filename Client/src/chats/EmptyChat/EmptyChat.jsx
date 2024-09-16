import Lottie from "react-lottie"
import {animationDefaultOptions} from "../../Utils/ProfileHandler"
function EmptyChat() {
  return (
    <div className="bg-slate-800 w-full 
        md:flex
        duration-1000 transition-all hidde justify-center items-center">
    <Lottie
    isClickToPauseDisabled={true}
    height={200}
    width={200}
    options={animationDefaultOptions}
    /> 
    <div className="text-white font-medium text-5xl p-[40px] font-sans">
        Hi <span className="text-purple-600">!</span>  Welcome To this <span className="text-purple-600">Chatapp</span>
        </div>
    </div>
  )
}

export default EmptyChat