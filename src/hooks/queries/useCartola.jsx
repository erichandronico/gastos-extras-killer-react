
import { useMutation, useQuery } from "@tanstack/react-query"
import { setGet, setNew } from "../../helpers/fetchData"

const endpoint  = 'cartola'
const addData   = setNew(endpoint)

const fetchData = async () => {
    const data = await setGet(endpoint)
    return { cartola: data?.dataSource ?? [] }
}

export const useCartola = () => {

    const data = useQuery(
        [endpoint],
        async () =>  await fetchData(),
        {
           cacheTime: 1000*60*60 * 60 * 24, 
           staleTime: 1000*60*60 * 60 * 24 
        }
    )
  
    return {
        ...data,
        add: useMutation(addData)
    }

}
