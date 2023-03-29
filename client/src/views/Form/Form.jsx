import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createActivity , getCountries } from "../../redux/actions";
import  ValidateActivity from "./Validate";
import style from "./Form.module.css"

const Form = () => {
    const dispatch = useDispatch()

    //Hook secreto(?
    const history = useHistory()

    const allCountries = useSelector((state) => state.countries)
    
    const [input, setInput] = useState({
        name: "",
        difficulty: "",
        season: "",
        countryId: [],
    });
    
    //Estado de errores
    const [errors, setErrors] = useState({
        name: "",
        difficulty: "",
        season: "",
        countryId: "",
    });   
        
      
    
     useEffect(() => {
        dispatch(getCountries())
    }, [dispatch]);


    const changeHandler = (event) => {
       setErrors(
            ValidateActivity(
                {
                    ...input,
                    [event.target.name]: event.target.value
                }
           )
        )
        if (event.target.name === "countryId") {    // Bloque condicional para ir agregando países
            setInput({
                ...input,
                countryId: [...input.countryId, event.target.value]
            });
        } else {
            setInput({
                ...input,
                [event.target.name]: event.target.value
            });
        }
    }

    function handleDelete(e) {
        setInput({
            ...input,
            countryId: input.countryId.filter(country => country !== e)
        });
    };



    

    const submitHandler = (event) => {
        event.preventDefault()
        if (!errors.name && !errors.difficulty && !errors.season && !errors.countryId) {
            if (input.name !== "" && input.difficulty !== "" && input.season !== "" && input.countryId.length !== 0) {
                dispatch(createActivity(input))
                setInput({
            name: "",
            difficulty: "",
            season: "",
            countryId: [],
                })
                history.push("/home")
                return alert ('Activity create!')
                
                
            }
        }
        if (input.name === "") {
            setErrors({ ...errors, name: "Invalid name" })
            
        } 
       /* if (input.difficulty ==="") {
            setErrors({...errors, name:"You need a difficulty"})
        } */
        if (input.season ==="") {
            setErrors({...errors, name:"You need a season "})
        }
        
        if (input.countryId.length ===0) {
            setErrors({...errors, name:"You need almost a Country"})
        } 
        

        return alert ('You need complete all')
        
        
    }


    return (
        <div className={style.container}>
        <form onSubmit={(event) => submitHandler(event)}>
                <h1>Create Activity!</h1>
            <div>
                <label>Name:  </label>
                <input autoComplete='off' type="text" onChange={changeHandler} name="name" value={input.name} />
                 {errors.name ? (<p>{errors.name}</p>) : ""}
            </div>

            <div>
                <label>Difficulty (1-5):  </label>
                <select onChange={(event) => changeHandler(event)} name="difficulty" className={style.button}>
                    {["Select", 1, 2, 3, 4, 5].map(el => (
                                    <option key={el} value={el}>{el}</option>
                                ))}
                </select>
                       {errors.difficulty && (<p>{errors.difficulty}</p>)}
            </div>

            <div>
                <label>Season:  </label>
                 <select onChange={(event) => changeHandler(event)} name='season' className={style.button}>
                                {["Seleccionar", "Summer", "Autumn", "Winter", "Spring", "All year"].map(el => (
                                    <option key={el} value={el}>{el}</option>
                                ))}
                            </select>
                            {errors.season && (<p>{errors.season}</p>)} 
            </div>

            <div>
                <label>Countries:  </label>
                 <select onChange={(event) => changeHandler(event)} name="countryId" className={style.button}>
                                <option name="Select">Seleccionar</option>
                                {allCountries.map(country => (
                                    <option key={country.id} name={country.name} value={country.id}>
                                        {country.name}
                                    </option>
                                ))}
                 </select>
            </div>

            <div >
                            {input.countryId.map(country => (
                                <div key={country} >
                                    <h5>{country}</h5>
                                    <button onClick={() => handleDelete(country)} className={style.buttonX}>X</button>
                                </div>
                            ))}
            </div>
                {errors.countryId && (<p>{errors.countryId}</p>)}
                 <div >
                            <input type='submit' value="Create" className={style.buttoncreate } />
                        </div>
            </form>
            </div>
    )
}

export default Form;

