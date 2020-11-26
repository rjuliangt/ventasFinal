import { connect } from 'react-redux';
import {actions} from '../../../redux/modules/producto/producto'
import ListarProductos from './ListarProductos';


const ms2p = (state) => {
    return {
        ...state.producto,        
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(ListarProductos);