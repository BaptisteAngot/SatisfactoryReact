import {useState} from "react";
import {styleGlobal} from "../../../asset/styleGlobal";
const ElementArticle = ({addArticle, article, indexArticle}) => {
    const [qty,setQty] = useState(0);
    const [selected,setSelected] = useState(false);
    let styleBtn = selected ? styleGlobal.buttonSelected : {};
    const valid = () => {
        setSelected(!selected);
        if (!selected) {
            article.quantite = qty;
            addArticle(article, indexArticle);
        }else{
            addArticle(null, indexArticle);
        }
    }
    return (
        <div style={styles.container}>
            <input
                type={"button"}
                className={"btn"}
                style={{...styleGlobal.button,...styleBtn}}
                value={article.code+" - "+article.libelle}
                onClick={() => {
                    qty > 0 ? valid() : alert("Veuillez entrer une quantité");
                }}
            />
            <input
                type={"number"}
                style={{...styleGlobal.input,width:"30px",alignItems:"center"}}
                value={qty}
                onChange={(event) => {
                    if(event.target.value >= 0){
                        setQty(event.target.value);
                        article.quantite = event.target.value;
                    }
                }}
            />
        </div>
    )
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    }
};

export default ElementArticle;