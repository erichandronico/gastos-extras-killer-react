
import { useQuery } from "@tanstack/react-query"
import { setGet } from "../../helpers/fetchData"
import _ from "lodash"

const fetchData = async () => {
    const data = await setGet('categories')
    const dataById = _.keyBy( data?.dataSource, '_id')
    const getCategoryById = _id => _.get( dataById, _id)

    const excluded = data?.dataSource?.filter( d => d?.excluded ).map( ({_id}) => (_id))

    const filterExcluded = (array, categoryField="id") => {
        return array.filter( i => {
        //   return  !i[categoryField]?.includes(excluded)
          return  !excluded?.includes(i[categoryField])
        } )
    }
    
    return { categories: data?.dataSource ?? [], getCategoryById, filterExcluded }
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
