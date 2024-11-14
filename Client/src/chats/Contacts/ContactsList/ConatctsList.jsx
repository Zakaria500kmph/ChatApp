import axios from "axios";
import { useEffect, useState } from "react";
import ContactShowCard from "./ContactShowCard";
import 'bootstrap/dist/css/bootstrap.css';

function ContactsList() {
    const [List, setList] = useState([]);
    const [ShowLoader,setShowLoader]=useState(true)
    async function getContactsData() {
        const option = {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        };

        try {
            const response = await axios.get("/contacts/GetAllContacts", option);
            setList(response?.data);
        } catch (error) {
            console.error("Error fetching contacts data:", error);
        }
    }
 
    useEffect(() => {
        getContactsData();
        setTimeout(()=>{setShowLoader(false)},5000)
    }, []);

    return (
        <div className="my-16">
            {List?.length > 0 ? (
                List.map((item) => (
                <ContactShowCard item={item} className=""/>
                ))
            ) : (
                ShowLoader ? <div className="">
                    <div class="spinner-grow text-light" role="status">
                <span class="sr-only">Loading...</span>
              </div>
              </div>:
              <div className="text-center text-slate-400">Sorry you did not Message to anyone</div>
                    
                
            )}
        </div>
    );
}

export default ContactsList;
