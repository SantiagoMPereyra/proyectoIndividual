import React from "react";
import { useState} from "react";
import { useDispatch} from "react-redux";
import {getNameRecipes} from "../actions";
import "./Styles/SearchBar.css";


export default function SearchBar() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  }
  const getName = getNameRecipes(search)
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(search){ dispatch(getName)
      setSearch("")}
      else{
        alert("Please complete the search field")
      }
    }
 

  return (
    <div className="search-bar">
      
        <input className="searchInput"
          type="text"
          placeholder="Search for a recipe"
          value={search}
          onChange= {(e) =>{handleChange(e)}}
        />
        <button className="search" type="submit" onClick={(e) => {handleSubmit(e)}}>Search</button>
    </div>
  );
}
