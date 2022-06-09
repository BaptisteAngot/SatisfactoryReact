import {useEffect, useState} from "react";
import {createArticle} from "./services/articleService";
import SearchOperations from "./components/search/SearchOperations";
import SearchCategories from "./components/search/SearchCategories";
import SearchArticles from "./components/search/SearchArticles";

const functions = require('./utils/parsing.js')

function App() {
  const [code,setCode] = useState("");
  const [codeNewArticle,setCodeNewArticle] = useState("");


  const [category,setCategory] = useState({});
  const [article,setArticle] = useState([]);
  const [operation,setOperation] = useState({});

  const [result,setResult] = useState("");

  const addArticle = (item) => {
      if (article.length < 2) {
          setArticle([...article, item]);
      }
  }

  useEffect(() => {
      let codeOperation = "";
      let codeCategory = "";
      let codeArticle = "";
      if (category.code){
          codeCategory = category.code;
      }
      if (operation.code){
          codeOperation = operation.code;
      }
      if (article.length > 0){
          article.forEach((item) => {
              codeArticle += "["+item.code+"*"+item.quantite+"]";
          });
      }
      setCode(codeCategory+":"+codeNewArticle+"="+"("+codeOperation+")"+codeArticle+";");
      functions.parseStringToJson(code);
  }, [category,article,operation]);

  return (
      <div>
        <header style={{
            display: "flex",
            flexDirection:"column",
            height:"100vh",
            justifyContent: "space-around",
            alignItems: "center",
        }}>
            <input name={"code input"} value={code} onChange={(event) => {
                setCode(event.target.value);
            }}/>
            <hr/>
            <input name={"code Article"} value={codeNewArticle} onChange={(event) => {
                setCodeNewArticle(event.target.value);
            }}/>
            <SearchOperations addOperation={setOperation}/>
            <SearchCategories addCategory={setCategory}/>
            <SearchArticles addArticles={addArticle}/>
            <input name={"submit"}
                 type={"submit"}
                 onClick={() => {
                   setResult(functions.parseStringToJson(code));
                   createArticle(result).then(r => console(r));
                 }}/>
            {result.codeArticle ? (
                <div>
                    <p>codeArticle : {result.codeArticle}</p>
                    <p>codeCategory : {result.codeCategorie}</p>
                    <p>codeOperation : {result.codeOperation}</p>
                    <p>Articles : </p>
                    {
                      result.articles.map((item) => {
                        return<div>
                          <p>codeArticle : {item.codeArticle}</p>
                          <p>quantite : {item.quantite}</p>
                        </div>
                      })
                    }
                </div>
            ):(
                <p>{result}</p>
            )}
        </header>
      </div>
  );
}

export default App;
