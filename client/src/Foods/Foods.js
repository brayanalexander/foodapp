import styles from "./Foods.module.css";

import Food from "../Food/Food";
import Pagination from "../Pagination/Pagination";
import Loader from "../Loader/Loader";
import Filter from "../Filters/Filter";
import Search from "../search/Search";


import { getAllRecipes } from "../redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Foods = () => {
    const dispatch = useDispatch();
    const infoRecipes = useSelector(state => state.recipes);
    const loader = useSelector(state => state.loader);

    const [currentPage, setCurrentPage] = useState(1)
    const [recipesPag, setRecipesPag] = useState(9)
    const lastRecipe = currentPage * recipesPag
    const firstRecipe = lastRecipe - recipesPag

    const [orden, setOrden] = useState('');
   

    useEffect(() => {
        dispatch(getAllRecipes());
    }, [])




    const recipes = Array.isArray(infoRecipes) && infoRecipes.length > 0 ? infoRecipes.slice(firstRecipe, lastRecipe) : null

    const handlePag = (value) => {
        setCurrentPage(value)
    }

    const clearFilters=()=>{
        dispatch(getAllRecipes())
    }

    

    return (
        <>   
            <Search clearFilters={clearFilters} setCurrentPage={setCurrentPage} />
            <Filter setCurrentPage={setCurrentPage} setOrden={setOrden} />
            <div className={styles.divFoods}>
            {loader ? <Loader /> : recipes ?
                <>
                    <Pagination infoRecipes={infoRecipes} recipesPag={recipesPag} handlePag={handlePag} currentPage={currentPage} />
                    <section className={styles.sectionFoods} >
                        {recipes?.map(recipe => (
                            <Food key={recipe.id} recipe={recipe} />
                        ))}

                    </section>
                </>
                :<> 
                <p className={styles.resultError}>{infoRecipes.error}</p>
                <img src="https://static.vecteezy.com/system/resources/previews/004/819/828/non_2x/cute-character-mexican-taco-with-crying-and-tears-emotion-sad-face-depressive-eyes-arms-and-legs-fast-food-person-with-melancholy-expression-sandwich-with-flatbread-vector.jpg" alt="comida triste" width={200} />
                </>
            }
</div>
        </>
    )
}

export default Foods;