import { useState } from "react"
import { useDispatch } from "react-redux";
import { getCountriesByName } from "../../redux/actions";
import styles from './SearchBar.module.css'

const SearchBar = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [order, setCurrentOrder] = useState('') 
    
    
    function handleChange(event){
        event.preventDefault();
        setName(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(getCountriesByName(name))
        console.log(name)
        setCurrentOrder(event.target.value);
    }

    return(
    <div className={styles.searchBar} >
        <form onSubmit={handleSubmit}>
            <input className={styles.searchInput} type="text" onChange={(event) => handleChange(event)} placeholder="Search"/>
            <button className={styles.searchbutton}  type="submit" onClick={(event) => handleSubmit(event)}>Search</button>
        </form>
        </div>
    )
}

export default SearchBar