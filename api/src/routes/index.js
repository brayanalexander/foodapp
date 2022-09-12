const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getDiets, postDiet,getAllRecipes,getRecipe,getRecipesDB } = require('../controllers/index.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/recipes',async (req,res)=>{
try{
    const {name}=req.query;
    if(name){
        
        const infoRecipes=await getAllRecipes();
        const result=infoRecipes.filter(el => el.title.toUpperCase().includes(name.toUpperCase()))
        if(result.length<1) throw "No se encontro resultados" // return res.status(400).json({msg:"No se encontro la Receta"}) //
        return res.status(200).json(result)
    }else{
        const result=await getAllRecipes()
        return res.status(200).json(result)
    } 
}catch (error) {
       return res.status(500).json({error:"La API spoonacular failed ("+error.message+")"})
        
  /* if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
       //res.json(error.response.data);
       //res.json(error.response.status);
       //res.json(error.response.headers);

       res.json(await getRecipesDB())
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log("este es error request : "+error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error mensaje', error.message);
    }
    //res.json(error.config);
    }*/
      
}
})

router.get('/recipes/:idRecipe',async(req,res)=>{
    try {
        const {idRecipe}=req.params
 const result=await getRecipe(idRecipe)
 if(result.length<1) return "no se encontro"
 res.status(200).json(result)
    } catch (error) {
        res.status(500).json({error:error})
    }
 
})

router.post('/recipes', async (req, res) => {
    const { title, summary, healthScore, steps, image, diets } = req.body;
    try {
        const result = await postDiet(title, summary, healthScore, steps, image, diets)

        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error:error})
    }

})

router.get('/diets', async (req, res) => {
    try {
        const result = await getDiets();
        res.status(200).json(result)
    } catch (error) {
        res.status(400).send(error)
    }

})

module.exports = router;
