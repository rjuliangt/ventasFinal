import React, { Component } from "react";
import Catalogo from "./CatalogoListar";

class CrearCompra extends Component {
    componentWillMount = () => {
        const { listar  } = this.props;
            listar()
    };
    render() {
        const { data, loader, match, searchChange } = this.props;
        console.log("los props de mi catalogo", this.props);
        return (
            <div className="d-flex flex-column w-100">
                <Catalogo
                    data={ data }
                    loader={ loader }
                    match={ match }
                    searchChange={ searchChange}
                />
            </div>
        );
    }
}

export default CrearCompra;
