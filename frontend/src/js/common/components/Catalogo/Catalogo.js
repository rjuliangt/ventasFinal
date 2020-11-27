import React, { Component } from "react";
import Catalogo from "./CatalogoListar";

class CrearCompra extends Component {
    componentWillMount = () => {
        const { getCatalogo } = this.props;
        getCatalogo()
    };
    render() {
        const { data, loader } = this.props;
        console.log("los props de mi catalogo", this.props);
        return (
            <div className="d-flex flex-column w-100">
                <Catalogo
                    data={ data }
                    loader={loader}
                />
            </div>
        );
    }
}

export default CrearCompra;
