import React, { Component } from "react";
import ComprarForm from "./FormComprar";

class CrearCompra extends Component {
    componentWillMount = () => {
        const { match, getDatosProducto } = this.props;
        if (match.params.id) {
            const id = match.params.id;
            console.log('aqui', match)
            getDatosProducto( id );
            
        }
    };

    render() {
        const {
            comprarProducto,
            data,
            match,
        } = this.props;

        console.log("Crear compra", this.props);
        return (
            <div className="d-flex flex-column w-100">
                <ComprarForm
                    onSubmit={ comprarProducto }
                    data={ data }
                    match={ match}
                />
            </div>
        );
    }
}

export default CrearCompra;
