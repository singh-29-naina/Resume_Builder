import axios from "axios";

const aiApi = axios.create({
    baseURL: "https://resume-builder-2-8dbm.onrender.com",
});

export default aiApi;