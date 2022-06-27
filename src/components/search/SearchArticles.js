import {useEffect, useState} from "react";
import {getArticles} from "../../services/articleService";
import ElementArticle from "./elements/ElementArticle";
import {styleGlobal} from "../../asset/styleGlobal";

const functions = require('../../utils/filter.js');

const SearchArticles = ({addArticles, listArticlesCreate, indexArticle}) => {
    const [search,setSearch] = useState("");
    const [articles,setArticles] = useState([]);
    const [articlesFiltered,setArticlesFiltered] = useState([]);
    useEffect(() => {
        getArticles().then(res => {
            setArticlesFiltered(functions.filter("",res.data));
            setArticles([...res.data, ...listArticlesCreate, ...articles]);
        });
    },[]);
    useEffect(() => {
        setArticles([...articles, ...listArticlesCreate]);
    },[listArticlesCreate]);
    return(
        <div style={styleGlobal.searchContainer}>
            <label style={styleGlobal.label}>Search Articles</label>
            <input style={styleGlobal.input} name={"Search articles"} value={search} onChange={(event) => {
                setSearch(event.target.value);
                setArticlesFiltered(functions.filter(event.target.value,articles));
            }}/>
            <div style={styleGlobal.elementContainer}>
                {
                    articlesFiltered.length > 0 ?
                        articlesFiltered.map((article, index) => {
                            if (index === 5) {
                                return <div key={index} style={{...styleGlobal.label, alignSelf:"center"}}>...</div>
                            }else if (index > 5){
                                return null;
                            }
                            return (
                                <ElementArticle key={index} addArticle={addArticles} indexArticle={indexArticle} article={article}/>
                            )
                        })
                        :
                        <div style={{...styleGlobal.label, alignSelf: "center"}}>No articles found</div>
                }
            </div>
        </div>
    )
}

const styles = {

};

export default SearchArticles;