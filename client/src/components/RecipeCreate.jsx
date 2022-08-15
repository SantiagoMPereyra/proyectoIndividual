import React, {useState, useEffect} from "react";
import { Link, useHistory,  } from "react-router-dom";
import {postRecipe, getDiets} from "../actions/index";
import {useDispatch, useSelector  } from "react-redux";

import "./Styles/RecipeCreate.css";

function validate (input) {
    let errors = {};
    if (!input.name) {
        errors.name = "Name is required";
    } else if(!input.summary) {
        errors.summary = "Summary is required";
    } else if(!input.healthScore || input.healthScore < 0 || input.healthScore > 100) {
        errors.healthScore = "Health Score must be between 0 and 100";
    } else if(!input.steps) { 
        errors.steps = "Steps are required";
    }
    return errors;
}


export default function RecipeCreate() {
    const dispatch = useDispatch();
    const history = useHistory();
    const diets = useSelector(state => state.diets);
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: "",
        img: "",
        summary: "",
        healthScore: "",
        steps:"",
        diets: []
});

useEffect(() => {
    dispatch(getDiets());
}, [dispatch]);

const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value}));
            console.log(input);
    }

    const handleCheck = (e) => {
        if(e.target.checked) {
            setInput({
                ...input,
                diets: [...input.diets, e.target.value]
            });
        } 
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(input);
        if (input.name !== "" && input.summary !== "" && input.healthScore !== "" && input.steps !== "" ) {
            dispatch(postRecipe(input));
            alert("Recipe created successfully!");
            setInput ({
            name: "",
            img: "",
            summary: "",
            healthScore: "",
            steps:"",
            diets: []
        });
           history.push("/home");
        } else {
            alert("Please fill all the fields correctly");
        }
    }



return(
    <div className="divForm" >
        <Link to = "/home"><button className="back1">Home</button></Link>
        <h1 className="createTitle">Create a Recipe</h1>
        <form className="form" onSubmit={(e)=> handleSubmit(e)}>
            <div>
                <label>Name:</label>
                <input className="inputName" 
                type="text" 
                value={input.name}
                name="name"
                onChange={(e)=>handleChange(e)}/>
                { errors.name && <p className="errors">{errors.name}</p>}
            </div>
            <div>
                <label  >Image:</label>
                <input className="inputName"
                type="text" 
                value={input.img}
                name="img"
                onChange={(e)=>handleChange(e)}/>
        
            </div>
            <div>
                <label>Summary:</label>
                <input className="inputSummarySteps" 
                type="text" 
                value={input.summary}
                name="summary"
                onChange={(e)=>handleChange(e)}/>
                { errors.summary && <p className="errors">{errors.summary}</p>}
            </div>
            <div>
                <label>HealtScore:</label>
                <input className="inputHealthScore"
                type="number" 
                value={input.healthScore}
                name="healthScore"
                onChange={(e)=>handleChange(e)}/>
                { errors.healthScore && <p className="errors">{errors.healthScore}</p>}
            </div>
            <div>
                <label >Steps:</label>
                <input className="inputSummarySteps"
                type="text" 
                value= {input.steps}
                name="steps"
                onChange={(e)=>handleChange(e)}/>
                { errors.steps && <p className="errors">{errors.steps}</p>}
            </div>
            <div>
                <label>Diets:</label>
                {diets.map(diet => (
                    <label><input type="checkbox" value={diet.name} name={diet.name}onChange={(e)=> handleCheck(e)}/>{diet.name}</label> 
                ))}

                </div>

            {  <button className="textCreate" type="submit">Create</button>}
        </form>
    </div>
)

}