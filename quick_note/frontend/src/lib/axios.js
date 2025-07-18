import axios from "axios"

// Create an axios object which is used to send requests to the backend api's
const api = axios.create({
    baseURL: "http://localhost:5001/api"
})

export default api