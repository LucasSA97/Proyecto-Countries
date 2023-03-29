const ValidateActivity = (input) => {
    let errors = {};
    if (input.name) {
        if (!/^[A-Z]+$/i.test(input.name)) {

            errors.name = "La Actividad turística debe contener sólo letras";
           
        }
    }
    if (!input.difficulty) {
        
        if (!input.difficulty) {
            errors.difficulty = "You need a difficulty";
            
        }
    }
    
    if (input.season) {

        if (input.season === "") {
            errors.season = "Select a season of the year"
        }
    }
    if (!input.countryId) {
         
        //if (input.countryId.length === 0) {
            errors.countryId = "You need almost a Country"
        //}
    }

    return errors;
}

export default ValidateActivity;