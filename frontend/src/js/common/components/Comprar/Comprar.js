import React, { Component } from "react";
import ComprarForm from "./FormComprar";

class CrearCompra extends Component {
    componentWillMount = () => {
        const { match, getDatosProducto } = this.props;
        if (match.params.id) {
            const id = match.params.id;
            getDatosProducto(id);
        }
    };

    render() {
        const {
            comprarProducto,
        } = this.props;

        console.log("Crear compra", this.props);
        return (
            <div className="d-flex flex-column w-100">
                <ComprarForm
                    onSubmit={comprarProducto}
                />
            </div>
        );
    }
}

export default CrearCompra;
