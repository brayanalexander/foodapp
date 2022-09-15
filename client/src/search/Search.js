import styles from "./Search.module.css";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faMagnifyingGlass,faRotateRight } from '@fortawesome/free-solid-svg-icons';
import {  useState } from "react";
import { getSearch } from "../redux/actions";
import { useDispatch } from "react-redux";





const Search = ({clearFilters,setCurrentPage}) => {

const dispatch=useDispatch()
    const [input, setInput] = useState('');

    const inputSearch = (e) => {
        setInput(e.target.value)
    }

    const handleSearch = () => {
        dispatch(getSearch(input))
         setInput('')
         setCurrentPage(1)
    }




    return (
        <>
            <section className={styles.search}>
                <div className={styles.container}>
                    <input onChange={(e)=>inputSearch(e)} value={input} className={styles.inputSearch} type="text" name="search" />
                    <button onClick={()=>handleSearch()} className={styles.btnSearch}>{/*<FontAwesomeIcon  icon={faMagnifyingGlass} />*/} Search</button>
                    <button onClick={clearFilters} className={styles.btnAllFoods}>{/*<FontAwesomeIcon  icon={faRotateRight} />*/} Clear Filters</button>
                </div>
            </section>
        </>
    )
}

export default Search;