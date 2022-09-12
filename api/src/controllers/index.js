const axios = require('axios');
const { Recipe, Diet } = require('../db.js');

const cantRecetas = 100;

const getRecipesApi = async () => {
    //OBTENFO LA INFO DE LA API
    const recipesApi = await axios.get('https://api.spoonacular.com/recipes/complexSearch?number=' + cantRecetas + '&addRecipeInformation=true&apiKey=' + process.env.MI_API_KEY)
    //MAPEO PARA OBTENER LOS DATOS QUE NECESITO DE LA API
    let info = recipesApi.data.results.map(el => {
        return {
            id: el.id,
            title: el.title,
            summary: el.summary,
            healthScore: el.healthScore,
            steps: el.analyzedInstructions[0]?.steps.map(el => {
                return { number: el.number, step: el.step }
            }),
            image: el.image,
            diets: el.diets
        }
    })


    return info
}

const getRecipesDB = async () => {
    //OBTENGO LA INFO DE BD
    const infoBD = await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    });
    // DEVUELVO UN ARRAY CON LOS RESULTADOS
    return infoBD.map(el => {
        return {
            id: el.id,
            title: el.title,
            summary: el.summary,
            healthScore: el.healthScore,
            steps: el.steps,
            image: el.image,
            diets: el.diets.map(el => el.name),
            fromDB:el.fromDB
        }
    })

}

const getAllRecipes = async () => {
   let RecipesApi = await getRecipesApi();
   let RecipesDB = await getRecipesDB();


  return [...RecipesApi, ...RecipesDB]
 //return RecipesDB
}

const getRecipe = async (idRecipe) => {

    if (isNaN(idRecipe)) {
        const recipe = await Recipe.findOne({
            where: {
                id: idRecipe
            },
            include: {
                model: Diet,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }
        })

      

        return {
            id: recipe.id,
            title: recipe.title,
            summary: recipe.summary,
            healthScore: recipe.healthScore,
            steps: recipe.steps,
            image: recipe.image,
            diets: recipe.diets.map(el => el.name),
            fromDB:recipe.fromDB
        }
    } else{
        const recipe = await axios.get('https://api.spoonacular.com/recipes/' + idRecipe + '/information?apiKey=' + process.env.MI_API_KEY)
            .then(res => res.data)

        return {
            id: recipe.id,
            title: recipe.title,
            summary: recipe.summary,
            healthScore: recipe.healthScore,
            steps: recipe.analyzedInstructions[0]?.steps.map(el => {
                return { number: el.number, step: el.step }
            }),
            image: recipe.image,
            diets: recipe.diets
        }
    }



}


const postDiet = async (title, summary, healthScore, steps, image, diets) => {
    // VALIDO QUE TODOS LOS CAMPOS ESTEN LLENOS
    if (!title || !summary || !healthScore || !steps || diets.length < 1) throw "Debe rellenar todos los campos.";
    // VERIFICO SI YA EXISTE EL NOMBRE EN LA BD
    const titleExist = await Recipe.findOne({
        where: {
            title: title
        }
    });

    console.log(titleExist)

    if (titleExist) throw "El nombre de la receta ya existe"
    // CREO UNA NUEVA RECETA
    const newRecipe = await Recipe.create({
        title,
        summary,
        healthScore,
        steps,
        image
    });

    const diet = await Diet.findAll({
        where: {
            name: diets
        }
    });

    newRecipe.addDiet(diet)

    return true
}


const getDiets = async () => {
    // OBTENGO LA INFO DE LA API
    const infoApi = await axios.get('https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&apiKey=' + process.env.MI_API_KEY).then(result => result.data.results);

    // MAPEO LA INFO, PARA OBTENER UN ARRAY DE ARRAYS DE DIETAS
    let arrayDiets = infoApi.map(el => el.diets)

    // OBTENGO UN SOLO ARRAY CON TODAS LAS DIETAS
    let diets = []
    arrayDiets.forEach(el => el.forEach(item => diets.push(item)))

    /*diets.reduce((ac, it) => {
        if (!ac.includes(it)) {
            ac.push(it)
        }
        return ac
    }, []).forEach(el => Diet.findOrCreate({where:{name:el}}));*/

    let dietsDistinc = [...new Set(diets)]

    // AGREGO LAS DIETS A LA TABLA DE LA BD Y RETORNO TODAS LA DIETS
    dietsDistinc.forEach(el => Diet.findOrCreate({ where: { name: el } }));

    return Diet.findAll()

}

module.exports = {
    getDiets,
    postDiet,
    getRecipesApi,
    getRecipesDB,
    getAllRecipes,
    getRecipe
}