import React, { Fragment } from "react";
import { Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../actions/index";
import { useEffect } from "react";
import "./Styles/StepByStep.css";

export default function StepByStep(props){
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
       <div className="">
          <h1>{myRecipe.name}</h1>
 
          <h2>Step By Step: </h2>
          {myRecipe.stepByStep?.map(e=> {
            return (
             <Fragment className="text">
              <p className="text">{ e.number + " - " + e.step + ' '}</p>
             {e.ingredients.length? <p className="select" >Ingredients:</p>: null}
              {e.ingredients.map(i=> {
                return (
                    
                 <p className="text">  { i.name + " "}</p>  
            )}) }
             {e.equipment.length? <p className="select">Equipment:</p>: null}
              {e.equipment.map(i=> {
                return (
                    
                 <a href="i.name" className="text">  { i.name + " "}</a>  
            )}) }
            
                </Fragment>


            )})}

       </div>
        : <p>Loading...</p>
      }
        </div>
        <Link to = {"/recipe/" + props.match.params.id}>
            <button className="back1">Back To Recipe</button>
        </Link>
    
        <Link to="/home">
            <button className="back2">Back to Home </button>
        </Link>
   
</Fragment>
    
)
    
}