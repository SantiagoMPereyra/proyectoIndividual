import React from "react";


export default function Paginate ({recipesPerPage, allRecipes, paginate, currentPage}){
   
   
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav>
           <ul className="paginate">
           <li><a onClick={() => { if ( currentPage !== 1 ) {paginate(currentPage - 1 )}}}> - </a></li>
           { pageNumbers.map(number => (
                 
                <li key={number} className="page-item">
                <a onClick={() => paginate(number)}>{number}</a>
                </li>
                ))}
            <li><a onClick={ () => {if ( currentPage !== pageNumbers.length ) {paginate(currentPage + 1 )}}}> + </a></li>
           </ul>
        </nav>
    );

}