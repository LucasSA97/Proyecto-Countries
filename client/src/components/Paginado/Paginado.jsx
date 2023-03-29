import React from "react"
import style from "../Paginado/Paginado.module.css"

const Paginado = ({ countriesPage, countries, paginado }) => {   //Traigo como propiedades del otro componente 
    const pageNumbers = []                                       //Declaro un array como indice 
    for (let i = 1; i <= Math.ceil(countries / countriesPage); i++){ 
        pageNumbers.push(i)
    }
    return (
        <div>
            <ul className={style.paginado}>  
                {pageNumbers && pageNumbers.map(number => (   //Pregunto si tengo el arreglo y con el metodo map le pido que me devuelva cada numero que contenga
                    <li key={number}>                                   
                    <button onClick={() => paginado(number)}> { number } </button> 
                    </li>         
                ))}
            </ul>
        </div>
    )

}

export default Paginado