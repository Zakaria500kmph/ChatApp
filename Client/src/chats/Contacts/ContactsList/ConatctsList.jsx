import axios from "axios";
import { useEffect, useState } from "react";
import ContactShowCard from "./ContactShowCard";
import 'bootstrap/dist/css/bootstrap.css';
import { useSelector } from "react-redux";

function ContactsList() {
    const [List, setList] = useState([]);
    const [ShowLoader, setShowLoader] = useState(true);
    const Messages = useSelector((store) => store?.
    contactsInfo?.selectedChatMessages);
    async function getContactsData() {
        const option = {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        };

        try {
            const response = await axios.get("/contacts/GetAllContacts", option);
            setList(response.data);
            setShowLoader(false);  // Turn off loader after data fetch
        } catch (error) {
            console.error("Error fetching contacts data:", error);
            setShowLoader(false);  // Turn off loader even if there's an error
        }
    }

    useEffect(() => {
        getContactsData();
    }, [Messages]);

    return (
        <div className="my-16">
            {ShowLoader ? (
                <div className="text-center">
                    <div className="spinner-grow text-light" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            ) : (
                List.length > 0 ? (
                    List.map((item, index) => (
                        <ContactShowCard key={index} item={item} />
                    ))
                ) : (
                    <div className="text-center text-slate-400">Sorry, you did not message anyone</div>
                )
            )}
        </div>
    );
}

export default ContactsList;
