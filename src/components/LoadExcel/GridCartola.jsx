import { useBankContentToJson } from "../../hooks/useBankContentToJson"
import { DxCartolaGrid } from "../CartolaGrid/DxCartolaGrid"

export const GridCartola = ({content}) => {

    const cartola = useBankContentToJson(content)
    
    return ( <DxCartolaGrid cartola={cartola} />)
} 
