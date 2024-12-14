import {useSelector} from "react-redux"
function UploadfileUI() {
  let status=useSelector((store)=>store.uploads?.uploadingStatus)
  return (
    <center className="min-h-[73vh] pt-[20%] bg-slate-600">
      <p className="font-bold">
        Uploading File Please wait...
      </p>
      <p>{status} %</p>
    </center>
  )
}

export {UploadfileUI}