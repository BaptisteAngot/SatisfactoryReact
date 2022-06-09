import {useEffect, useState} from "react";
import {getArticles} from "../../services/articleService";
import ElementArticle from "./ElementArticle";

const functions = require('../../utils/filter.js');

const SearchArticles = ({addArticles}) => {
    const [search,setSearch] = useState("");
    const [articles,setArticles] = useState([]);
    const [articlesFiltered,setArticlesFiltered] = useState([]);
    useEffect(() => {
        getArticles().then(res => {
            setArticles(res.data);
        });
    },[]);
    return(
        <div>
            <label>Search Articles</label>
            <input name={"Search articles"} value={search} onChange={(event) => {
                setSearch(event.target.value);
                setArticlesFiltered(functions.filterArticles(event.target.value,articles));
            }}/>
            <div>
                {
                    articlesFiltered.length > 0 ?
                        articlesFiltered.map((article, index) => {
                            return (
                                <ElementArticle key={index} addArticle={addArticles} article={article}/>
                            )
                        })
                        :
                        <div>No articles found</div>
                }
            </div>
        </div>
    )
}

export default SearchArticles;