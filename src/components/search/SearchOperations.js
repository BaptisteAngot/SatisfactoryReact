import {useEffect, useState} from "react";
import {getOperations} from "../../services/operationService";

const functions = require('../../utils/filter.js');

const SearchOperations = ({addOperation}) => {
    const [search,setSearch] = useState("");
    const [operations,setOperations] = useState([]);
    const [operationsFiltered,setOperationsFiltered] = useState([]);
    useEffect(() => {
        getOperations().then(res => {
            setOperations(res.data);
        });
    },[]);
    return(
        <div>
            <label>Search Operations</label>
            <input name={"Search Operations"} value={search} onChange={(event) => {
                setSearch(event.target.value);
                setOperationsFiltered(functions.filterOperations(event.target.value,operations));
            }}/>
            <div>
                {
                    operationsFiltered.length > 0 ?
                        operationsFiltered.map((operation, index) => {
                            return <input
                                key={index}
                                type={"button"}
                                value={operation.code+" - "+operation.libelle}
                                onClick={() => {addOperation(operation)}}
                            />
                        })
                        :
                        <div>No operations found</div>
                }
            </div>
        </div>
    )
}

export default SearchOperations;