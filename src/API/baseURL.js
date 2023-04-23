import axios from "axios";

const baseURL = axios.create({baseURL: 'https://todo-47438-default-rtdb.europe-west1.firebasedatabase.app'});
export default baseURL;