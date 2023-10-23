import { useQuery, useQueryClient } from "@tanstack/react-query"
import { setPostSinToken } from "../helpers/fetchData";
import Swal from "sweetalert2";

const login = setPostSinToken('auth');

const startLogin = ( email, password ) => 
  login({ email, password}).then( ({ok, ...rest}) => {
    
      if( ok ) {
        localStorage.setItem('token', rest.token );
        localStorage.setItem('token-init-date', new Date().getTime() );
      } else {
        localStorage.clear()
        Swal.fire('Error', rest?.msg, 'error');
      }
      
      return {logged: ok, ...rest}
  });


export const useLogin = (email, password) => {

  const queryClient = useQueryClient()
    
    const user = useQuery(
      [ 'session' ],
      async () => await startLogin(email, password),
      {
        enabled: false,
        refetchOnWindowFocus: false,
        cacheTime: 60 * 60 * 1000 * 4,
        staleTime: 60 * 60 * 1000 * 4 + 1000,
      }
    );

    return {
      ...user,
      logout: () => queryClient.removeQueries(['session'])
    };
  };