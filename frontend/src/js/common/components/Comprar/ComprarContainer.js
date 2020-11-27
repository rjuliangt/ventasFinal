import { connect } from 'react-redux';
import {actions} from '../../../redux/modules/comprar/comprar'
import Comprar from './Comprar';


const ms2p = (state) => {
    return {
        ...state.comprar,        
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(Comprar);