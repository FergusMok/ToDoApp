import { API_LINK } from "./API_LINK";
import axios from "axios";

const emailAllUsers = async () => {
  // Put request to mark complete
  console.log(`${API_LINK}emailUsers`);
  await axios
    .get(`${API_LINK}emailUsers`, {})
    .then((resp) => {
      console.log(resp);
    })
    .catch((resp) => console.log(resp));
};

export default emailAllUsers;
