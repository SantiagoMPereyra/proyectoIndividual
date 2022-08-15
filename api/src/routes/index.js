
const { Router } = require('express');
const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Recipe, Diet } = require('../db');

const { API_KEY, API_KEY2 } = process.env; 

    
    
const router = Router();    
 
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
 
// const getApiInfo = async () => {
//     const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&apiKey=${API_KEY}&number=100`);
    
//     const apiInfo = await apiUrl.data.results.map(recipe => {
//         return {
//             id: recipe.id,
//             img: recipe.image,
//             name: recipe.title,
//             dishTypes: recipe.dishTypes,
//             diets: recipe.diets,
//             summary: recipe.summary,
//             healthScore: recipe.healthScore,
//             steps: recipe.analyzedInstructions[0]?.steps?.map(el => el.step)
//         }
//     }
//     );
//     return apiInfo;
// }


const getApiInfo = () => {
    return axios.get(`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&apiKey=${API_KEY}&number=100`)
    .then(res => {
        const apiInfo = res.data.results.map(recipe => {
            return {
                id: recipe.id, 
                img: recipe.image,
                name: recipe.title,
                diets: recipe.diets,
                healthScore: recipe.healthScore,
                } 
        } 
        );
        if (res.data.results) {  
            return apiInfo;
        }
        // else {
        // API_KEY = API_KEY2;
        // return getApiInfo();
        // }
    }) 
}
 
// const getApiRecipeInfo = async (iD) => {
//     const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/${iD}/information?apiKey=${API_KEY}`);

//     const { id, image, title, dishTypes, diets, summary, healthScore, analyzedInstructions } = await apiUrl.data;
//     const apiInfo = {
//         id: id,
//         img: image,
//         name: title,
//         dishTypes: dishTypes,
//         diets: diets,
//         summary: summary, 
//         healthScore: healthScore,
//         steps: analyzedInstructions[0]?.steps?.map(el => el.step)
//     }
//     if (id) { 
//              return apiInfo;
//     } else {
//         return null;
//     }

// } 

const getApiRecipeInfo = (iD) => {
    return axios.get(`https://api.spoonacular.com/recipes/${iD}/information?apiKey=${API_KEY}`)
    .then(res => {
    const apiInfo = {
        id: res.data.id,
        img: res.data.image,
        name: res.data.title,
        dishTypes: res.data.dishTypes,
        diets: res.data.diets,
        summary: res.data.summary, 
        healthScore: res.data.healthScore,
        steps: res.data.analyzedInstructions[0]?.steps?.map(e => e.step),
        stepByStep: res.data.analyzedInstructions[0]?.steps
    }
    if (res.data.id) {  
             return apiInfo;
    } else {
        return null;
    }
    })       
}

// const getDbInfo = async () => { 
//     return await Recipe.findAll({
//         include: {
//             model: Diet,
//             attributes: ["name"], 
//             through: { attributes: [] }
//         }
//     });
// }

const getDbInfo = () => { 
    return Recipe.findAll({
        include: {
            model: Diet,
            attributes: ["name"], 
            through: { attributes: [] }
        }
    })
    .then(res => {
        return res;
    }
    )
}

// const getAllRecipes = () => {
    
//     return getApiInfo().then (apiInfo => {
//          getDbInfo().then(dbInfo => {
//              const recipes = apiInfo.concat(dbInfo);
//              //console.log(recipes);
//              return recipes; 
 
//          }
//          )
     
//      }
 
//      )
 
     
 
//  }  
 
  
//  router.get('/recipes', (req, res) => {
//      const name = req.query.name;
//      const totalRecipes = getAllRecipes().then( recipe => { return recipe})
   
//      console.log(totalRecipes) 
//      if (name) {
//          const filteredRecipes = totalRecipes.filter(recipe => recipe.name.toLowerCase().includes(name.toLowerCase()));
//          filteredRecipes.length ? 
//              res.status(200).json(filteredRecipes) : 
//              res.status(404).json({ message: 'No se encontraron recetas' });
//      } else {
//          res.status(200).json(totalRecipes);
//      }  
//  }
//  ); 
const getAllRecipes = () => {
    const apiInfo = getApiInfo()
    const dbInfo = getDbInfo()
    return Promise.all([apiInfo, dbInfo])
    .then(res => {  
        const recipes = res[0].concat(res[1]);
        return recipes;
    }
    )
}
 // router.get("/:id", function (req, res) {
//     const { id } = req.params;
//     Activity.findOne({
//         where: { id: id}, 
//         include: { 
//             model: Country, 
//             attributes: ["name"],
//             through: { attributes: [] }
//         }
//     })
//     .then(activitiesBD=>{
//         console.log(activitiesBD)
//         res.json(activitiesBD)
//     })
//     .catch(()=>{ 
//         res.status(404).send("Not recived id")
//     })
// })


// router.get('/recipes', async (req, res) => {
//     const name = req.query.name;
//     const totalRecipes =  await getAllRecipes();
//     if (name) {
//         const filteredRecipes = totalRecipes.filter(recipe => recipe.name.toLowerCase().includes(name.toLowerCase()));
//         filteredRecipes.length ? 
//             res.status(200).json(filteredRecipes) : 
//             res.status(404).json({ message: 'No se encontraron recetas' });
//     } else {
//         res.status(200).json(totalRecipes);
//     }
// }
// );   

router.get('/recipes', (req, res) => { 
    const name = req.query.name;
    getAllRecipes()
    .then(recipes => { 
        if (name) {
            const filteredRecipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(name.toLowerCase()));
            filteredRecipes.length ?
                res.status(200).json(filteredRecipes) :
                res.status(404).json({ message: 'No se encontraron recetas' });
        } else { 
            res.status(200).json(recipes); 
        }
    }   
    )   
}  
);

//     totalRecipes.then(recipes => {
//         return totalRecipes = recipes;
//     })  
        
//     if (name) {
//         const filteredRecipes = totalRecipes.filter(recipe => recipe.name.toLowerCase().includes(name.toLowerCase()));
//         filteredRecipes.length ? 
//             res.status(200).json(filteredRecipes) : 
//             res.status(404).json({ message: 'No se encontraron recetas' });
//     } else {
//         res.status(200).json(totalRecipes);
//     }
// }
// ); 

router.get('/recipes/:id',  (req, res) => {
    const id = req.params.id;
    if (id.length < 8) {
        getApiRecipeInfo(id)
        .then(recipe => {
            recipe ?
                res.status(200).json(recipe) :
                res.status(404).json({ message: 'No se encontró la receta' });
        }
        )   
    } else {
        Recipe.findByPk(id, { 
            include: {
                model: Diet,
                attributes: ["name"],
                through: { attributes: [] }
            } 
        }) 
        .then(recipe => {  
            recipe ?
                res.status(200).json(recipe) :
                res.status(404).json({ message: 'No se encontró la receta' });
        }
        )
    }
}
);

//     if(id.length >10) {
//        Recipe.findOne({
//          where: { id: id}, 
//                  include: {
//                   model: Diet, 
//                   attributes: ["name"],
//                   through: { attributes: [] }
//                  }
//              }).then(dbInfo => {   
//     let recipeDetail = dbInfo
//              }
//              { else if (id.length < 10) {	
//     getApiRecipeInfo(id).then(recipes => {
//               recipeDetail = recipes 
    
//      recipeDetail ?
//         res.status(200).json(recipeDetail) : 
//         res.status(404).json({ message: 'No se encontró la receta' });
// }
// )}
// })
//     }}) 

router.post('/recipes', (req, res) => {
    const { name, dishTypes, img, diets, summary, healthScore, steps, createdInDb } = req.body;
    Recipe.create({
        name,
        img, 
        summary,
        dishTypes,
        healthScore,
        steps, 
        createdInDb
    }).then(newRecipe => {
    Diet.findAll({where: { name: diets }})
    .then (dietDb => {  
    newRecipe.addDiet(dietDb);
    res.send("Receta agregada"); 
    })})
} 
);

router.get("/diets", (req, res) => {

    Diet.findAll().then(allDiets => { 
        allDiets.length ?
            res.status(200).json(allDiets) :
            axios.get (`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&apiKey=${API_KEY}&number=100`)
            .then(response => {
                const diets = response.data.results.map(recipe => recipe.diets);
                const dietsArray = diets.flat();
                const uniqueDiets = [...new Set(dietsArray)];
                uniqueDiets.forEach(diet => {
                    Diet.findOrCreate({
                        where: { name: diet }
                    })
                })
                res.status(200).json(uniqueDiets);
            })
            .catch(error => {

            res.status(404).json({ message: 'No se encontraron dietas' });
          
    })
    })
});


    // if(allDiets.length === 0) {
    // axios.get(`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&apiKey=${API_KEY}&number=100`)
    // .then(dietsApi => {
    // const diets = dietsApi.data.results.map(recipe => recipe.diets); 


    // const dietsArr = diets.flat(); 
    // const dietsUnique = [...new Set(dietsArr)];

    // dietsUnique.forEach(el => { 
    //     Diet.findOrCreate({ 
    //         where: {name: el}
    //     })
    // });}
     
    // res.status(200).json(allDiets);
    // }
    // )})

router.put('/recipes/:id', (req, res) => {
    const { name, dishTypes, img, diets, summary, healthScore, steps, createdInDb } = req.body;
    const id = req.params.id;
    Recipe.update({
        name,
        img,
        summary,
        dishTypes,
        healthScore, 
        steps,
        createdInDb
    }, { 
        where: { id: id }
    }).then(() => {
        Diet.findAll({ where: { name: diets } })
            .then(dietDb => {
                Recipe.findByPk(id)
                    .then(recipe => {
                        recipe.setDiets(dietDb);
                        res.send("Receta actualizada");
                    })
            })
    })
});
 
router.delete('/recipes/:id', (req, res) => {
    const id = req.params.id;
    Recipe.destroy({
        where: { id: id }
    }).then(() => {
        res.send("Receta eliminada");
    })
}); 

module.exports = router; 
 