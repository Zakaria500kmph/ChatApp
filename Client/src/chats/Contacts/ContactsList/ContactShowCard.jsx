
function ContactShowCard({item}){
    
    function OpenChat(){}
    return  <div className="my-2 border-[1px] border-black border-solid w-[95%] ml-1  flex cursor-pointer" onClick={()=>OpenChat()}>
    <img src={item?.image?`${item.image}`:"https://th.bing.com/th/id/OIP.0IxGb16dYqy8akb1Ha0qsQHaEK?rs=1&pid=ImgDetMain"} alt="profile" className="size-16 m-2 rounded-full" />
        <div>
            {item.username}
            <div className="text-[10px] text-slate-400">
               Last Message On : {item.LastMessage.slice(0,9)}
            </div>
            <div className="text-[10px] text-slate-300">
                {item.email}
            </div>
            </div>
    </div>
}
export default ContactShowCard