import { handleActions } from "redux-actions";
import { api } from "api";

const SET_DATA_REPORTE= "SET_DATA_REPORTE";
const SET_DATA_GRAFICA = "SET_DATA_GRAFICA";
const SET_DATA_PROMEDIO= "SET_DATA_PROMEDIO";
const SET_lOADER_DATA_REPORTE = "SET_lOADER_DATA_REPORTE"
const SET_BUSCAR_POR_PRODUCTO = "SET_BUSCAR_POR_PRODUCTO"

const setLoader = (loader)=>( {
    type:SET_lOADER_DATA_REPORTE, loader
} )

const getVentasPorProducto = () => ( dispatch ) => {
    dispatch(setLoader(true))
    api.get(`reporte/ventasPorProducto`)
        .then( ( response ) => {
        console.log('response: ', response)
            dispatch( { type: SET_DATA_REPORTE, data: response } );
    })
    .catch(() => {
      
    })
    .finally(() => {
        dispatch(setLoader(false))
    });
}

const getDataGrafica = () => ( dispatch ) => {
    dispatch(setLoader(true))
    api.get('reporte/ventasGlobal')
        .then( ( response ) => {
            console.log( 'response: ', response )
            dispatch( { type: SET_DATA_GRAFICA, datosGrafica: response.results } );
            
    })
    .catch(() => {
    })
    .finally(() => {
        dispatch(setLoader(false))
    });
}

const getDataPromedio = () => ( dispatch ) => {
    dispatch(setLoader(true))
    api.get('reporte/precioPromedio')
        .then( ( response ) => {
            console.log( 'response: ', response )
            dispatch( { type: SET_DATA_PROMEDIO, datosPromedio: response.results } );
    })
    .catch(() => {
    })
    .finally(() => {
        dispatch(setLoader(false))
    });
}


export const reducers = {
    [SET_DATA_REPORTE]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    
    [SET_DATA_PROMEDIO]: (state, { datosPromedio }) => {
        return {
            ...state,
            datosPromedio,
        };
    },
    
    [SET_DATA_GRAFICA]: (state, { datosGrafica }) => {
        return {
            ...state,
            datosGrafica,
        };
    },
    
    [SET_lOADER_DATA_REPORTE]: (state, { loader }) => {
        return {
            ...state,
            loader,
        };
    },
    [SET_BUSCAR_POR_PRODUCTO]: (state, { seacrh }) => {
        return {
            ...state,
            seacrh,
        };
    },
};

   
export const actions = {
    getDataGrafica,
    getDataPromedio,
    getVentasPorProducto
};

export const initialState = {
    data: [],
    datosGrafica: [],
    datosPromedio: [],
    loader: false,
    search:'',
};

export default handleActions(reducers, initialState);
