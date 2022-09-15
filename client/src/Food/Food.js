import styles from "./Food.module.css";
import ImgDefect from "../images/imgDefault.jpg";

import { deleteRecipe } from "../redux/actions";

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faPen,faTrash,faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const Food=(props)=>{
    const dispatch=useDispatch();

    const recipeDelete=()=>{
        dispatch(deleteRecipe(props.recipe.id))
    }
return(
    <>
     <div className={styles.cardFood}>
        <div className={styles.divImg}>
          <img src={props.recipe.image ? props.recipe.image : ImgDefect} alt={props.recipe.title} />
        </div>
        <div className={styles.iconos}>
        <Link className={styles.view} to={'/home/'+props.recipe.id}>{/*<FontAwesomeIcon className={styles.view} icon={faMagnifyingGlass} />*/}View</Link>
           { /*<FontAwesomeIcon className={styles.edit} icon={faPen} />
            <FontAwesomeIcon className={styles.delete} icon={faTrash} />  <button className={styles.edit}>Edit</button>*/}
           {props.recipe.fromDB ? <>
              <button onClick={recipeDelete} className={styles.delete}>Delete</button>
            </>
             : null} 
        </div>
        <Link to={'/home/'+props.recipe.id} className={styles.title}>{props.recipe.title}</Link>
        <div className={styles.diets}>
            {props.recipe.diets?.map((el,index)=>(
                <span key={index}>{el}</span>
            ))}         
        </div>
     </div>
    </>
)
}

export default Food;