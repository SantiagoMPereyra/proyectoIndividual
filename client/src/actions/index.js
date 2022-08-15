import axios from 'axios';

export function getRecipes(){
    return async (dispatch) => {
        var json = await axios.get('http://localhost:3001/recipes');
        dispatch({
            type: 'GET_RECIPES',
            payload: json.data  
        })  
    }
}

export function getNameRecipes(search){
    return async (dispatch) => {
        try {
        var json = await axios.get('http://localhost:3001/recipes?name=' + search, {});
        console.log(json.data)
      
            dispatch({
                type: 'GET_NAME_RECIPES',
                payload: json.data
            })
        } catch (error) {
        console.log("No recipes found")
        dispatch({
            type: 'RECIPES_NOT_FOUND',
            payload: "No recipes found"
    })
    }
}
}

export function getDiets() {
    return async (dispatch) => { 
        var json = await axios.get('http://localhost:3001/diets', {});
        dispatch({
            type: 'GET_DIETS',
            payload: json.data
        })
    }
}

export function postRecipe(payload) {
    return async (dispatch) => {
        var json = await axios.post('http://localhost:3001/recipes', payload);
        return json 
    }
}        

export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByHealthScore(payload) {
    return {
        type: 'ORDER_BY_HEALTHSCORE',
        payload
    }
}

export function getRecipesByDiet(payload) {
    return {
        type: 'GET_RECIPES_BY_DIET',
        payload
    }
}

export function getDetails (id) {
    return async function (dispatch) {
        try{
            var json = await axios.get('http://localhost:3001/recipes/' + id, {});
            dispatch({
                type: 'GET_DETAILS',
                payload: json.data
            })
        }catch(error){
            console.log(error)
        }
    }
} 

export function getStepByStep (id) {
    return async function (dispatch) {
        try{
            var json = await axios.get("http://localhost:3001/recipes/" + id, {});
            dispatch({
                type: 'GET_STEPBYSTEP',
                payload: json.data
            })
        }catch(error){
            console.log(error)
        }
    }
}