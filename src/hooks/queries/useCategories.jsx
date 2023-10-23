import { useQuery } from "@tanstack/react-query/build/lib"
import { setGet } from "../../helpers/fetchData"

const fetchData = async () => {
    return await setGet('categories')
}

export const useCategories = () => {

    const data = useQuery(
        ['cateogories'],
        fetchData(),
        {
           cacheTime: 1000*60*60 * 60 * 24, 
           staleTime: 1000*60*60 * 60 * 24 
        }
    )
  
    return {
        ...data
    }

}
