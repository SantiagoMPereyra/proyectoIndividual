import React from "react";
import './Styles/Card.css'

export default function Card({name, image, id, dishTypes, diets, summary, healthScore, steps, createdInDb}) {
    return (
        <div className="card">
            <h3 className="receta">{name}</h3>
            <img className="imagenReceta" src={image} alt="imagen no disponible" width="150px" height="150px"/>
            <p className="types">{dishTypes}</p>
            <p className="types">{!createdInDb? diets.join(" - ") : diets.map(diet => diet.name)}</p>
            <p>{healthScore}</p>
            <p>{summary}</p>
            <p>{steps}</p>
        </div>
    );
}