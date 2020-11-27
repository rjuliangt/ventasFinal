import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";

// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "reporte", //identificador dentro del store.
    "reporte", //endpoint donde realizará las peticiones.
    "reporteForm", //Nombre del formulario.
    "/reporte", //url del componente en el frontend.
);

export default handleActions(reducers, initialState);