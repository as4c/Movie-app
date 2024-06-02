import axios from "axios";

export const getFavoourite = async () => {
    try {
        const token = localStorage.getItem("token");
        
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/favourites/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        console.log("res...", response);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        return error
    } 

}