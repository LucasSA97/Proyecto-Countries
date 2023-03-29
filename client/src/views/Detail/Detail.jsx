//import { Link } from "react-router-dom";
//import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";

import { getCountriesById } from "../../redux/actions";

import { useParams } from "react-router-dom";

import style from "../Detail/Detail.module.css";



const Detail = () => {
    
    const { id } = useParams();
    const dispatch = useDispatch()

    const countryID = useSelector(state => state.countryID)

    useEffect(() => {
       dispatch(getCountriesById(id))
     },[dispatch,id]
       )
   
    return (
        <div>
            <div className={style.container}>
                
                        <h1>{countryID.name}</h1>
                        <img className={style.img} src={countryID.img}  />
                        <h2>Continent: {countryID.continent}</h2>
                        <h3>Capital: {countryID.capital}</h3>
                <h4>Population:{countryID.population} Hab.</h4>

                {countryID.Activities?.map((act) => {
                    return (
                            
                        <table className={style.table}>
                            
                            <thead>
                            <tr>
                                <th>Activity:</th>
                                <th>Season:</th>
                                <th>Difficulty:</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td key={`${act.id}_${act.name}`}>{act.name} </td>
                                <td key={`${act.id}_${act.season}`}>{act.season}</td>
                                <td key={`${act.id}_${act.difficulty}`}>{act.difficulty}</td>
                            </tr>
                            </tbody>
                           

                            </table>
                            
                            
                    )
                })}

                    </div> 
    </div>      
    )
}

export default Detail;

/*ID (Código de tres letras).
Nombre.
Imagen de la bandera.
Continente.
Capital.
Subregión (si tiene).
Área (si tiene).
Población.*/