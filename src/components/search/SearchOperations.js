import {useEffect, useState} from "react";
import {getOperations} from "../../services/operationService";
import {styleGlobal} from "../../asset/styleGlobal.js";
import Element from "./elements/Element";

const functions = require('../../utils/filter.js');

const SearchOperations = ({addOperation}) => {
    const [search,setSearch] = useState("");
    const [operations,setOperations] = useState([]);
    const [operationsFiltered,setOperationsFiltered] = useState([]);
    useEffect(() => {
        getOperations().then(res => {
            setOperationsFiltered(functions.filter("",res.data));
            setOperations(res.data);
        });
    },[]);
    return(
        <div style={styleGlobal.searchContainer}>
            <label style={styleGlobal.label}>Search Operations</label>
            <input style={styleGlobal.input} name={"Search Operations"} value={search} onChange={(event) => {
                setSearch(event.target.value);
                setOperationsFiltered(functions.filter(event.target.value,operations));
            }}/>
            <div style={styleGlobal.elementContainer}>
                {
                    operationsFiltered.length > 0 ?
                        operationsFiltered.map((operation, index) => {
                            if (index === 5) {
                                return <div style={{...styleGlobal.label, alignSelf:"center"}}>...</div>
                            }else if (index > 5){
                                return null;
                            }
                            return <Element key={index} element={operation} add={addOperation}/>
                        })
                        :
                        <div style={{...styleGlobal.label, alignSelf: "center"}}>No operations found</div>
                }
            </div>
        </div>
    )
}

const styles = {

};

export default SearchOperations;