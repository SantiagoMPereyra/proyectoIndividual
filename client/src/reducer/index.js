const initialState = {
  recipes : [],
  allRecipes: [],
  diets: [],
  details: [],
  stepByStep: [],
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_RECIPES':
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload
      }
    case 'GET_NAME_RECIPES':
      return {
        ...state,
        recipes: action.payload
              }

    case 'RECIPES_NOT_FOUND':
      return {
        ...state,
        recipes: action.payload
      }

    
    case "POST_RECIPE":
      return {
        ...state,
      }
    case 'GET_DIETS':

      return {
        ...state,
        diets: action.payload
      }
      
    case 'ORDER_BY_NAME':
      const sortedRecipes = action.payload === "asc"?
       state.recipes.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      }):
      state.recipes.sort((a, b) => {
        if (a.name > b.name) {
          return -1;
        }
        if (a.name < b.name) {
          return 1;
        }
        return 0;
      });
      return {
        ...state,
        recipes: sortedRecipes
      }

      case 'ORDER_BY_HEALTHSCORE':
        const sortedScores = action.payload === "asc"?
         state.recipes.sort((a, b) => {
          if (a.healthScore < b.healthScore) {
            return -1;
          }
          if (a.healthScore > b.healthScore) {
            return 1;
          }
          return 0;
        }):
        state.recipes.sort((a, b) => {
          if (a.healthScore > b.healthScore) {
            return -1;
          }
          if (a.healthScore < b.healthScore) {
            return 1;
          }
          return 0;
        });
        return {
          ...state,
          recipes: sortedScores
        }

    case 'GET_RECIPES_BY_DIET':
      const allRecipes = state.allRecipes;
      let filteredRecipes = allRecipes
      if (action.payload !== "all") {
             
      filteredRecipes = allRecipes.filter(recipe => recipe.diets.includes(action.payload));}
      return {
        ...state,
        recipes: filteredRecipes
      }

    case "GET_DETAILS":
      return {
        ...state,
        details: action.payload
      }

    case "GET_STEPBYSTEP":
      return {
        ...state,
        stepByStep: action.payload
      }


    default:
      return state
}
}
export default rootReducer;