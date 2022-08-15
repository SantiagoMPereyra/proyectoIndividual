import React, { Fragment } from "react";
import { Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../actions/index";
import { useEffect } from "react";
import "./Styles/Details.css";

export default function Details(props){
    console.log(props)
    const dispatch = useDispatch();

useEffect(() => {
    dispatch(getDetails(props.match.params.id));
}, [dispatch, props.match.params.id]);

const myRecipe = useSelector(state => state.details);
console.log(myRecipe)
return (
    <Fragment> 
    <div className="container">
       { myRecipe ? 
       <div className>
          <h1> {myRecipe.name}</h1>
          <img  src={myRecipe.img? myRecipe.img : myRecipe.image} />
          {myRecipe.dishTypes? <h3>DISH TYPES: { myRecipe.dishTypes.join(" - ") }</h3>: null}
          <h3 className="select">DIETS: {!myRecipe.createdInDb ? myRecipe.diets?.join(", ") : myRecipe.diets.map(diet => diet.name + (" ") )}</h3>
          <p className="text">SUMMARY: {myRecipe.summary && myRecipe.summary.replace(/<[^>]+>/g,"")}</p>
          <h3 className="select">HealthScore: {myRecipe.healthScore}</h3>
           {myRecipe.steps?<p className="text">STEPS: { myRecipe.steps}</p>: null}
       </div>
        : <p>Loading...</p>
      }
         </div>
         <div>
        <Link to = {"/recipe/stepByStep/" + props.match.params.id}>
           {myRecipe.steps? <button className="back2">Step By Step</button>: null}
        </Link>
         </div>
        <Link to="/home">
            <button className="back1">Back to Home </button>
        </Link>
  </Fragment>
    
)
    
}