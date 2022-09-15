import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import styles from "./CreateRecipe.module.css";
import { useEffect, useState } from "react";
import { getDiets,postRecipe,CreateFalse } from "../redux/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const validate=(input)=>{
 let errors={}
 //const pattern = new RegExp('^[A-Z]+$', 'i');
 const pattern = new RegExp('^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$');
 if(!input.title){
    errors.title="Debe llenar este campo obligatoriamente";
 }else if(!pattern.test(input.title)){
   errors.title="No se aceptan números"
 }else if(!input.summary){
    errors.summary="Este campo es Obligatorio"
 }else if(input.healthScore<1 || input.healthScore>100){
    errors.healthScore="Debe ingresar un número del 1 al 100"
 }else if(!input.steps){
    errors.steps="Este campo es Obligatorio"
 }else if(input.diets.length<1){
    errors.diets="Debe elegir al menos una dieta"
 }

 return errors
}

const CreateRecipe = () => {

    const dispatch=useDispatch();
    const infoDiets=useSelector(state=>state.diets)
  
    const [input,setInput]=useState({
        title:'',
        image:'',
        summary:'',
        healthScore:'',
        steps:'',
        diets:[]
    });

    const [errors,setErrors]=useState({})


    const handleOnchange=(e)=>{
      setInput({
        ...input,
        [e.target.name]:e.target.value
      })

      setErrors(validate({...input,[e.target.name]:e.target.value}))
    }

    const handleCheck=(e)=>{
       
        if(e.target.checked){
            setInput({
                ...input,
                diets:[...input.diets,e.target.value]
               })

               setErrors(validate({...input,diets:[...input.diets,e.target.value]}))
        }else{
            setInput({
                ...input,
                diets:input.diets.filter(el=>el!==e.target.value)
               })

               setErrors(validate({...input,diets:input.diets.filter(el=>el!==e.target.value)}))
        }

        
       
    }

    const submitDisabled=()=>{
        if(!input.title || !input.summary || !input.steps || !input.healthScore || input.healthScore>100 || input.healthScore<1 || input.diets.length<1 ){
            return true
        }
        return false
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(postRecipe(input))
        setInput({
            title:'',
        image:'',
        summary:'',
        healthScore:'',
        steps:'',
        diets:[]
        })
       /* setCreate(true)*/
        setTimeout(()=>{
           dispatch(CreateFalse())
        },3000)

    }

    useEffect(()=>{
   dispatch(getDiets())
  
    },[dispatch])

    //const [create,setCreate]=useState(false)
    const resCreate=useSelector(state=>state.create)
    
    
    return (
        <>
            <Nav />
            <section className={styles.sectionCreate}>
                {resCreate.error ? <div className={styles.error}>{resCreate.error}</div> :resCreate?<div className={styles.respuesta}>Se Guardo Correctamente!!</div>:null}
                                                    
                <h1 className={styles.h1}>Create Recipe</h1>
                
                    <form className={styles.form} onSubmit={(e)=>handleSubmit(e)}>

                        <div className={styles.divCamp}>
                            <label className={styles.nameCamp}>
                                Title:
                            </label>
                            <input className={styles.input} onChange={(e)=>handleOnchange(e)} value={input.title} type="text" name="title" required placeholder="Ingrese un title" />
                            <div className={styles.divError}>{errors.title}</div>
                        </div>

                        <div className={styles.divCamp}>
                            <label className={styles.nameCamp}>
                                Image:
                            </label>
                            <input className={styles.input} onChange={(e)=>handleOnchange(e)} value={input.image} type="text" name="image" placeholder="Ingrese url de la imagen" />
                            <div className={styles.divError}></div>
                        </div>

                        <div className={styles.divCamp}>
                            <label className={styles.nameCamp}>
                                Summary:
                            </label>
                            <textarea className={styles.input} onChange={(e)=>handleOnchange(e)} value={input.summary} name="summary" placeholder="Ingrese un resumen" />
                            <div className={styles.divError}>{errors.summary}</div>
                        </div>

                        <div className={styles.divCamp}>
                            <label className={styles.nameCamp}>
                                HealthScore:
                            </label>
                            <input className={styles.input} onChange={(e)=>handleOnchange(e)} value={input.healthScore} type="number" name="healthScore" placeholder="Ingrese un número" />
                            <div className={styles.divError}>{errors.healthScore}</div>
                        </div>

                        <div className={styles.divCamp}>
                            <label className={styles.nameCamp}>
                            Steps:
                            </label>
                            <textarea className={styles.input} onChange={(e)=>handleOnchange(e)} value={input.steps}  name="steps" placeholder="Ingresa los pasos" />
                            <div className={styles.divError}>{errors.steps}</div>
                        </div>

                        <div className={styles.divCamp}>
                            <label className={styles.nameCamp}>
                            Diets:
                            </label>
                            <div className={styles.divCheck}>
                                {infoDiets && infoDiets.map((el,index) =>(
                                    <label key={index}><input onChange={(e)=>handleCheck(e)} value={el.name} checked={input.diets.length<1 ? false :null} type="checkbox" />{el.name}</label>
                                ))}
                                                                                   
                            </div>
                            
                            <div className={styles.divError}>{errors.diets}</div>
                        </div>



                        <div className={styles.divCamp}>
                            <input className={styles.bntSubmit} disabled={submitDisabled()} type="submit" value="Create" />
                        </div>

                    </form>
                
            </section>
            <Footer />
        </>
    )
}

export default CreateRecipe;