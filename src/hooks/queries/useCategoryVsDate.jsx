import { useQuery } from "@tanstack/react-query";
import { setGet } from "../../helpers/fetchData";
import { useCategories } from "./useCategories";
import _ from "lodash";
import { useItemCategories } from "./useItemCategory";

const endpoint = 'cartola/categoryVsDate';

const fetchData = async (categories, itemCategories) => {
    try {
        const query = {}
        const data = await setGet(endpoint, query)
    
        const categoryVsDate_ =
            data?.categoryVsDate?.map( i => {
                const category = categories?.data?.getCategoryById(i?.category)?.name
                if (!category) return i
                return { ...i, category, categoryId: i?.category }
            })
        
        const categoryVsDate = categories?.data?.filterExcluded(categoryVsDate_, 'categoryId')
        const datosAgrupados = _.groupBy(categoryVsDate, 'category');

        // Crear el arreglo final utilizando _.map
        const dxFormat = _.map(datosAgrupados, (values, key) => {
            const objetoResultado = { category: key };
            
            _.forEach(values, (value) => {                  // Agregar las fechas y totales al objeto resultado
                objetoResultado[value.date] = value.total;
            });

            return objetoResultado;
        });

        // console.log('dxFormat', dxFormat)

        const pieFormat = _.map(datosAgrupados, (values,key) => (
            {
                category: key,
                total: _.sumBy(values, 'total')
            }))
    
        return { categoryVsDate, dxFormat, pieFormat  }
        
    } catch (error) {
        console.log(error)
        return { categoryVsDate: []}
    }
}

export const useCategoryVsDate = () => {

    const categories = useCategories()
    const itemCategories = useItemCategories()

    const data = useQuery(
        ['category-vs-date', categories?.data?.categories ],
        async () =>  await fetchData(categories, itemCategories),
        {
           cacheTime: 1000*60*60 * 60 * 24, 
           staleTime: 1000*60*60 * 60 * 24 
        }
    )
  
    return {
        ...data
    }

}
