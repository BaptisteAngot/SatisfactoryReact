import axios from "axios";
import {articles} from "../config/constantURL";


export const createArticle = (data) => {
    console.log([data]);
    return axios.post(articles, [data]);
}

export const getArticles = () => {
    return axios.get(articles);
}