import { useState } from "react"


export const useForm = ( initialState = {} ) => {
    
    const [values, setValues] = useState(initialState);

    const reset = () => {
        setValues( initialState );
    } 

    const handleInputChange = ({ target }) => {
        setValues({
            ...values,
            [ target.name ]: target.value
        });
    }

    const handleInputChangeDx = ( valor ) => {

        setValues( {
            ...values,
            ...valor
        });

    }

    return [ values, handleInputChange, handleInputChangeDx, reset ];

}
