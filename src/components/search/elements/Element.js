import {useState} from "react";
import {styleGlobal} from "../../../asset/styleGlobal";

const Element = ({add, element}) => {
    const [selected,setSelected] = useState(false);
    let styleBtn = selected ? styleGlobal.buttonSelected : {};
    return (
        <input
            style={{...styleGlobal.button, ...styleBtn}}
            className={"btn"}
            type={"button"}
            value={element.code+" - "+element.libelle}
            onClick={() => {
                setSelected(!selected);
                !selected ? add(element) : add({});
            }}
        />
    )
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "10px"
    }
};

export default Element;