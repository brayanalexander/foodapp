import styles from "./Pagination.module.css";

const Pagination=({infoRecipes,recipesPag,handlePag,currentPage})=>{
   let numPage=[];
    for(let i=1;i<= Math.ceil(infoRecipes.length/recipesPag);i++){
          numPage.push(i)             
    }

    const styleActive={
      backgroundColor:"orange"
    }

    return(
        <>
        <section className={styles.sectionPagination}>
            <div className={styles.btns}>
                { numPage.map(el =>(
                    <span key={el} onClick={()=>handlePag(el)} className={styles.btn} style={currentPage=== el ? styleActive:null} >{el}</span>
                 ))}
                
              </div>
        </section>
        </>
    )
}

export default Pagination;