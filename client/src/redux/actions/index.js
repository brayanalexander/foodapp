import axios from "axios";
export const GET_ALL_RECIPES='GET_ALL_RECIPES';
export const LOADER='LOADER';
export const GET_DIETS='GET_DIETS';
export const FILTER_DIET='FILTER_DIET';
export const FILTER_ORDER='FILTER_ORDER';
export const FILTER_DBAPI='FILTER_DBAPI';
export const GET_SERACH='GET_SERACH';
export const GET_RECIPE='GET_RECIPE';
export const CREATE_RECIPE='CREATE_RECIPE';

export const getAllRecipes=()=>async(dispatch)=>{
  dispatch({type:LOADER,payload:true})
 await fetch('http://localhost:3001/recipes')
  .then(data=>data.json())
  .then(res=>{
    dispatch({
        type:GET_ALL_RECIPES,
        payload:res
    })

    dispatch({type:LOADER,payload:false})
  })
}

export  const getSearch=(name)=>async(dispatch)=>{
  dispatch({type:LOADER,payload:true})
 const recipes=await axios.get('http://localhost:3001/recipes?name='+name).then(res=>{
  dispatch({
    type:GET_SERACH,
    payload:res.data
   })

   dispatch({type:LOADER,payload:false})
 }).catch(err=>{
  dispatch({
    type:GET_SERACH,
    payload:{error:"No se encontro la Receta",msg:err.message}
   })

   dispatch({type:LOADER,payload:false})
 })

 return recipes
 
 
}

export const postRecipe=(objRecipe)=>(dispatch)=>{
  fetch('http://localhost:3001/recipes', {
    method: "POST",
    body: JSON.stringify(objRecipe),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  }).then(data=>data.json())
  .then(res=>{
    
    dispatch({
      type:CREATE_RECIPE,
      payload:res
    })
  })
}

export const getRecipe=(idRecipe)=>async(dispatch)=>{
  dispatch({type:LOADER,payload:true})
 await fetch('http://localhost:3001/recipes/'+idRecipe)
 .then(res=>res.json())
 .then(data=>{
  dispatch({
    type:GET_RECIPE,
    payload:data
  })

  dispatch({type:LOADER,payload:false})
 })
}

export const getDiets=()=>async(dispatch)=>{
 const info=await axios.get('http://localhost:3001/diets').then(res=> res.data)
return dispatch({
  type:GET_DIETS,
  payload:info
})
}


export const filterTypeDiet=(value)=>{
   return {
    type:FILTER_DIET,
    payload:value
   }
}

export const filterOrder=(value)=>{
 return {
  type:FILTER_ORDER,
  payload:value
 }
}

export const filterDBorAPI=(value)=>{
return {
  type:FILTER_DBAPI,
  payload:value
}
}