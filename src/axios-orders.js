import axios from "axios";

const instance = axios.create({
  baseURL: "https://my-react-burger-5fc4f-default-rtdb.firebaseio.com/",
});

export default instance;
