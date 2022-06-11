import {useEffect, useState} from "react";
import {getCategories} from "../../services/categoryService";
import {styleGlobal} from "../../asset/styleGlobal";
import Element from "./elements/Element";

const functions = require('../../utils/filter.js');

const SearchCategories = ({addCategory}) => {
    const [search,setSearch] = useState("");
    const [categories,setCategories] = useState([]);
    const [categoriesFiltered,setCategoriesFiltered] = useState([]);
    useEffect(() => {
        getCategories().then(res => {
            setCategoriesFiltered(functions.filter("",res.data));
            setCategories(res.data);
        });
    },[]);
    return(
        <div style={styleGlobal.searchContainer}>
            <label style={styleGlobal.label}>Search Categories</label>
            <input style={styleGlobal.input} name={"Search categories"} value={search} onChange={(event) => {
                setSearch(event.target.value);
                setCategoriesFiltered(functions.filter(event.target.value,categories));
            }}/>
            <div style={styleGlobal.elementContainer}>
                {
                    categoriesFiltered.length > 0 ?
                        categoriesFiltered.map((category, index) => {
                            if (index === 5) {
                                return <div style={{...styleGlobal.label, alignSelf:"center"}}>...</div>
                            }else if (index > 5){
                                return null;
                            }
                            return <Element key={index} element={category} add={addCategory}/>
                        })
                        :
                        <div style={{...styleGlobal.label, alignSelf: "center"}}>No categories found</div>
                }
            </div>
        </div>
    )
}

const styles = {

};

export default SearchCategories;