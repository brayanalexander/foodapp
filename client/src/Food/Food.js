import styles from "./Food.module.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen,faTrash,faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

const Food=(props)=>{
   const {id,title,image,diets}=props.recipe
return(
    <>
     <div className={styles.cardFood}>
        <div className={styles.divImg}>
            <img src={image} alt={title} />
        </div>
        <div className={styles.iconos}>
        <Link to={'/home/'+id}><FontAwesomeIcon className={styles.view} icon={faMagnifyingGlass} /></Link>
            <FontAwesomeIcon className={styles.edit} icon={faPen} />
            <FontAwesomeIcon className={styles.delete} icon={faTrash} />
        </div>
        <Link to={'/home/'+id} className={styles.title}>{title}</Link>
        <div className={styles.diets}>
            {diets?.map((el,index)=>(
                <span key={index}>{el}</span>
            ))}         
        </div>
     </div>
    </>
)
}

export default Food;