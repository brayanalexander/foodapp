import styles from "./Filter.module.css";

import {getDiets,filterTypeDiet,filterOrder,filterDBorAPI} from "../redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";


const Filter=({setCurrentPage,setOrden})=>{
  const dispatch=useDispatch();
  const infoDiets=useSelector(state => state.diets);

  useEffect(()=>{
    dispatch(getDiets())
  },[dispatch])

  const handleTypeDiet=(e)=>{
    dispatch(filterTypeDiet(e.target.value))
    setCurrentPage(1)
  }

  const handleFilterOrder=(e)=>{
   dispatch(filterOrder(e.target.value))
   setCurrentPage(1)
   setOrden("ordenado"+e.target.value)
  }

  const handlerFilterDBApi=(e)=>{
   dispatch(filterDBorAPI(e.target.value))
   setCurrentPage(1)
  }

 

 return(
    <>
    <section className={styles.sectionFilters}>
      <div className={styles.divFilter}>
        <span>DIETS</span>
        <select onChange={(e)=>handleTypeDiet(e)} className={styles.select}>
          <option value="All">ALL</option>
          {infoDiets?.map((diet,index)=>(
           <option  key={index} value={diet.name}>{diet.name}</option>
          ))}
        </select>
      </div>

      <div className={styles.divFilter}>
        <span>API/DB</span>
        <select onChange={(e)=>handlerFilterDBApi(e)} className={styles.select}>
          <option value="All">ALL</option>
          <option value="Api">Api</option>
          <option value="Mibd">Mi db</option>

        </select>
      </div>

      <div className={styles.divFilter}>
        <span>ORDENAR</span>
        <select onChange={(e)=>handleFilterOrder(e)}  className={styles.select}>
        <option value="ID">ID</option>
          <option value="Asc">A-Z</option>
          <option value="Desc">Z-A</option>
          <option value="maxHealthScore">Max HealthScore</option>
          <option value="minHealthScore">Min HealthScore</option>
        </select>
      </div>
      </section>
    </>
 )
}

export default Filter;