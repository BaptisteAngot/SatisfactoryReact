import {useEffect, useState} from "react";
import {getCategories} from "../../services/categoryService";

const functions = require('../../utils/filter.js');

const SearchCategories = ({addCategory}) => {
    const [search,setSearch] = useState("");
    const [categories,setCategories] = useState([]);
    const [categoriesFiltered,setCategoriesFiltered] = useState([]);
    useEffect(() => {
        getCategories().then(res => {
            setCategories(res.data);
        });
    },[]);
    return(
        <div>
            <label>Search Categories</label>
            <input name={"Search categories"} value={search} onChange={(event) => {
                setSearch(event.target.value);
                setCategoriesFiltered(functions.filterCategories(event.target.value,categories));
            }}/>
            <div>
                {
                    categoriesFiltered.length > 0 ?
                        categoriesFiltered.map((category, index) => {
                            return <input
                                key={index}
                                type={"button"}
                                value={category.code+" - "+category.libelle}
                                onClick={() => {addCategory(category)}}
                            />
                        })
                        :
                        <div>No categories found</div>
                }
            </div>
        </div>
    )
}

export default SearchCategories;