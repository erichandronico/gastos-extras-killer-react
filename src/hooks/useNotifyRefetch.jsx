import { useQueryClient } from '@tanstack/react-query';
import notify from 'devextreme/ui/notify';
import { useCallback } from 'react';
import { trans } from '../helpers/utils';



export const useNotifyRefetch = () => {

    const queryClient = useQueryClient();


    const notifyRefetch = useCallback( ({msg, tipo, refetchFn, timeout=2000, queriesToInvalidate=null, queriesToRemove=null}) => {
        
        notify( { message: trans(msg), position: { my: "center top",  at: "center top" } }, tipo, 3500 )

        setTimeout( async () => {
            if ( queriesToInvalidate )  await queryClient.invalidateQueries(queriesToInvalidate)
            if ( queriesToRemove )      queryClient.removeQueries({queryKey: queriesToRemove})
            await refetchFn()
        }, timeout)

      }, [queryClient]);
    
    const notifySimple      = ({refetchFn, timeout=2000, queriesToInvalidate=null, queriesToRemove=null}) => ({msg, tipo}) =>  notifyRefetch({msg, tipo, refetchFn, timeout, queriesToInvalidate, queriesToRemove });
    const notifyResultado   = ({msg, tipo}) => notify({ message: trans(msg), position: { my: "center top",  at: "center top" } }, tipo, 3500);
      
  return { notifyRefetch, notifySimple, notifyResultado }
}
