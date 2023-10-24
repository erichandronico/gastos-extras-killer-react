
import { useQuery } from "@tanstack/react-query"
import { setGet } from "../../helpers/fetchData"

const fetchData = async () => {
    const data = await setGet('categories')
    return { categories: data?.dataSource ?? [] }
}

export const useCategories = () => {

    const data = useQuery(
        ['categories'],
        async () =>  await fetchData(),
        {
           cacheTime: 1000*60*60 * 60 * 24, 
           staleTime: 1000*60*60 * 60 * 24 
        }
    )
  
    return {
        ...data
    }

}
