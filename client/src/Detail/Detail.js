import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipe } from "../redux/actions";
import Loader from "../Loader/Loader";
import styles from "./Detail.module.css";
import { useHistory } from "react-router-dom";
import ImgDefect from "../images/imgDefault.jpg"

const Detail = (props) => {
   const dispatch = useDispatch();
   const infoRecipe = useSelector(state => state.recipe);
   const loader=useSelector(state=>state.loader);
   let history=useHistory();

   function createMarkup() {
      return {__html: infoRecipe.summary};
    }

    function redirecHome(){
    history.push('/home')
    
    }

   useEffect(() => {
      dispatch(getRecipe(props.idRecipe))
      
   },[dispatch,props.idRecipe])
   return (
      <>
         <Nav />
         <section className={styles.detail}>
            {loader ? 
            <Loader/> 
            :<>
            <img className={styles.detailImage} src={infoRecipe.image ? infoRecipe.image: ImgDefect} alt={infoRecipe.title} />
            <div className={styles.divTitle}>
               <h1 className={styles.title}>{infoRecipe.title}</h1>
               <h2 className={styles.subTitle}>HealthScore</h2>
               <span>{infoRecipe.healthScore} %</span>
               <h2 className={styles.subTitle}>Diets</h2>
               {infoRecipe.diets && infoRecipe.diets.map(el=>(
                  <span className={styles.diet}>{el}</span>
               ))}
            </div>
            <div className={styles.divSummary}>
               <h2 className={styles.subTitle}>Summary</h2>
               <p dangerouslySetInnerHTML={createMarkup()}></p>
            </div>
            <div className={styles.divSteps}>
               <h2 className={styles.subTitle}>Steps</h2>
               {Array.isArray(infoRecipe.steps) ? infoRecipe.steps && infoRecipe.steps.map((el,index)=>(
                 <p key={index}>{el.step}</p>
               )) : <p>{infoRecipe.steps}</p>}
            </div>
            <button className={styles.btnHome} onClick={redirecHome}>View All Recipes</button>
            </>}
            
         </section>
         <Footer />
      </>
   )
}

export default Detail;