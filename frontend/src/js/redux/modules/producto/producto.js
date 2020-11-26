import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";

// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "producto", //identificador dentro del store.
    "producto", //endpoint donde realizará las peticiones.
    "productoForm", //Nombre del formulario.
    "/producto", //url del componente en el frontend.
);

export default handleActions(reducers, initialState);