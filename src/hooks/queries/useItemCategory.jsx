
import { useMutation, useQuery } from "@tanstack/react-query"
import { setGet, setNew } from "../../helpers/fetchData"
import _ from "lodash"

const addData = setNew('item-categories')

const fetchData = async () => {
    const data = await setGet('item-categories')
    const itemCategoriesByName = _.keyBy( data?.dataSource, 'name' )
    const getItemCategoryByName = name => _.get( itemCategoriesByName, name )
    return { itemCategories: data?.dataSource ?? [], getItemCategoryByName }
}

export const useItemCategories = () => {

    const data = useQuery(
        ['item-categories'],
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
