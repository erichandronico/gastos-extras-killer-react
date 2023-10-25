import { useQuery } from "@tanstack/react-query";
import { setGet } from "../../helpers/fetchData";
import { useCategories } from "./useCategories";
import _ from "lodash";

const endpoint = 'cartola/categoryVsDate';

const fetchData = async (categories) => {
    try {
        const query = {}
        const data = await setGet(endpoint, query)
    
        const categoryVsDate = data?.categoryVsDate?.map( i => {
            const category = categories?.data?.getCategoryById(i?.category)?.name
            if (!category) return i
            return { ...i, category }
        })

        const datosAgrupados = _.groupBy(categoryVsDate, 'category');

        // Crear el arreglo final utilizando _.map
        const dxFormat = _.map(datosAgrupados, (values, key) => {
            const objetoResultado = { category: key };
            
            _.forEach(values, (value) => {                  // Agregar las fechas y totales al objeto resultado
                objetoResultado[value.date] = value.total;
            });

            return objetoResultado;
        });

        console.log('dxFormat', dxFormat)
    
        return { categoryVsDate, dxFormat  }
        
    } catch (error) {
        console.log(error)
        return { categoryVsDate: []}
    }
}

export const useCategoryVsDate = () => {

    const categories = useCategories()

    const data = useQuery(
        ['category-vs-date', categories?.data?.categories ],
        async () =>  await fetchData(categories),
        {
           cacheTime: 1000*60*60 * 60 * 24, 
           staleTime: 1000*60*60 * 60 * 24 
        }
    )
  
    return {
        ...data
    }

}
