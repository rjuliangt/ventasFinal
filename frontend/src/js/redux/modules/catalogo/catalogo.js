import { handleActions } from "redux-actions";
import { api } from "api";

const SET_DATA_CATALOGO= "SET_DATA_CATALOGO";
const LOADER_SET_DATA_CATALOGO = "LOADER_SET_DATA_CATALOGO"

const setLoader = (loader)=>( {
    type:LOADER_SET_DATA_CATALOGO, loader
} )

const getCatalogo = () => ( dispatch, getStore ) => {
    dispatch(setLoader(true))
    // let param = {search:search}
    // api.get('catalogo', param)
    api.get('catalogo')
        .then( ( response ) => {
        console.log('response', response)
        dispatch({type:SET_DATA_CATALOGO, data:response});
    })
    .catch(() => {
      
    })
    .finally(() => {
        dispatch(setLoader(false))
    });
}


export const reducers = {
    [SET_DATA_CATALOGO]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    
    [LOADER_SET_DATA_CATALOGO]: (state, { loader }) => {
        return {
            ...state,
            loader,
        };
    },
};

   
export const actions = {
    getCatalogo,
};

export const initialState = {
    data:[],
    loader: false,
};

export default handleActions(reducers, initialState);
