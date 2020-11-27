import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";

// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "comprar", //identificador dentro del store.
    "comprar", //endpoint donde realizará las peticiones.
    "comprarProductoForm", //Nombre del formulario.
    "/comprar", //url del componente en el frontend.
);

export default handleActions(reducers, initialState);