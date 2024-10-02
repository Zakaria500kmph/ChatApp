import asyncHandler from "../utils/asyncHandler.js"

const Search=asyncHandler(async(req,res)=>{
    console.log(req.body)
})
export {Search}