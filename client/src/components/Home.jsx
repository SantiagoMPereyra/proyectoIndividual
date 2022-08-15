import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, getRecipesByDiet, orderByName, orderByHealthScore, getDiets} from "../actions";
import Card from "./Card";
import Paginate from "./Paginate";
import SearchBar from "./SearchBar";
import "./Styles/Home.css";
import "./Styles/Paginate.css";


export default function Home() {
    const dispatch = useDispatch();
    let allRecipes = useSelector(state => state.recipes); 
    const diets = useSelector(state => state.diets);

    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(9);
    const indexOfLastRecipe = currentPage * recipesPerPage; 
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage; 
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const [, setOrdenName] = useState("");
    const [, setOrdenScore] = useState("");
    const [loading, setLoading] = useState(true);   
    

    useEffect(() => { 
        dispatch(getRecipes()); 
        dispatch(getDiets());
        setLoading(false)
    }, [dispatch]); 


    function handleClick(e) {
        e.preventDefault();        
        dispatch(getRecipes());
    }

    function handleSortByName(e) {
        e.preventDefault();
        if(allRecipes !== "No recipes found") {
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrdenName(`ordened ${e.target.value}`);
        }
        else{alert("No Recipes to Order")}
    }

    function handleSortByScore(e){
        e.preventDefault();
        if(allRecipes !== "No recipes found"){
        dispatch(orderByHealthScore(e.target.value));
        setCurrentPage(1);
        setOrdenScore(`ordened ${e.target.value}`);
        }
        else{alert("No Recipes to order")}
    }

    function handleFilterDiet (e) {
        dispatch(getRecipesByDiet(e.target.value));
    }
return (
    <div className="home">
        <Link to = "/recipe" className= "create">Create Recipe</Link>
        
        {loading ? <h1 className="loading"> Loading...</h1>  : <h1> RECIPES </h1>}
    <button className="back" onClick={(e)=> {handleClick(e)}}>Charge All Recipes</button>
    
     <div>
        <select className="select" onChange={(e)=>{handleSortByName(e)}}>
            <option value="asc"> A to Z Order </option>
            <option value="desc">Z to A Order </option>
        </select>
        <select className="select" onChange={(e)=>{handleSortByScore(e)}}>
            <option value="asc">Health Score Level - to + </option>
            <option value="desc">Health Score Level + to - </option>
        </select>
        <select className="select" onChange={(e)=>{handleFilterDiet(e)}} >
            <option value= "all">All Recipes</option>
            {diets.map(diet => (
                <option value={diet.name}>{diet.name}</option>
            ))}
         </select>
    <Paginate className="paginate"
        recipesPerPage={recipesPerPage}
        allRecipes={allRecipes === "No recipes found"? 1 : allRecipes.length }
        paginate={paginate}
        currentPage={currentPage}
    />
    <div>
    <SearchBar />
    </div>
    <div className="cards">
    {allRecipes === "No recipes found"? <h1>No recipes found</h1> : 
     currentRecipes?.map(recipe => {
        return (
        
        <Link to = {"/recipe/" + recipe.id}>
         <Card id={recipe.id}  image={recipe.img? recipe.img : recipe.image} name={recipe.name} diets={!recipe.createdInDb? recipe.diets : recipe.diets.map(el => el.name)}/> 
        </Link>
      
    )
    })}
    </div>
     </div>
    </div>

)

}
