import {useState} from "react";

const ElementArticle = ({addArticle, article}) => {
    const [qty,setQty] = useState(0);
    return (
        <div>
            <input
                type={"button"}
                value={article.code+" - "+article.libelle}
                onClick={() => {addArticle(article)}}
            />
            <input
                type={"number"}
                value={qty}
                onChange={(event) => {
                    setQty(event.target.value);
                    article.quantite = event.target.value;
                }}
            />
        </div>
    )
}
export default ElementArticle;