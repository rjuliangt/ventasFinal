import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";

// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "catalogo", //identificador dentro del store.
    "catalogo", //endpoint donde realizará las peticiones.
    "cataloProductoForm", //Nombre del formulario.
    "/catalogo", //url del componente en el frontend.
);

export default handleActions(reducers, initialState);