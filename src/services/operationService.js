import axios from "axios";
import {operations} from "../config/constantURL";

export const getOperations = () => {
    return axios.get(operations);
}
