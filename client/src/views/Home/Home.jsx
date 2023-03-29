//import { Link } from "react-router-dom";
//Importo Hooksde React y de React-redux
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//Importo las acciones que voy a usar 
import { getCountries, orderPopulation, filterContinents, filterAlfabetic, getActivities, filterCountriesByActivities } from "../../redux/actions";
//Importo los componentes que voy a renderizar
import Paginado from "../../components/Paginado/Paginado";
import CardsConteiner from "../../components/CardsConteiner/CardsConteiner";
import SearchBar from "../../components/SearchBar.jsx/SearchBar";
import style from "../Home/home.module.css"

//COMIENZA EN COMPONENTE HOME

const Home = () => {
    const dispatch = useDispatch()
    const countries = useSelector(state => state.countries)
    const activities = useSelector(state => state.activities)
    const filteredCountries = useSelector(state => state.filteredCountries)
    const [currentPage, setCurrentPage] = useState(1);
    const countriesPage = 10;
    const indexLastCountry = currentPage * countriesPage;
    const indexFirstCountry = indexLastCountry - countriesPage;
    const currentCountries = filteredCountries.slice(indexFirstCountry, indexLastCountry)
    const [order, setCurrentOrder] = useState('') //Agrego otro estado local para que se renderice cuando hay un cambio

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    
    
    useEffect(() => {
        dispatch(getActivities())
    }, [dispatch]);


    useEffect(() => {
        dispatch(getCountries())
    }, [dispatch]);



    const handleChange = (event) => {
        event.preventDefault();
        dispatch(getCountries())
    }

    const handleOrderPopulation = (event) => {
        //event.preventDefault
        if (event.target.value === "") { dispatch(orderPopulation(countries)) }
        else if (event.target.value === "asc") {
            dispatch(orderPopulation(countries.sort((x, y) => y.population - x.population))) 
        }
        else if(event.target.value === "desc") {
            dispatch(orderPopulation(countries.sort((x, y) => x.population - y.population)))
        }
        setCurrentPage(1)
        setCurrentOrder(event.target.value + order)
        //console.log(filteredCountries)
    }
    
    const handleFilterContinent = (event) => {
        if (event.target.value === "") { dispatch(filterContinents(countries)) }
        else {
            dispatch(filterContinents(countries.filter(country => country.continent === event.target.value)))
        }
        setCurrentPage(1)
    }
    
    const handleOrderAlfabetic = (event) => {
        if (event.target.vale === "") { dispatch(filterAlfabetic(countries)) }
        else if (event.target.value === "A to Z") {
            dispatch(filterAlfabetic(countries.sort((x, y) => {
                if (x.name === y.name) return 0  // Accedemos al valor name y comparamos para que los ordene 
                if (x.name < y.name) return -1    //y si son iguales que los deje en el lugar que estan  
                return 1
            })))
        } else if (event.target.value === "Z to A") {
            dispatch(filterAlfabetic(countries.sort((x, y) => {
                if (x.name === y.name) return 0
                if (x.name > y.name) return -1
                return 1
            })))
        }
        setCurrentPage(1)
        setCurrentOrder(event.target.value + order)
    }

    const handleFilterByActivity = (event) => {
        dispatch(filterCountriesByActivities(event.target.value))
        setCurrentOrder(event.target.value)
        setCurrentPage(1)
    }
    
    return (
        <div className={style.container}>
            <h1 className={style.titulo}>The world</h1>
            <button className={style.refresh} onClick={event => { handleChange(event) }}>Refresh</button>
            <div >
                <span>Population: </span>
                <select className={style.selects} onChange={e=>handleOrderPopulation(e)}>
                    <option value="">-select-</option>
                    <option value="asc">Higher population</option>
                    <option value="desc">Less population</option>
                </select>
                    <span>Alfabetic order: </span>
                <select className={style.selects} onChange={e=>handleOrderAlfabetic(e)}>
                    <option value="">-select-</option>
                    <option value="A to Z">A-Z</option>
                    <option value="Z to A">Z-A</option>
                </select>
                    <span>Continents: </span>
                <select className={style.selects} onChange={e=>handleFilterContinent(e)}>
                    <option value="">-select-</option>
                    <option value="Asia">Asia</option>
                    <option value="Africa">Africa</option>
                    <option value="Europe">Europe</option>
                    <option value="Americas">Americas</option>
                    <option value="Oceania">Oceania</option>
                    <option value="Antarctic">Antartic</option>
                </select>
                <span>Activities: </span>
                <select className={style.selects} onChange={e=>handleFilterByActivity(e)}>
                    
                    <option value="">-select-</option>
                    {activities.map((activity) => {
                        return (<option value={activity.name} key={activity.id}>
                            {activity.name}
                        </option>)
                    })}
                    
                    
                </select>
                <Paginado countriesPage={countriesPage}
                    countries={filteredCountries.length}
                    paginado={paginado} />
                <SearchBar/>
                <CardsConteiner
               currentCountries={currentCountries} />
            </div>
            <div className={style.footer}>
                By Lucas Sarachu
            </div>
            
        </div>
        
    )
}

export default Home;