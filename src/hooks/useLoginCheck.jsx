import { useQuery } from "@tanstack/react-query"
import { setGet  } from "../helpers/fetchData";

const startChecking = async () => {

    if (!localStorage.getItem('token')) {
      localStorage.clear() 
      return { logged: false }
    } 

    const {ok, ...rest} = await setGet('auth/renew')

    if( ok ) {
        localStorage.setItem('token', rest.token );
        localStorage.setItem('token-init-date', new Date().getTime() );  
    } else {
      localStorage.clear()
    }

    return {logged: ok, ...rest}
};


export const useLoginCheck = () => {

    const user = useQuery(
      ['session'],
      async () => await startChecking(),
      {
        refetchOnWindowFocus: false,
        cacheTime: 60 * 60 * 1000 * 4,
        staleTime: 60 * 60 * 1000 * 4 + 1000,
      }
    );

    return user;
};