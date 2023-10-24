
import { useMutation, useQuery } from "@tanstack/react-query"
import { setGet, setNew } from "../../helpers/fetchData"

const endpoint  = 'cartola'
const addData   = setNew(endpoint)

const columns = [
    'lugarOperacion',
    'date',
    'codigoReferencia',
    'descripcion',
    'montoOperacion',
    'montoTotal',
    'cuota',
    'totalCuotas',
    'valorCuota'
  ]

const fetchData = async ({instance, date, bank}) => {
    const query = {}
    if (instance) query.instance    = instance
    if (bank) query.bank            = bank
    if (date) query.date            = date

    const data = await setGet(endpoint, query)

    return { dataSource: data?.dataSource ?? [], fecha: date, columns }
}

export const useCartola = (instance='default',bank='null', date='null') => {

    const data = useQuery(
        [endpoint, instance, bank, date],
        async () =>  await fetchData({instance, date, bank}),
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



const fetchList = async ({instance, bank}) => {
    const query = {}
    if (instance) query.instance    = instance
    if (bank) query.bank            = bank
    const data = await setGet(`${endpoint}/list`, query)
    return { cartolas: data?.cartolas ?? [] }
}


export const useCartolas = (instance='default',bank=null) => {

    const data = useQuery(
        [`${endpoint}-list`, instance, bank],
        async () =>  await fetchList({instance, bank}),
        {
           cacheTime: 1000*60*60 * 60 * 24, 
           staleTime: 1000*60*60 * 60 * 24 
        }
    )
  
    return {
        ...data
    }

}
