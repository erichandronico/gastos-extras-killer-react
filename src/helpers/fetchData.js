import { fetchConToken, fetchSinToken, queryString } from "./fetch";

export const objIsEmpty = obj => Object.keys(obj).length === 0

export const fetchFn = async(url = '', data = {}, method='GET', withToken=true) => {
    try {

      const resp = withToken 
                    ? await fetchConToken( url, data, method) 
                    : await fetchSinToken( url, data, method) 
      const body = await resp.json();

      if ( resp.status == 401 ) window.location.replace('/login') 
  
      if ( body?.ok ) {
          return body ;
      } else {
          console.log('Error fetching ' + url, body?.msg);
          return { ok: false, loading: false, msg: body?.msg };
      };
      
    } catch (error) {
        console.log('Error fetching ' + url, error);
        return { ok: false, loading: false, msg: error };
    }

};  

export const setNew = endpoint => async params => await fetchFn ( endpoint, params, 'POST' );
export const setPostSinToken = endpoint => async params => await fetchFn ( endpoint, params, 'POST', false );

export const setUpdate = endpoint  => async parametros =>  {
    const {_id, ...rest} = parametros
    const url = `${ endpoint }/${ _id ?? '' }`
    return await fetchFn ( url, rest, 'PUT' )
};

export const setDelete = endpoint  => async parametros =>  {
    const {_id, ...rest} = parametros
    const url = `${ endpoint }/del/${ _id ?? '' }`
    return await fetchFn ( url, rest, 'PUT' )
};

export const setGet = async (endpoint, query = {}) => {
    const url = `${endpoint}${ (query && !objIsEmpty(query) ) ? queryString(query) : '' }`
    return await fetchFn( url )
}
// const setGetById        = ( endpoint )  => async ( { _id , filters } )                                                      =>  ( await fetchData (`${endpoint}${_id}/${ queryString({...filters, ...addFaenaId()  }) }` ) )
// const setGetByUid       = ( endpoint )  => async ( { uid , filters } )                                                      =>  ( await fetchData (`${endpoint}${uid}/${ queryString({...filters, ...addFaenaId()  }) }` ) )
// const setGetNoParams    = ( endpoint )  => async ()     
