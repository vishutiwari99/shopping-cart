import { useEffect, useState } from 'react';
import axios from "axios";
import './PaymentScreen.css'
function PaymentScreen() {

    const [data, setData] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPrivateDate = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            };

            try {
                const {
                    data
                } = await axios.get("/api/private", config);
                setData(data.data);
            } catch (error) {
                localStorage.removeItem("authToken");
                setError("You are not authorized please login");
            }
        };

        fetchPrivateDate();
    }, []);
    return error ? (
        <span className="error-message">{error}</span>
    ) : (
            <div>{data} <h1>Hello</h1></div>
        );

}

export default PaymentScreen
