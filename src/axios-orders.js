import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-project-47d7c-default-rtdb.firebaseio.com/",
  
});

export default instance;
