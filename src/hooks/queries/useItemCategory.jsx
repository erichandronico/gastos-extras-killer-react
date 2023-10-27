
import { useMutation, useQuery } from "@tanstack/react-query"
import { setDelete, setGet, setNew } from "../../helpers/fetchData"
import _ from "lodash"
import { useCallback } from "react"
import Swal from "sweetalert2"
import { useNotifyRefetch } from "../useNotifyRefetch"

const addData = setNew('item-categories')
const delData = setDelete('item-categories')

const fetchData = async () => {
    const data = await setGet('item-categories')
    const itemCategoriesByName = _.keyBy( data?.dataSource?.filter( d => !d?.codigoReferencia), 'name' )
    const itemCategoriesByCode = _.keyBy( data?.dataSource, 'codigoReferencia' )

    const getItemCategoryByName = name => _.get( itemCategoriesByName, name )

    const getItemCategoryByNameAndCode = (name, codigoReferencia=null) => {
      if (codigoReferencia) {
        const byCode = _.get( itemCategoriesByCode, codigoReferencia )
        if (byCode) return byCode
      }
      return _.get( itemCategoriesByName, name )
    } 
    
    return { itemCategories: data?.dataSource ?? [], getItemCategoryByName, getItemCategoryByNameAndCode }
}


export const useItemCategories = () => {

    const add                   = useMutation(addData)
    const del                   = useMutation(delData)
    const { notifyResultado }   = useNotifyRefetch()

    const data = useQuery(
        ['item-categories'],
        async () =>  await fetchData(),
        {
           cacheTime: 1000*60*60 * 60 * 24, 
           staleTime: 1000*60*60 * 60 * 24 
        }
    );


    const handleUpdate = useCallback( async ({oldData, newData}) => {
        const { descripcion, codigoReferencia, montoOperacion } = oldData;
        
        const result = await Swal.fire({    // Mostrar un cuadro de diálogo de confirmación
          title: '¿Registro General?',
          text: '¿Deseas guardar el cambio para todos los registros con igual descripción?',
          icon: 'question', showCancelButton: true, confirmButtonText: 'Sí', cancelButtonText: 'No' });
    
        if (result.isConfirmed) {
          return add.mutateAsync({ instance: 'default', name: descripcion, ...newData }).then(notifyResultado);
        } 
        
        add.mutateAsync({ instance: 'default', name: descripcion, codigoReferencia, montoOperacion, ...newData }).then(notifyResultado);
        Swal.fire('Categoría Asociada al Código', 'La categoría fue guardada solo para este código de referencia.', 'info');
      }, [])


  
    return {
        ...data,
        add,
        del,
        handleUpdate
    }

}
