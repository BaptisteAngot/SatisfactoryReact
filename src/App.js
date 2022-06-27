import {useEffect, useState} from "react";
import {createArticle} from "./services/articleService";
import SearchOperations from "./components/search/SearchOperations";
import SearchCategories from "./components/search/SearchCategories";
import SearchArticles from "./components/search/SearchArticles";
import {styleGlobal} from "./asset/styleGlobal";

const functions = require('./utils/parsing.js')

function App() {
  const [code,setCode] = useState("");
  const [codeRes,setCodeRes] = useState("");
  const [codeNewArticle,setCodeNewArticle] = useState("");
  const [listArticleCreated,setListArticleCreated] = useState([]);

  const [category,setCategory] = useState({});
  const [article,setArticle] = useState([]);
  const [refreshArticle,setRefreshArticle] = useState(true);
  const [operation,setOperation] = useState({});

  const [result,setResult] = useState({error : "Empty"});

  const addArticle = (item, index) => {
      let newArticle = article;
      newArticle[index] = item;
      setArticle(newArticle);
      setRefreshArticle(!refreshArticle);
  }

  const createTempArticle = () => {
      if (result.error){
          alert(result.error);
      }else{
          setCodeRes(codeRes+code);
          setListArticleCreated(listArticleCreated.concat({
              libelle: `your article`,
              code: result.data.codeArticle,
              id_categorie: result.data.codeCategorie,
          }));
          setResult({error : "Empty"});
          setOperation({});
          setCodeNewArticle("");
          setCategory({});
          setArticle([]);
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
              if (item) {
                  codeArticle += "["+item.code+"*"+item.quantite+"]";
              }
          });
      }
      let res = codeCategory+":"+codeNewArticle+"="+"("+codeOperation+")"+codeArticle+";";
      setCode(res);
      setResult(functions.parseStringToJson(res));
  }, [codeNewArticle, category, article, operation, refreshArticle]);

  return (
      <div style={styles.body}>
        <div style={styles.container}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop:"30px",
                marginBottom:"100px",
            }}>
                <label style={styleGlobal.label}>Code</label>
                <input style={{...styleGlobal.input,...styles.inputCode}} name={"code input"} value={code} onChange={(event) => {
                    setCode(event.target.value);
                }}/>
            </div>
            {!result.error ? (
                <div >
                    <p>codeArticle : {result.data.codeArticle}</p>
                    <p>codeCategory : {result.data.codeCategorie}</p>
                    <p>codeOperation : {result.data.codeOperation}</p>
                    <p>Articles : </p>
                    {
                        result.data.articles.map((item) => {
                            return<div>
                                <p>codeArticle : {item.codeArticle}</p>
                                <p>quantite : {item.quantite}</p>
                            </div>
                        })
                    }
                </div>
            ):(
                <p>{result.error}</p>
            )}
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent:"space-between",
                width:"100%",
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft:"30px",
                    marginBottom:"50px",
                }}>
                    <label style={styleGlobal.label}>code Article</label>
                    <input style={{...styleGlobal.input,...styles.inputArticle}} name={"code Article"} value={codeNewArticle} onChange={(event) => {
                        setCodeNewArticle(event.target.value);
                    }}/>
                </div>
                <input value={"Add"}
                       className={"btn"}
                       style={{
                           ...styleGlobal.button,
                           marginRight:"10%",
                           width:"100px",
                           height:"50px",
                           backgroundColor:"#00bcd4",
                        }}
                       type={"submit"}
                       onClick={() => {
                           createTempArticle();
                           /*createArticle(result).then(r => console(r));*/
                       }}/>
            </div>

            <div style={styles.searchContainer}>
                <SearchOperations addOperation={setOperation}/>
                <SearchCategories addCategory={setCategory}/>
                <SearchArticles addArticles={addArticle} listArticlesCreate={listArticleCreated} indexArticle={0}/>
                <SearchArticles addArticles={addArticle} listArticlesCreate={listArticleCreated} indexArticle={1}/>
            </div>
            <p>
                {codeRes}
            </p>
            <input value={"Push"}
                   className={"btn"}
                   style={{
                       ...styleGlobal.button,
                       marginRight:"10%",
                       width:"100px",
                       height:"50px",
                       backgroundColor:"#00bcd4",
                   }}
                   type={"submit"}
                   onClick={() => {
                       let res = [];
                       let array = codeRes.split(";");
                       array.pop();
                       array.forEach((item) => {
                           res.push(functions.parseStringToJson(item).data);
                       });
                       setCodeRes("");
                       setResult({error : "Empty"});
                       setOperation({});
                       setCategory({});
                       setArticle([]);
                       setCode("");
                       createArticle(res).then(() =>  alert("Envoyé")).catch(r => alert(`Error : ${r}`));
                   }}/>
        </div>
      </div>
  );
}
const styles = {
    body:{
        backgroundColor: "rgba(16,52,84,1)",
        margin: "-8px",
        height: "100vh",
    },
    container: {
        backgroundColor: "rgba(16,52,84,1)",
        display: "flex",
        flexDirection: "column",
    },
    inputCode: {
        width:"400px",
    },
    inputArticle: {
        width:"300px",
    },
    searchContainer:{
        display: "flex",
        flexWrap: "wrap",
        width:"100%",
        flexDirection: "row",
        justifyContent: "space-around",
    }
}

export default App;
