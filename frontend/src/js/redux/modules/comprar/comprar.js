import { handleActions } from "redux-actions";
import { api } from "api";
import { NotificationManager } from 'react-notifications';
import { initialize as initializeForm } from "redux-form";
import { push } from "react-router-redux";

const SET_FORM_COMPRAR= "SET_FORM_COMPRAR";
const SET_LOADER_DATA_COMPRAR = "SET_LOADER_DATA_COMPRAR"

const setLoader = (loader)=>( {
    type:SET_LOADER_DATA_COMPRAR, loader
} )

const getDatosProducto = (id) => ( dispatch ) => {
    dispatch(setLoader(true))
    api.get(`catalogo/detalleProducto/?id=${id}`)
        .then( ( response ) => {
        console.log('response: ', response)
            dispatch( { type: SET_FORM_COMPRAR, data: response.results[0] } );
            dispatch(initializeForm('comprarProductoForm', response.results[0]));
    })
    .catch(() => {
      
    })
    .finally(() => {
        dispatch(setLoader(false))
    });
}

const comprarProducto = () => ( dispatch, getStore ) => {
    dispatch( setLoader( true ) )
    let datos = getStore().form.comprarProductoForm.values;
    // datos.form.comprarProductoForm.values
    // api.post('cliente', datos)
    //     .then( ( response ) => {
    //         console.log( 'response: ', response )
    //          NotificationManager.success('Se registro un cliente', 'Éxito', 3000);
    // })
    // .catch(() => {
    //     NotificationManager.error('Error en la compra', 'ERROR', 0);
    // })
    // .finally(() => {
    //     dispatch(setLoader(false))
    // });
    api.post('comprar', datos)
        .then( ( response ) => {
            console.log( 'response: ', response )
            NotificationManager.success( 'Compra realiza con exito', 'Éxito', 3000 );
            dispatch(push("/catalogo"));
    })
    .catch(() => {
        NotificationManager.error('Error en la compra', 'ERROR', 0);
    })
    .finally(() => {
        dispatch(setLoader(false))
    });
}


export const reducers = {
    [SET_FORM_COMPRAR]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    
    [SET_LOADER_DATA_COMPRAR]: (state, { loader }) => {
        return {
            ...state,
            loader,
        };
    },
};

   
export const actions = {
    getDatosProducto,
    comprarProducto,
};

export const initialState = {
    data:[],
    loader: false,
};

export default handleActions(reducers, initialState);