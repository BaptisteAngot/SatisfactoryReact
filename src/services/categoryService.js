import axios from "axios";
import {categories} from "../config/constantURL";

export const getCategories = () => {
    return axios.get(categories);
}